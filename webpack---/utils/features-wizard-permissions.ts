export const FEATURES_WIZARD_PERMISSIONS = [
  'APP_MARKET.INSTALL_APP',
  'APP_MARKET.UPDATE_APP',
  'APP-MARKET.VIEW-INSTALLED-APP',
  'APP_MARKET.DELETE_APP',
  'APP_MARKET.OPEN_APP',
  'APP_MARKET.UNINSTALL_APPS',
  'html-editor.edit',
  'html-editor.save',
];

export const isFeaturesWizardPermitted = (userPermissions: string[]) => {
  return FEATURES_WIZARD_PERMISSIONS.every((permission) =>
    userPermissions?.includes(permission),
  );
};
