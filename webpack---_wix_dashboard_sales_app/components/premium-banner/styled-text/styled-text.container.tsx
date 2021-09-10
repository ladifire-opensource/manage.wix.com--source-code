import React, { FC, useMemo } from 'react';
import { TextSize } from 'wix-style-react';
import { useModuleParams, useTranslation } from '@wix/yoshi-flow-bm';
import { BannerText, TextWeight } from '@types';
import { DOMAIN_NAME_PLACEHOLDER, SITE_NAME_PLACEHOLDER, DATE_VALUE_PLACEHOLDER } from '@consts';
import { useStaticParams } from '@src/contexts';
import { StyledTextComponent } from './styled-text.component';
import dayjs from 'dayjs';
import IntlMessageFormat from 'intl-messageformat';

const mapBannerWeightToWsrWeight: Record<TextWeight, 'thin' | 'bold'> = {
  [TextWeight.NORMAL]: 'thin',
  [TextWeight.BOLD]: 'bold',
};

export interface StyledTextProps extends BannerText {
  className?: string;
  dataHook?: string;
  size?: TextSize;
  plainText?: string;
  dateValue?: Date;
}

export const StyledText: FC<StyledTextProps> = ({
  dateValue,
  plainText,
  titleKey,
  weight,
  ...restOfProps
}) => {
  const { t } = useTranslation();
  const { accountLanguage } = useModuleParams();
  const { siteName, primaryDomain } = useStaticParams();

  const text = useMemo(() => {
    const dynamicParams = {
      [SITE_NAME_PLACEHOLDER]: siteName,
      [DOMAIN_NAME_PLACEHOLDER]: primaryDomain,
      [DATE_VALUE_PLACEHOLDER]: dateValue,
    };

    if (plainText) {
      return plainText;
    }

    if (dateValue) {
      if (accountLanguage === 'th') {
        const thaiTimeValue = dayjs(dateValue).locale('en').format('hh:mm A');
        return new IntlMessageFormat(t(titleKey), 'th-u-ca-gregory')
          .format({
            ...dynamicParams,
            thaiTimeValue,
          })
          ?.toString();
      }
      if (accountLanguage === 'zh') {
        return new IntlMessageFormat(t(titleKey), 'zh-tw').format(dynamicParams)?.toString();
      }
    }

    return t(titleKey, dynamicParams);
  }, [siteName, primaryDomain, titleKey, accountLanguage, dateValue, plainText, t]);

  return (
    <StyledTextComponent
      text={text!}
      weight={mapBannerWeightToWsrWeight[weight]}
      {...restOfProps}
    />
  );
};
