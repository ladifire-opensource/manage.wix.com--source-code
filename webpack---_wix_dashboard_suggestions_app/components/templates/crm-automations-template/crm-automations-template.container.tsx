import React, { useMemo, useCallback, useEffect, useState } from 'react';
import { CrmAutomationsTemplateComponent } from './crm-automations-template.component';
import {
  AUTOMATIONS_DASHBOARD_AVAILABLE_RECIPES_COUNT,
  AUTOMATIONS_DASHBOARD_EXPLORE_MORE_BI,
  AUTOMATIONS_RECOMMENDATIONS_LAZY_COMPONENT,
} from '@src/common/constants';
import { ModuleRegistry } from 'react-module-container';
import { CrmAutomationsTemplateData } from '@src/common/templates';
import { ActionTargetType, CTA, TemplateCommonProps, ViewType } from '@src/common/types';
import { PageComponentId } from '@wix/business-manager-api';
import { BasicTemplateImage } from '../basic-template/sub-components/image';

export interface CrmAutomationsTemplateProps extends TemplateCommonProps {}

export const CrmAutomationsTemplate: React.FC<CrmAutomationsTemplateProps> = ({
  dataHook,
  suggestion,
  index,
  viewType,
  onMainCTAClick,
}) => {
  const [_error, setError] = useState(false);
  const [hasSingleRecommendation, setHasSingleRecommendation] = useState(false);
  const [validatingRecipes, setValidatingRecipes] = useState(true);
  const { illustrationUrl, dealerRecipes, actionTarget } =
    suggestion.data as CrmAutomationsTemplateData;

  const throwAsyncError = useCallback(
    (error: Error) =>
      setError(() => {
        throw error;
      }),
    [setError],
  );

  useEffect(() => {
    const checkAvailableRecipes = async () => {
      try {
        const availableRecipesCount = await ModuleRegistry.invoke(
          AUTOMATIONS_DASHBOARD_AVAILABLE_RECIPES_COUNT,
        );
        if (!availableRecipesCount) {
          throwAsyncError(new NoAvailableAutomations());
        }

        if (availableRecipesCount === 1) {
          setHasSingleRecommendation(true);
        }
        setValidatingRecipes(false);
      } catch (e) {
        throwAsyncError(new AvailableRecipesAutomationsFailed(e));
      }
    };

    checkAvailableRecipes();
  }, [throwAsyncError]);

  const [loadingWidget, setLoadingWidget] = useState(true);
  const [loadedRecipes, setLoadedRecipes] = useState<{ name: string }[]>([]);
  const AutomationsRecommendationsWidget = useMemo(() => {
    return ModuleRegistry.component(AUTOMATIONS_RECOMMENDATIONS_LAZY_COMPONENT);
  }, []);

  const isLoading = loadingWidget || validatingRecipes;
  const mainCTA = (recipeName?: string): CTA => {
    const shouldUseFirstRecipe = hasSingleRecommendation && !isLoading && loadedRecipes.length > 0;
    const relevantRecipe = shouldUseFirstRecipe ? loadedRecipes[0].name : recipeName;
    if (relevantRecipe) {
      return {
        type: ActionTargetType.bizMgrNavigation,
        titleKey: 'suggestion.widget.use.automations.single.post.cta',
        params: {
          pageComponentId: PageComponentId.Triggers,
          contextData: {
            appState: `?recipe=${relevantRecipe}`,
          },
        },
      };
    }
    return actionTarget;
  };

  const getWidgetOrigin = useCallback(
    () => (viewType === ViewType.PAGE ? 'suggestion-page' : 'suggestion-section-dashboard'),
    [viewType],
  );
  const reportAutomationsExploreMoreBI = useCallback(() => {
    ModuleRegistry.invoke(AUTOMATIONS_DASHBOARD_EXPLORE_MORE_BI, {
      referralInfo: 'dashboard-suggestions',
      displayedRecipesCount: loadedRecipes.length,
      origin: getWidgetOrigin(),
      realEstateId: 'none',
    });
  }, [getWidgetOrigin, loadedRecipes]);
  const shouldRenderAsSingleRecommendation = hasSingleRecommendation && !isLoading;
  const onCTAClick = (recipeName?: string) => {
    if (!shouldRenderAsSingleRecommendation) {
      reportAutomationsExploreMoreBI();
    }
    onMainCTAClick({ cta: mainCTA(recipeName) });
  };

  return (
    <CrmAutomationsTemplateComponent
      dataHook={dataHook}
      isLoading={loadingWidget || validatingRecipes}
      basicLayout={shouldRenderAsSingleRecommendation}
      automationsWidget={
        <AutomationsRecommendationsWidget
          onLoaded={(recipes = []) => {
            setLoadedRecipes(recipes);
            setLoadingWidget(false);
          }}
          onRecipeClick={(recipe: { name: string }) => onCTAClick(recipe.name)}
          origin={getWidgetOrigin()}
          preferredRecipes={dealerRecipes}
          isBmDashboard
        />
      }
      index={index}
      image={
        <BasicTemplateImage
          hasShadow={false}
          marginRight="10px"
          width="60px"
          height="60px"
          viewType={viewType}
          thumbnailUrl={illustrationUrl}
        />
      }
      suggestion={suggestion}
      viewType={viewType}
      onMainCTAClick={onCTAClick}
    />
  );
};

class NoAvailableAutomations extends Error {
  constructor() {
    super('no available automations recipes');
    this.name = 'NoAvailableAutomations';
  }
}

class AvailableRecipesAutomationsFailed extends Error {
  constructor(error: string) {
    super(`couldnt get available automations recipes. ${error}`);
    this.name = 'AvailableRecipesFailedAutomations';
  }
}
