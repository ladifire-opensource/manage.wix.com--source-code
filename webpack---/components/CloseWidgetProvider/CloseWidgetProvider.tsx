import React from 'react';
import { Subtract } from 'utility-types';

const CloseWidgetContext = React.createContext<InjectedCloseWidgetProps>({
  closeWidget: undefined,
});

interface CloseWidgetProviderProps {
  closeWidget(): void;
}

const CloseWidgetProvider: React.ComponentType<CloseWidgetProviderProps> = (
  props,
) => {
  const contextValue = {
    closeWidget: props.closeWidget,
  };
  return (
    <CloseWidgetContext.Provider value={contextValue}>
      {props.children}
    </CloseWidgetContext.Provider>
  );
};

export interface InjectedCloseWidgetProps {
  closeWidget(): void;
}

export const withClosingWidgetCapability =
  <P extends InjectedCloseWidgetProps>(
    ComponentToWrap: React.ComponentType<P>,
  ): React.ComponentType<Subtract<P, InjectedCloseWidgetProps>> =>
  (props) =>
    (
      <CloseWidgetContext.Consumer>
        {({ closeWidget }) => {
          const injectedProps = { ...props, closeWidget } as P;
          return <ComponentToWrap {...injectedProps} />;
        }}
      </CloseWidgetContext.Consumer>
    );

export default CloseWidgetProvider;
