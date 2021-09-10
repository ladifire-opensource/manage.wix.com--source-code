export const BM_PANEL_DISPLAY_MODE = {
  DEFAULT: 'DEFAULT',
  COMPOSER: 'COMPOSER',
};

export const SAVE_METHOD_TYPE = {
  DONE_BUTTON: 'DONE_BUTTON',
  ON_BLUR: 'ON_BLUR',
};

export const BM_PANEL_DISPLAY_CONFIG = {
  [BM_PANEL_DISPLAY_MODE.DEFAULT]: {
    saveMethodType: SAVE_METHOD_TYPE.DONE_BUTTON,
    showHeader: true,
    cssRootClass: 'root',
    useMaxLengthForUriField: true,
  },
  [BM_PANEL_DISPLAY_MODE.COMPOSER]: {
    saveMethodType: SAVE_METHOD_TYPE.ON_BLUR,
    showHeader: false,
    cssRootClass: 'composerRoot',
    useMaxLengthForUriField: false,
  },
};

export const BM_SIDEBAR_WIDTH = 402;
