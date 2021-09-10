const PREFiX = 'Tag Manager: ';
const showLogs = logDecision();

function logDecision() {
  let debugLogs = false;
  try {
    const _window = window as any;
    debugLogs =
      (_window && _window.debug) ||
      (_window.location &&
        (_window.location.search || '').toLowerCase().indexOf('debug=') > -1);
  } catch (e) {
    // Linty linter linted something
  }
  return debugLogs;
}

function error(text: string) {
  showLogs && console && console.error(`${PREFiX} ${text}`);
}

function log(text: string) {
  showLogs && console && console.log(`${PREFiX} ${text}`);
}

export { log, error };
