import * as URI from 'urijs';
import * as uuid from 'uuid/v4';
import { EditorType } from '@wix/business-manager-api';

type Props = {
  editUrl: string;
  referralInfo?: string;
};

export const DsOriginsByEditorType = {
  [EditorType.EDITOR]: 'Editor',
  [EditorType.ADI]: 'ADI',
  [EditorType.EDITORX]: 'EditorX'
};

export const editLinkService = ({
                                  editUrl,
                                  referralInfo = 'my-account'
                                }: Props) => {
  const esi = uuid();
  return {
    editUrl: new URI(editUrl).addQuery({ editorSessionId: esi }).addQuery({ referralInfo }).toString(),
  };
};
