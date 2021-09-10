import React from 'react';
import style from './style.scss';
import { isDescendant } from '../../utils/is-descendant';

export interface PropTypes {
  content: any;
  children: any;
  onOpen?(): void;
  onClose?(): void;
  excludeClass: string;
  hideInsteadOfUnmounting?: boolean;
  positionOffset?: {
    x: number;
    y: number;
  };
}

export interface StateTypes {
  isOpen: boolean;
}

export class Dropdown extends React.PureComponent<PropTypes, StateTypes> {
  private dropdownContainerRef: HTMLSpanElement;

  static defaultProps: Partial<PropTypes> = {
    onOpen: () => null,
    onClose: () => null,
    positionOffset: {
      x: 0,
      y: 0
    }
  };

  readonly state: StateTypes = {
    isOpen: false
  };

  componentWillUnmount() {
    if (this.state.isOpen) {
      this.close();
    }
  }

  open() {
    const { onOpen } = this.props;
    document.addEventListener('click', this.closeIfClickedOutsideOfDialog);
    window.addEventListener('blur', this.closeIfClickedOnIframe);
    this.setState({ isOpen: true });
    onOpen();
  }

  close() {
    const { onClose } = this.props;
    document.removeEventListener('click', this.closeIfClickedOutsideOfDialog);
    window.removeEventListener('blur', this.closeIfClickedOnIframe);
    this.setState({ isOpen: false });
    onClose();
  }

  toggleOpen = () => {
    if (this.state.isOpen) {
      this.close();
    } else {
      this.open();
    }
  }

  closeIfClickedOutsideOfDialog = (event: MouseEvent) => {
    const child = (event.target || event.srcElement) as Element;
    if (this.props.excludeClass && child?.classList?.contains(this.props.excludeClass)) {
      return;
    }
    const elementStillExists = isDescendant(document, child);
    if (elementStillExists && this.dropdownContainerRef && !isDescendant(this.dropdownContainerRef, child)) {
      this.close();
    }
  }

  closeIfClickedOnIframe = () => {
    if (document.activeElement instanceof HTMLIFrameElement) {
      this.close();
    }
  }

  renderDropdown() {
    const { content, positionOffset, hideInsteadOfUnmounting } = this.props;
    const { isOpen } = this.state;
    if (isOpen || hideInsteadOfUnmounting) {
      return (
        <div style={{
          transform: `translate(${positionOffset.x}px, ${positionOffset.y}px)`,
          display: isOpen ? '' : 'none'
          }}>
          <div className={style.arrow}/>
          <div className={style.dropdown}>
            {content}
          </div>
        </div>
      );
    } else {
      return null;
    }
  }

  render() {
    const { children } = this.props;
    return (
      <span className={style.container} ref={(ref) => this.dropdownContainerRef = ref}>
        <div className={style.trigger} onClick={this.toggleOpen}>
          {children}
        </div>
        {this.renderDropdown()}
      </span>
    );
  }
}
