import React, { FC } from 'react';
import { Text, TextSize, TextWeight } from 'wix-style-react';
import styled from 'styled-components';

const StyledTextComponentCore: FC<StyledTextComponentProps> = ({
  weight,
  text,
  size,
  className,
  dataHook,
}) => (
  <Text size={size || 'medium'} className={className} dataHook={dataHook} weight={weight}>
    {text}
  </Text>
);

export interface StyledTextComponentProps {
  className?: string;
  dataHook?: string;
  size?: TextSize;
  text: string;
  weight: TextWeight;
  color: string;
}

export const StyledTextComponent = styled(StyledTextComponentCore)`
  color: ${({ color }) => color}!important;
`;
