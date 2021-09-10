import React, { useState } from 'react';
import { Box, Divider } from 'wix-style-react';
import classNames from 'classnames';

import styles from './WidgetLayouterNext.scss';
import { withSizeDetector } from '../../../hocs/withSizeDetector';

const getRawItemsNumber = (_index, _length) => {
  return 1;
};

const WidgetLayouterNextComponent = ({
  children,
  width,
  hideLastDivider = false,
  imitateHoveringIndex = -1,
}) => {
  const [hovered, setHovered] = useState(-1);

  let childrenComponents = children;
  if (typeof children === 'function') {
    childrenComponents = children(getRawItemsNumber, width);
  }

  return (
    <Box direction="vertical">
      {childrenComponents.map((child, index) => {
        return (
          <>
            <Box>
              <div
                className={styles.childWrapper}
                onMouseEnter={() => setHovered(index)}
                onMouseLeave={() => setHovered(-1)}
              >
                {child}
              </div>
            </Box>
            {(!hideLastDivider || index < childrenComponents.length - 1) && (
              <Box align="center">
                <div
                  className={classNames(styles.horizontalDivider, {
                    [styles.horizontalDividerHovered]:
                      index === imitateHoveringIndex ||
                      index === imitateHoveringIndex - 1 ||
                      index === hovered ||
                      index === hovered - 1,
                  })}
                >
                  <Divider />
                </div>
              </Box>
            )}
          </>
        );
      })}
    </Box>
  );
};

export const WidgetLayouterNext = withSizeDetector(WidgetLayouterNextComponent);
