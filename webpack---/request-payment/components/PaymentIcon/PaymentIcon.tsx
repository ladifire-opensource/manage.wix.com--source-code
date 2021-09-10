import React, { FC, useMemo } from 'react';
import Payment from 'wix-ui-icons-common/Payment';
import { ModuleRegistry } from 'react-module-container';
import { REQUEST_PAYMENT_KEYBOARD_ICON_TOOLTIP } from '../../../config';

const PaymentIcon: FC = () => {
  const PaymentIconTooltip = useMemo(
    () => ModuleRegistry.component(REQUEST_PAYMENT_KEYBOARD_ICON_TOOLTIP),
    [],
  );

  return (
    <div
      style={{
        position: 'relative',
        lineHeight: 0,
      }}
    >
      <Payment />
      <PaymentIconTooltip />
    </div>
  );
};

export default PaymentIcon;
