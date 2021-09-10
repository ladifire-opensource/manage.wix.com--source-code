import { combineReducers } from 'redux';
import { embeddedServices } from './embeddedServicesReducers';
import { apps } from './appsReducers';
import { siteMetaData } from './siteMetaData';
import { toasts } from './toastsReducers';
import { IState } from '../types/store';
import { experimentsReducer } from '../services/essentials';
import { ICurrentUser } from '../../common/types/user';
import { tip } from './tipsReducer';
import { answersChat } from './answersChatReducer';
import { overlay } from './overlayReducers';

const buildFakeReducer = (defaultValue) => (state = defaultValue, action) => state;

const currentUserInitialState: ICurrentUser = {
  id: '',
  language: ''
};

export default combineReducers<IState>({
  currentUser: buildFakeReducer(currentUserInitialState),
  siteMetaData,
  liveSite: buildFakeReducer(null),
  apps,
  embeddedServices,
  isDebug: buildFakeReducer(false),
  coBranding: buildFakeReducer({}),
  brand: buildFakeReducer(null),
  clientTopology: buildFakeReducer({}),
  pageComponentsInfo: buildFakeReducer({}),
  modulesInfo: buildFakeReducer({}),
  experiments: experimentsReducer,
  viewMode: buildFakeReducer(''),
  toasts,
  overlay,
  tip,
  answersChat,
  accountId: buildFakeReducer('')
});
