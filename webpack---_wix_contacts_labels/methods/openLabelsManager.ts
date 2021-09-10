import { createElement } from 'react';
import ReactDOM from 'react-dom';

import { MethodFn } from '@wix/yoshi-flow-bm';
import { ModuleRegistry } from 'react-module-container';

const openLabelsManager: MethodFn = () => {
	const component = ModuleRegistry.component(
		'contacts-labels.components.ManageLabels',
	);
	const portal = document.createElement('div');
	const props = {
		isOpen: true,
		onClose: () => {
			unmountManageLabelsModal();
		},
	};
	portal.setAttribute('id', 'contacts-labels-manager-portal');
	document.body.appendChild(portal);
	ReactDOM.render(createElement(component, props), portal);
};

const unmountManageLabelsModal = () => {
	const portal = document.getElementById('contacts-labels-manager-portal');
	if (portal) {
		ReactDOM.unmountComponentAtNode(portal);
		portal.parentNode!.removeChild(portal);
	}
};

export default openLabelsManager;
