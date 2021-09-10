import * as React from 'react';
import * as css from './SidePanel.scss';
import { Animator } from 'wix-animations';

const SidePanelBackdrop = ({ show, onClick }) =>
  <Animator opacity>
    {show && <div className={css.backdrop} onClick={onClick} data-hook="side-panel-backdrop"/>}
  </Animator>;

export default SidePanelBackdrop;
