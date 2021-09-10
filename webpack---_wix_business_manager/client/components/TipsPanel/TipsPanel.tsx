import * as React from 'react';
import { connect } from 'react-redux';
import { IState } from '../../types/store';
import { selectTip } from '../../selectors/tipSelectors';
import { Tip, TipProps, TipActionType } from './Tip';
import { getTipExternlLink } from '../../services/getTipExternalLink';
import { openInANewTab, extendConfigWithReferrer } from '../../services/navigationServices';
import { createTipInteractionReporter } from '../../external-api/show-tip/tipInteractionReporter';
import { I18nextProvider } from '@wix/wix-i18n-config';
import { hideTip } from '../../actions/tipActions';
import { configureI18N } from '../../services/i18n-config';
import { getTipsTranslationsStaticsUrl } from '../../selectors/clientTopologySelectors';
import { getCurrentUserLanguage } from '../../selectors/currentUserSelectors';
import { sendBusinessManagerBI } from '../../services/BIService';
import { BIEvents } from '../../../common/consts/bi';
import { getMetaSiteId } from '../../selectors/siteMetaDataSelectors';
import { getEditorSiteId } from '../../selectors/liveSiteSelectors';
import { navigateTo, buildPageComponentLink } from '@wix/business-manager-api';
import * as wixRecorderMethods from '../../services/wix-recorder-methods';
import { FontUpgrade } from 'wix-style-react';
import { reportDealerEventView, reportDealerEventMainCtaClicked } from '../../external-api/reportDealerEvent/reportDealerEvent';
import * as URI from 'urijs';

type TipsPanelProps = {
  showTip: boolean;
  tip: Partial<TipProps>;
  msid: string;
  editorSiteId: string;
  locale: string;
  experiments: any;
  translationsUrl: string;
};

const mapStateToProps = (state: IState): TipsPanelProps => {
  const tip = selectTip(state);

  return ({
    showTip: !!tip,
    msid: getMetaSiteId(state),
    editorSiteId: getEditorSiteId(state),
    translationsUrl: getTipsTranslationsStaticsUrl(state),
    locale: getCurrentUserLanguage(state),
    experiments: state.experiments,
    tip
  });
};

export class TipsPanelView extends React.Component<TipsPanelProps & { performHideTip: Function }> {
  private tipsI18NextInstance;
  private reporter;

  constructor(props) {
    super(props);
    const { translationsUrl, locale, experiments } = this.props;
    this.tipsI18NextInstance = configureI18N({ translationsUrl, locale, experiments });
    this.reporter = createTipInteractionReporter(this.props.msid);
  }

  buildLinkToDealerReport = (link: string): string => {
    const uri = new URI(link);
    if (!uri.is('absolute')) {
      return new URL(link, window.location.origin).toString();
    }
    return link;
  }

  onActionClick = () => {
    const { id, action } = this.props.tip;
    this.reporter.itemClicked(id);
    this.reportBi({ click_type: 'click', evid: BIEvents.tipClicked });
    let link;
    if (action.type === TipActionType.DASHBOARD) {
      const config = extendConfigWithReferrer(action.config, 'in_app_tips');
      link = buildPageComponentLink(config);
      navigateTo(config);
    } else if (action.type === TipActionType.APPMARKET_IN_EDITOR) {
      link = getTipExternlLink(this.props.editorSiteId, this.props.msid, action.config);
      openInANewTab(link);
      this.props.performHideTip();
    }
    if (link) {
      if (action.type === TipActionType.DASHBOARD) {
        link = this.buildLinkToDealerReport(link);
      }
      reportDealerEventMainCtaClicked(this.props.tip.id, link);
    }
  }
  reportBi = (extraBiData) => {
    sendBusinessManagerBI({
      ...this.props.tip.biData,
      ...extraBiData
    });
  }

  reportSeenIfNeeded = () => {
    if (!this.props.showTip) {
      return;
    }
    this.reporter.itemSeen(this.props.tip.id);
    this.reportBi({ item_mode: 'open', evid: BIEvents.tipShown });
    reportDealerEventView(this.props.tip.id);
    wixRecorderMethods.reportTip(this.props.tip.biData.asset_campaign_id);
  }

  onCloseClick = () => {
    this.reporter.itemClosed(this.props.tip.id);
    this.props.performHideTip();
    this.reportBi({ click_type: 'close', evid: BIEvents.tipClicked });
  }
  componentDidUpdate = () => {
    this.reportSeenIfNeeded();
  }
  componentDidMount = () => {
    this.reportSeenIfNeeded();
  }

  render() {
    const { tip, showTip } = this.props;
    if (!showTip) {
      return null;
    }
    const { text, title, action } = tip;
    return (
      <I18nextProvider i18n={this.tipsI18NextInstance}>
        <FontUpgrade>
          <Tip
            title={title}
            text={text}
            actionText={action.text}
            onActionClick={this.onActionClick}
            onCloseClick={this.onCloseClick}
            leftPosition={this.props.tip.leftPosition}
          />
        </FontUpgrade>
      </I18nextProvider>
    );
  }
}

export const TipsPanel = connect(mapStateToProps, { performHideTip: hideTip })(TipsPanelView);
