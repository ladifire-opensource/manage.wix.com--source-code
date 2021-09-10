import React, { memo, FC, useContext } from 'react';
import { AppContext } from '../app-context/app-context';
import { Permissions } from '@src/types';
import { Mailbox } from './mailbox.component';
import { useModuleParams, useTranslation } from 'yoshi-flow-bm-runtime';

export enum MAILBOX_BI_NAME {
  MANAGE = 'site_details.mail_boxes.manage',
  CONNECT = 'site_details.mail_boxes.get_branded_mailbox',
}

export const MailboxContainer: FC = memo(() => {
  const {
    services: { biLogger },
    widgetData: { mailBoxConnected, mailBoxExternal },
  } = useContext(AppContext);
  const { userPermissions } = useModuleParams();
  const [t] = useTranslation();

  const isPermittedToManage = userPermissions.includes(
    Permissions.MANAGE_MAILBOX,
  );

  function getMailBoxesDescriptionText() {
    const prefix: string = 'site_details.mail_boxes.';

    if (!mailBoxConnected) {
      return t(`${prefix}not_connected`);
    }

    if (mailBoxExternal) {
      return t(`${prefix}external_connected`);
    }

    return t(`${prefix}connected`);
  }

  const handleCtaClicked = () => {
    biLogger.sendClickInDashboard(
      mailBoxConnected ? MAILBOX_BI_NAME.MANAGE : MAILBOX_BI_NAME.CONNECT,
    );
  };
  if (mailBoxConnected === undefined || mailBoxExternal === undefined) {
    return null;
  }

  return (
    <Mailbox
      onCtaClicked={handleCtaClicked}
      isPermittedToManage={isPermittedToManage}
      description={getMailBoxesDescriptionText()}
      mailBoxConnected={mailBoxConnected}
      mailBoxExternal={mailBoxExternal}
    />
  );
});
