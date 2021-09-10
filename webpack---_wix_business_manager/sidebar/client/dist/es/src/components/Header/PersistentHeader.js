import * as React from 'react';
import { Header } from './Header';
import { ProgressBar } from '../OmniSetupProgressBar/OmniSetupProgressBar';
export var PersistentHeader = function () {
    return (React.createElement(Header, { dataHook: "persistent-header" },
        React.createElement(ProgressBar, null)));
};
//# sourceMappingURL=PersistentHeader.js.map