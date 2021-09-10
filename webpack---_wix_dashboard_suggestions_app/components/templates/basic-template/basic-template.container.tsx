import React from 'react';
import { BasicTemplateComponent } from './basic-template.component';
import { BasicTemplateImage } from './sub-components/image';
import { BasicTemplateData } from '@src/common/templates';
import { ViewType, TemplateCommonProps } from '@src/common/types';

export interface BasicTemplateProps extends TemplateCommonProps {}

export const BasicTemplate: React.FC<BasicTemplateProps> = ({
  dataHook,
  suggestion,
  index,
  viewType,
  onMainCTAClick,
  onSecCTAClick,
}) => {
  const { illustrationUrl } = suggestion.data as BasicTemplateData;
  const isTopSuggestion = viewType === ViewType.TOP;

  return (
    <BasicTemplateComponent
      dataHook={dataHook}
      index={index}
      image={
        <BasicTemplateImage
          hasShadow={false}
          marginRight={isTopSuggestion ? '0px' : '10px'}
          width="60px"
          height="60px"
          viewType={viewType}
          thumbnailUrl={illustrationUrl}
        />
      }
      suggestion={suggestion}
      viewType={viewType}
      onMainCTAClick={onMainCTAClick}
      onSecCTAClick={onSecCTAClick}
    />
  );
};
