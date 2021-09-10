import { TModuleParams } from './commonTypes';
import { INBOX_CONVERSATION_COMPONENT_NAME } from './component-names';
import { fedopsInit } from '../services/fedops/init';
import { FEDOPS_APP_NAMES } from '../constants/fedopsLoggerApps';
import { ReactLazyComponent } from 'react-module-container';

const minified = (debug) => (debug ? '' : '.min');

export default class InboxConversationLazyComponent extends ReactLazyComponent<TModuleParams> {
  constructor(props: TModuleParams) {
    fedopsInit(FEDOPS_APP_NAMES.INBOX_TAB);
    const manifest = {
      files: [
        `${
          props.config.topology.engageWebStaticsUrl
        }register-engage-conversation-component.bundle${minified(
          props.debug,
        )}.js`,
        `${
          props.config.topology.engageWebStaticsUrl
        }register-engage-conversation-component${minified(props.debug)}.css`,
      ],
      component: INBOX_CONVERSATION_COMPONENT_NAME,
    };
    super(props, manifest);
  }
}
