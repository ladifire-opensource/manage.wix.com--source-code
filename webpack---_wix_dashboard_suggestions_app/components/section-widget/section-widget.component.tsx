import React, { memo, useCallback } from 'react';
import { Card, Text, TextButton, Box, Layout, Button } from 'wix-style-react';
import { useTranslation } from '@wix/yoshi-flow-bm';
import { SectionWidgetDataHooks } from '../../common/hooks';
import { useSuggestions } from '../../contexts';
import { ErrorState, EmptyState } from '../states';
import { SuggestionItem } from '../suggestion-item/suggestion-item.container';
import { SuggestionOffer, ViewType } from '@src/common/types';
import ArrowRightSmall from 'wix-ui-icons-common/ArrowRightSmall';
import { ProminentFooterComponent } from './prominent-footer.component';
import { Place } from '@src/bi-logger';

export interface SectionWidgetProps {
  widgetTitle?: string;
  headerButtonText: string;
  isProminentSeeAllSuggestionExperiment: boolean;
  navigateToPage: (place: Place) => () => void;
}

export const SectionWidgetComponent: React.FC<SectionWidgetProps> = memo(
  ({ widgetTitle, headerButtonText, isProminentSeeAllSuggestionExperiment, navigateToPage }) => {
    const [t] = useTranslation();
    const { suggestions } = useSuggestions();

    const areThereAnySuggestions = !!suggestions?.length;
    const renderSuggestionsOrState = useCallback(() => {
      if (!suggestions) {
        return <ErrorState />;
      }
      if (!suggestions.length) {
        return <EmptyState />;
      }
      return (
        <Layout gap="12px" cols={1}>
          {suggestions.map((suggestion: SuggestionOffer, index: number) => (
            <SuggestionItem
              key={suggestion.offerId}
              suggestion={suggestion}
              index={index}
              viewType={ViewType.SECTION}
              dataHook={`${SectionWidgetDataHooks.SECTION_WIDGET_SUGGESTION_DATA_HOOK}_${suggestion.offerId}`}
              shouldUseVisibilityDetector
            />
          ))}
        </Layout>
      );
    }, [suggestions]);

    const renderSubtitle = useCallback(
      () =>
        areThereAnySuggestions && (
          <Text
            size="tiny"
            tagName="div"
            dataHook={SectionWidgetDataHooks.SECTION_WIDGET_SUBTITLE_DATA_HOOK}
          >
            {t('suggestion.widget.subheader')}
          </Text>
        ),
      [areThereAnySuggestions, t],
    );

    const renderSuffix = useCallback(() => {
      return (
        areThereAnySuggestions && (
          <TextButton
            size="tiny"
            weight="normal"
            onClick={navigateToPage(Place.HEADER)}
            dataHook={SectionWidgetDataHooks.HEADER_SEE_ALL_SUGGESTIONS}
            suffixIcon={
              isProminentSeeAllSuggestionExperiment ? (
                <ArrowRightSmall
                  data-hook={SectionWidgetDataHooks.HEADER_SEE_ALL_SUGGESTION_ARROW}
                />
              ) : undefined
            }
          >
            {t(headerButtonText)}
          </TextButton>
        )
      );
    }, [
      areThereAnySuggestions,
      isProminentSeeAllSuggestionExperiment,
      headerButtonText,
      navigateToPage,
      t,
    ]);

    const renderFooter = useCallback(
      () => (
        <Box paddingTop="16px" align="center">
          <Button
            priority="primary"
            size="small"
            weight="thin"
            onClick={navigateToPage(Place.FOOTER)}
            dataHook={SectionWidgetDataHooks.FOOTER_SEE_ALL_SUGGESTIONS}
          >
            {t('suggestion.widget.see.all.cta')}
          </Button>
        </Box>
      ),
      [navigateToPage, t],
    );

    return (
      <Card dataHook={SectionWidgetDataHooks.SECTION_WIDGET_SUGGESTION_DATA_HOOK}>
        <Card.Header
          title={widgetTitle || t('suggestion.widget.header')}
          subtitle={renderSubtitle()}
          suffix={renderSuffix()}
          dataHook={SectionWidgetDataHooks.SECTION_WIDGET_TITLE_DATA_HOOK}
        />
        <Card.Content>
          {renderSuggestionsOrState()}
          {areThereAnySuggestions && (isProminentSeeAllSuggestionExperiment ? (
            <ProminentFooterComponent navigateToPageFromFooter={navigateToPage(Place.FOOTER)} />
          ) : (
            renderFooter()
          ))}
        </Card.Content>
      </Card>
    );
  },
);
