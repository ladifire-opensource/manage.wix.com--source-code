import { Store } from 'redux';
import * as React from 'react';
import { IState } from './types/store';
import { pick, difference } from 'lodash';
import App from './components/App/App.container';
import { parseQuery, buildQuery, joinPaths } from 'urijs';
import * as URI from 'urijs'; //tslint:disable-line:no-duplicate-imports
import { getPageComponentInfoByAppDefId, getPageComponentsInfo } from './selectors/pageComponentsSelectors';
import { shouldUseHomeAsLandingPage } from './selectors/modulesSelectors';
import { Route, IndexRedirect, RedirectFunction  } from 'react-router';
import { Location as ReactRouterLocation } from 'history';
import { EDITOR_URL_PARAMS } from '../common/consts/editor-url-params';
import { IPageComponent } from './modules/IPageComponent';
import { buildPageComponents } from './modules/buildPageComponents';
import { appDefIds, PageComponentId } from '@wix/business-manager-api';
import { getMetaSiteId } from './selectors/siteMetaDataSelectors';
import { PageNotFoundErrorPage } from './components/ErrorPages/ErrorPages';
import { getUrlParamFirstValue } from './utils/getUrlParamsFirstValue';
import { isAppInstalled } from './selectors/embeddedServicesSelectors';

const hasMissingParams = (subset, superset) =>
  difference(Object.keys(subset), Object.keys(superset)).length !== 0;

const hasMissingHashParams = () => !!window.location.hash || window['PRESERVED_HASH_PARAMS'];

let referralInfoQuery = {};

const saveUrlParams = (location) => {
  if (location.search) {
    const queryParams = parseQuery(location.search);
    referralInfoQuery = pick(queryParams, ['referralInfo']);
    window['PRESERVED_QUERY_PARAMS'] = pick(queryParams, EDITOR_URL_PARAMS);
  }
  if (location.hash) {
    window['PRESERVED_HASH_PARAMS'] = location.hash;
  }
};

const addMissingUrlParams = () => ({ location }, replace) => {
  const currentQueryParams = parseQuery(location.search) || {};
  const savedUrlParams = { ...window['PRESERVED_QUERY_PARAMS'], ...referralInfoQuery };
  if (hasMissingParams(savedUrlParams, currentQueryParams)) {
    const updatedParams = Object.assign({}, savedUrlParams, currentQueryParams);
    const newUrl = `${location.pathname}?${buildQuery(updatedParams)}`;
    replace(newUrl);
  }
};

function patchHashUrls(replace, location) {
  if (hasMissingHashParams()) {
    const hashPartWithoutHash = (location.hash || window['PRESERVED_HASH_PARAMS']).slice(1);
    const patchedUrl = joinPaths(location.pathname, hashPartWithoutHash).toString() + (location.search as string);
    window['PRESERVED_HASH_PARAMS'] = undefined;
    replace(patchedUrl);
  }
}

function isExternal(url: string): boolean {
  return URI(url).segment(-1) === 'external';
}

function getPageComponents(state: IState): IPageComponent[] {
  return buildPageComponents(state);
}

function getRoutesAliasesRedirects(state: IState) {
  const pageComponentsInfo = getPageComponentsInfo(state);
  return Object.keys(pageComponentsInfo)
    .map(pageComponentId => pageComponentsInfo[pageComponentId])
    .filter(({ isEnabled, routeAliases }) => isEnabled && routeAliases)
    .map(({ route, routeAliases }) => routeAliases.map(alias => ({ route: alias, redirectTo: route })))
    .reduce((acc, curr) => [...acc, ...curr], []);
}

function buildExternalRoute(state: IState): JSX.Element {
  const redirectPath = getRedirectPath(state);

  if (!redirectPath) {
    return null;
  }

  saveUrlParams(window.location);
  return <Route key="external" path="/external"
                onEnter={({ location }, replace) => replace({ ...location, pathname: redirectPath })}/>;
}

function buildRedirectURL(state: IState, appDefId: string): string {
  const metaSiteId = getMetaSiteId(state);
  if (shouldUseOldBlogOrHotelsHack(state, appDefId)) {
    return `/${metaSiteId}/${getPageComponentsInfo(state)[PageComponentId.Etpa_Container].route}/${appDefId}`;
  }

  const withoutDeepLink = window.location.hash === '';
  const shouldRedirectToHome = withoutDeepLink && shouldUseHomeAsLandingPage(state, appDefId);

  if (shouldRedirectToHome) {
    return `/${metaSiteId}/${getPageComponentsInfo(state)[PageComponentId.Home].route}/`;
  }

  return `/${metaSiteId}/${getPageComponentInfoByAppDefId(state, appDefId).route}/`;
}

function getRedirectPath(state: IState, url: string = window.location.href): string {
  if (isExternal(url)) {
    const appDefId = getUrlParamFirstValue('appDefId', url);
    return buildRedirectURL(state, appDefId);
  }
}

function getPathWithoutBasename(url: string) {
  return URI(url).segment(0, '').pathname();
}

export function getAppPath(state: IState, url: string): string {
  return getRedirectPath(state, url) || getPathWithoutBasename(url);
}

function redirectAppDefIdToRoute(replace, location, state) {
  const [appMarker, appDefId] = location.pathname.split('/').slice(1);
  if (appMarker !== 'app' || !appDefId) {
    return;
  }
  const pageInfo = getPageComponentInfoByAppDefId(state, appDefId);
  if (pageInfo) {
    const patchedPathname = location.pathname.replace(`/app/${appDefId}`, `/${pageInfo.route}`);
    const patchedUrl = `${patchedPathname}${location.search}`;
    replace(patchedUrl);
  }
}

const handleRouteEnter = (state, location, replace) => {
  saveUrlParams(location);
  redirectAppDefIdToRoute(replace, location, state);
  patchHashUrls(replace, location);
};

function shouldUseOldBlogOrHotelsHack(state: IState, appDefId: string) {
  const isEtpaContainerInBizMgr = !!getPageComponentsInfo(state)[PageComponentId.Etpa_Container];

  return isEtpaContainerInBizMgr && (appDefId === appDefIds.blog || appDefId === appDefIds.hotels);
}

export function createRoutes(store: Store<IState>) {
  const state = store.getState();

  const pageComponentsElements = getPageComponents(state)
    .map(({ route, component }) =>
      ({
        routing: <Route
          key={route}
          path={`${route}(/**)`}
          component={component}
          onEnter={addMissingUrlParams()}/>,
        pathLength: route.length
      }));

  const onRedirectAlias = (redirectFromPath: string, redirectToPath: string, location: ReactRouterLocation, replace: RedirectFunction) => {
    const url = location.pathname.replace(`/${redirectFromPath}`, `/${redirectToPath}`);
    replace(new URI(url).search(location.search).toString());
  };

  const routesAliasesElements = getRoutesAliasesRedirects(state)
    .map(({ route, redirectTo }) => ({
      routing: <Route
        key={route}
        path={`${route}(/**)`}
        onEnter={({ location }, replace) => onRedirectAlias(route, redirectTo, location, replace)}
      />,
      pathLength: route.length
    }));

  const elements = [...pageComponentsElements, ...routesAliasesElements]
    .sort((a, b) => b.pathLength - a.pathLength)
    .map(({ routing }) => routing);

  return ([
    buildExternalRoute(state),
    <Route key="route" path="/:metaSiteId" component={App}
           onEnter={({ location }, replace) => handleRouteEnter(state, location, replace)}>
      <IndexRedirect to={isAppInstalled(state, appDefIds.wixExpertsDashboard) ? 'partner-home' : 'home'}/>
      {elements}
      <Route key="fallback-route" path={`*`} component={PageNotFoundErrorPage}/>
    </Route>
  ]);
}
