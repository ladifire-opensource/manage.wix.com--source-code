import React from 'react';

export const withFixedHeightWrapper =
  (height: string | number) =>
  <P extends any>(
    ComponentToWrap: React.ComponentType<P>,
  ): React.ComponentType<P> =>
  (props) => {
    return (
      <div style={{ minHeight: height }}>
        <ComponentToWrap {...props} />
      </div>
    );
  };
