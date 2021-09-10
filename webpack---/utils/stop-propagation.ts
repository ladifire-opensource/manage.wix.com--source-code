export const invokeAndStopPropagation = (eventHandler: Function) =>
  e => {
    e.stopPropagation();
    eventHandler(e);
  };
