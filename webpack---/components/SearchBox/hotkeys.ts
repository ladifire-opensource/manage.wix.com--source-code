
export function registerHotkey(keyCombo: string, handler: () => any) {
  let hotkeys = require('hotkeys-js');
  hotkeys = hotkeys.default || hotkeys;
  hotkeys(keyCombo, handler);
}
