import React, { useEffect, useRef } from 'react';
import { throttle } from 'lodash';

const SizeDetectorProvider = ({ children }: any) => {
  const [size, setSize] = React.useState({ width: 0, height: 0 });
  const componentRef = useRef(null);

  const getComponentSize = () => {
    let width = 0,
      height = 0;
    if (componentRef.current) {
      width = componentRef.current.clientWidth;
      height = componentRef.current.clientHeight;
    }
    return { width, height };
  };

  useEffect(() => {
    const updateSizeCallback = throttle(() => setSize(getComponentSize()), 500);
    window.addEventListener('resize', updateSizeCallback);
    return () => window.removeEventListener('resize', updateSizeCallback);
  }, []);

  return (
    <div ref={componentRef}>
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child, size);
        }
        return child;
      })}
    </div>
  );
};

export const withSizeDetector = (Component: React.ElementType) => {
  return (props: any) => {
    return (
      <SizeDetectorProvider>
        <Component {...props} />
      </SizeDetectorProvider>
    );
  };
};
