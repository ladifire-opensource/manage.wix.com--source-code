import React from 'react';
import { ModuleRegistry } from 'react-module-container';
import ReactDOM from 'react-dom';
import { PromoterModalProps } from '../exported-components/promoter-modal';
import { BMMethodFlowAPI } from '@wix/yoshi-flow-bm';

export default function openPromoterModal(
  bmProps: BMMethodFlowAPI,
  props: PromoterModalProps,
) {
  const promoterModalContainer = document.createElement('div');
  const PromoterModal: React.FC<any> = ModuleRegistry.component(
    'promoter-modal',
  );
  return ReactDOM.render(<PromoterModal {...props} />, promoterModalContainer);
}
