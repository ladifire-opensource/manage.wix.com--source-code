import { flexCenter, userSelectNone, zIndex } from './mixins';
import {
  CHATBOT_WIDGET_ANCHOR_CONTAINER,
  CHATBOT_WIDGET_IFRAME_CONTAINER,
  CHATBOT_WIDGET_IFRAME,
  CHATBOT_WIDGET_NOSCROLL,
  MOBILE_MEDIA_QUERY,
  CHATBOT_WIDGET_BUTTON_CONTAINER,
  CHATBOT_WIDGET_TOOLTIP_CONTAINER,
  CHATBOT_WIDGET_TOOLTIP_TITLE,
  CHATBOT_WIDGET_TOOLTIP_BOT_ICON,
  CHATBOT_WIDGET_TOOLTIP_CLOSE_ICON,
  CHATBOT_WIDGET_TOOLTIP_TITLE_TEXT,
  CHATBOT_WIDGET_TOOLTIP_CONTENT,
} from '../constants';

const STYLES = `
/* support chatbot styles */
.${CHATBOT_WIDGET_IFRAME_CONTAINER} {
  ${userSelectNone}
  ${zIndex}
  display: block;
  position: fixed;
  bottom: 3vh;
  right: 1.5vw;
  outline: none;
  padding: 0 10px 10px;
  cursor: move;
  will-change: left, top;
}

.${CHATBOT_WIDGET_IFRAME} {
  width: 360px;
  height: 85vh;
  min-height: 300px;
  max-height: 625px;
  overflow: hidden;
  border: none;
  border-radius: 6px;
  background: #fff url(https://static.wixstatic.com/media/e3b156_740679ad1e1b4264927b20f025df67ab~mv2.gif) no-repeat 50%;
  box-shadow: 0 2px 34px 0 rgba(0,0,0,.15);
}

.${CHATBOT_WIDGET_ANCHOR_CONTAINER} {
  ${flexCenter}
  width: 46px;
  height: 46px;
  border: none;
  border-radius: 50%;
  position: relative;
  background-color: #162D3D;
  outline: none;
  cursor: pointer;
}

.${CHATBOT_WIDGET_BUTTON_CONTAINER} {
  ${flexCenter}
  ${userSelectNone}
  ${zIndex}
  position: fixed;
  bottom: 30px;
  right: 30px;
  padding: 3px;
  background-color: #fff;
  box-shadow: 0 0 6px 0 rgba(0,0,0,.21);
  border-radius: 50px;
  will-change: left, top;
  transition: border-radius 0.15s cubic-bezier(0.65, 0, 0.35, 1);
}

.${CHATBOT_WIDGET_BUTTON_CONTAINER}:after {
  content: ' ';
  background: #fff url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' style='transform:rotate(90deg);' viewBox='0 0 970 970' %3E%3Cpath fill='%23737a9e' d='M90 576h.5c49.7 0 90-40.3 90-90s-40.3-90-90-90H90c-49.7 0-90 40.3-90 90s40.3 90 90 90zm527.5 0h1.1c49.7 0 90-40.3 90-90s-40.3-90-90-90h-1.1c-49.7 0-90 40.3-90 90s40.3 90 90 90zm-263 0c49.7 0 90-40.3 90-90s-40.3-90-90-90h-1.1c-49.7 0-90 40.3-90 90s40.3 90 90 90h1.1zm527 0h.5c49.7 0 90-40.3 90-90s-40.3-90-90-90h-.5c-49.7 0-90 40.3-90 90s40.3 90 90 90z'/%3E%3C/svg%3E") no-repeat 50% 50%;
  height: 46px;
  cursor: move;
  display: inline-block;
  position: relative;

  opacity: 0;
  width: 0;
  right: -12px;

  transition: width 0.3s cubic-bezier(0.65, 0, 0.35, 1);
}

.${CHATBOT_WIDGET_BUTTON_CONTAINER}:hover,
.${CHATBOT_WIDGET_BUTTON_CONTAINER}:active {
  border-radius: 50px 6px 6px 50px;
}

.${CHATBOT_WIDGET_BUTTON_CONTAINER}:hover:after,
.${CHATBOT_WIDGET_BUTTON_CONTAINER}:active:after {
  opacity: 1;
  width: 12px;
  right: 0;
}

.${CHATBOT_WIDGET_TOOLTIP_CONTAINER} {
  ${zIndex}
  display: none;
  align-items: flex-start;
  flex-direction: column;
  position: fixed;
  bottom: 95px;
  right: 30px;
  width: 287px;
  background-color: #fff;
  border-radius: 4px;
  box-shadow: 0px 0px 18px rgba(22, 45, 61, 0.12), 0px 6px 6px rgba(22, 45, 61, 0.06);
  padding: 20px;
  font-family: Madefor;
  cursor: pointer;
}

.${CHATBOT_WIDGET_TOOLTIP_TITLE} {
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  width: 100%;
  line-height: 24px;
  font-size: 16px;
}

.${CHATBOT_WIDGET_TOOLTIP_BOT_ICON} {
  width: 17%;
  text-align: left;
  line-height: 12px;
}

.${CHATBOT_WIDGET_TOOLTIP_BOT_ICON}:after {
  content: ' ';
  background: #fff url("data:image/svg+xml,%3Csvg width='36' height='36' viewBox='0 0 36 36' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M18 35.4882C21.9223 35.4882 25.5517 34.7454 28.5086 32.6157C33.0459 29.3476 36 24.0188 36 18C36 8.05887 27.9411 0 18 0C8.05887 0 0 8.05887 0 18C0 24.0254 2.96055 29.3593 7.50635 32.6264C10.4605 34.7496 14.0843 35.4882 18 35.4882Z' fill='%23C2E2FF'/%3E%3Cpath d='M29.0009 10.39C31.21 10.39 33.0009 12.1809 33.0009 14.39V16C33.0009 18.2092 31.21 20 29.0009 20V10.39ZM7.00085 10.39C5.90532 10.424 4.86822 10.892 4.11796 11.691C3.3677 12.49 2.96583 13.5545 3.00085 14.65V15.71C2.96037 16.8099 3.35951 17.8806 4.11007 18.6856C4.86064 19.4906 5.90085 19.9635 7.00085 20' fill='%23192C55'/%3E%3Cpath d='M28.5595 32.57C28.4777 32.6368 28.3907 32.697 28.2995 32.75C22.9803 36.4791 16.0609 37.0413 10.2095 34.22C9.33197 33.7994 8.49222 33.3043 7.69945 32.74L7.43945 32.56C8.83673 29.4318 11.9434 27.4182 15.3695 27.42H20.6295C24.0594 27.4148 27.1692 29.4344 28.5595 32.57Z' fill='%23116DFF'/%3E%3Cpath d='M16 23.16H20C20.5523 23.16 21 23.6077 21 24.16V27.61C21 29.2668 19.6569 30.61 18 30.61C16.3431 30.61 15 29.2668 15 27.61V24.16C15 23.6077 15.4477 23.16 16 23.16Z' fill='%23192C55'/%3E%3Cpath d='M25 6H11C7.68629 6 5 8.68629 5 12V18C5 21.3137 7.68629 24 11 24H25C28.3137 24 31 21.3137 31 18V12C31 8.68629 28.3137 6 25 6Z' fill='%23116DFF'/%3E%3Cpath d='M18.0008 22C14.9372 21.9645 11.9909 20.8165 9.71084 18.77C7.68275 16.9692 7.41084 13.8992 9.09084 11.77C9.86468 10.7632 11.021 10.1219 12.2849 9.99877C13.5488 9.87561 14.8072 10.2815 15.7608 11.12C16.3539 11.716 17.16 12.0511 18.0008 12.0511C18.8416 12.0511 19.6478 11.716 20.2408 11.12C21.1945 10.2815 22.4529 9.87561 23.7168 9.99877C24.9806 10.1219 26.137 10.7632 26.9108 11.77C28.5909 13.8992 28.3189 16.9692 26.2908 18.77C24.0108 20.8165 21.0645 21.9645 18.0008 22Z' fill='%23FDFDFD'/%3E%3Cpath d='M23.4992 16.3C24.4933 16.3 25.2992 15.4941 25.2992 14.5C25.2992 13.5059 24.4933 12.7 23.4992 12.7C22.5051 12.7 21.6992 13.5059 21.6992 14.5C21.6992 15.4941 22.5051 16.3 23.4992 16.3Z' fill='%23192C55'/%3E%3Cpath d='M12.4992 16.3C13.4933 16.3 14.2992 15.4941 14.2992 14.5C14.2992 13.5059 13.4933 12.7 12.4992 12.7C11.5051 12.7 10.6992 13.5059 10.6992 14.5C10.6992 15.4941 11.5051 16.3 12.4992 16.3Z' fill='%23192C55'/%3E%3Cpath d='M17.9997 19C16.7698 19.0154 15.5628 18.6675 14.5297 18L15.0797 17.16C16.8442 18.3508 19.1551 18.3508 20.9197 17.16L21.4697 18C20.4366 18.6675 19.2296 19.0154 17.9997 19ZM23.3197 6.12999L19.6397 8.33999C18.6289 8.94074 17.3705 8.94074 16.3597 8.33999L12.6797 6.12999C13.3272 4.82283 14.661 3.99696 16.1197 3.99998H19.8797C21.3384 3.99696 22.6722 4.82283 23.3197 6.12999ZM17.9997 33.77C14.7412 33.7862 12.0045 31.3223 11.6797 28.08L12.6797 27.98C12.9693 30.7057 15.2687 32.7737 18.0097 32.7737C20.7507 32.7737 23.0501 30.7057 23.3397 27.98L24.3397 28.08C24.0097 31.3277 21.2641 33.7919 17.9997 33.77Z' fill='%23192C55'/%3E%3C/svg%3E%0A") no-repeat 50% 50%;
  width: 36px;
  height: 36px;
  display: inline-block;
}

.${CHATBOT_WIDGET_TOOLTIP_TITLE_TEXT} {
  width: 73%;
  color: #162D3D;
  font-weight: var(--wix-font-weight-medium, 530);
}

.${CHATBOT_WIDGET_TOOLTIP_CLOSE_ICON} {
  align-self: start;
  width: 10%;
  height: 36px;
  cursor: pointer;
  text-align: right;
}

.${CHATBOT_WIDGET_TOOLTIP_CLOSE_ICON}:after {
  content: ' ';
  background: #fff url("data:image/svg+xml,%3Csvg width='11' height='11' viewBox='0 0 11 11' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M10.0169 0L5.5 4.51631L0.984497 0L0 0.983002L4.51688 5.50069L0 10.017L0.984497 11L5.5 6.48369L10.0169 11L11 10.017L6.48312 5.50069L11 0.983002L10.0169 0Z' fill='%23B6C1CD'/%3E%3C/svg%3E%0A") no-repeat 50% 50%;
  width: 11px;
  height: 17px;
  display: inline-block;
}

.${CHATBOT_WIDGET_TOOLTIP_CONTENT} {
  margin-top: 14px;
  font-size: 14px;
  line-height: 18px;
  color: #32536A;
}

.${CHATBOT_WIDGET_TOOLTIP_CONTAINER}>button {
  font-size: 14px;
  line-height: 18px;
  color: #3899EC;
  background: #fff;
  font-weight: var(--wix-font-weight-medium, 530);
  cursor: pointer;
  margin: 6px 0 0 0;
  padding: 0;
  font-family: 'Madefor';
}

@media ${MOBILE_MEDIA_QUERY} {
  body.${CHATBOT_WIDGET_NOSCROLL} {
    overflow: hidden;
  }

  .${CHATBOT_WIDGET_IFRAME} {
    width: 100vw;
    box-shadow: none;
    max-height: none;
    border-radius: 0;
  }

  .${CHATBOT_WIDGET_IFRAME_CONTAINER} {
    top: 0;
    right: 0;
    padding: 0;
    z-index: 9999;
    height: 100vh;
    background-color: #f0f4f7;
  }
}
`;

export const addGlobalStyles = () => {
  const style = document.createElement('style');
  style.id = 'chatbot-widget-global-styles';
  style.innerHTML = STYLES;
  document.head.appendChild(style);
};
