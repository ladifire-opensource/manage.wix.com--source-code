import { ModuleRegistry } from 'react-module-container';
import { ComponentType } from 'react';
import { ConnectMailboxModalProps } from './components/ConnectMailboxModal/ConnectMailboxModal';
import { ConnectMailboxSuccessModalProps } from './components/ConnectMailboxSuccessModal/ConnectMailboxSuccessModal';
import { IBMModuleParams } from './config';
import { Subtract } from 'utility-types';

export const inboxSettingsComponentName = 'inbox-settings-component';
export const inboxSettingsLazyComponentName = 'inbox-settings-lazy';

export const connectMailboxModalLazyComponentName =
  'inbox-settings@connect-mailbox-modal-lazy';
export const connectMailboxModalComponentName =
  'inbox-settings@connect-mailbox-modal';

export const connectMailboxSuccessModalLazyComponentName =
  'inbox-settings@connect-mailbox-success-modal-lazy';
export const connectMailboxSuccessModalComponentName =
  'inbox-settings@connect-mailbox-success-modal';

export const getConnectMailboxModal = (): ComponentType<
  Subtract<ConnectMailboxModalProps, IBMModuleParams>
> => ModuleRegistry.component(connectMailboxModalLazyComponentName);

export const getConnectMailboxSuccessModal = (): ComponentType<
  Subtract<ConnectMailboxSuccessModalProps, IBMModuleParams>
> => ModuleRegistry.component(connectMailboxSuccessModalLazyComponentName);
