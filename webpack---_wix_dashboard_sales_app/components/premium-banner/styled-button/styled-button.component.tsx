import React, { FC } from 'react';
import styled from 'styled-components';
import { Button } from 'wix-style-react';
import { rgba } from 'polished';
import { useTranslation } from '@wix/yoshi-flow-bm';
import { useActions } from '@src/actions/premium-banner.actions';
import { CTA } from '@types';
import classnames from 'classnames';
import styles from './styled-button.scss';

const StyledButtonCore: FC<StyledButtonProps> = ({ titleKey, className, dataHook, url }) => {
  const { t } = useTranslation();
  const { openUrl } = useActions();

  const onClick = () => openUrl(url);

  return (
    <Button
      dataHook={dataHook}
      size="medium"
      className={classnames(styles.button, className)}
      onClick={onClick}
    >
      {t(titleKey)}
    </Button>
  );
};

export interface StyledButtonProps extends CTA {
  className?: string;
  dataHook?: string;
}

export const StyledButton = styled(StyledButtonCore)`
  color: ${({ color }) => color}!important;
  background-color: ${({ backgroundColor }) => backgroundColor}!important;
  border: none !important;
  &:hover {
    color: ${({ color }) => color}!important;
    background-color: ${({ backgroundColor }) => rgba(backgroundColor, 0.83)}!important;
    border: none !important;
  }
`;
