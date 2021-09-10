const addCustomAttribute = (key, value) => !!window.wixRecorder && window.wixRecorder.addCustomAttribute(key, value);

export const setLanguage = (language) => addCustomAttribute('language', language);

export const reportTip = (tipName) => addCustomAttribute('globalTipIsShow', tipName);

export const reportGlobalToast = (toastName) => addCustomAttribute('globalToastIsShown', toastName);
