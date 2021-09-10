import { appDefIds, getCurrentInstance } from '@wix/business-manager-api';
import { ShoutoutEditor, Template } from '@wix/ambassador-shoutout-editor/http';
import { resolveTemplateLists } from './vertical-template-lists';
import { EmailTemplate } from './interfaces';

export const EMAIL_MARKETING_BASE_URL = '/_api/shoutout';
const templateService = ShoutoutEditor(EMAIL_MARKETING_BASE_URL, {
  ignoredProtoHttpUrlPart: '/api',
}).TemplateService();

export const getEmailTemplates = async () => {
  const verticalLists = resolveTemplateLists();
  const responses = await Promise.all(
    verticalLists.map((list) =>
      templateService({
        Authorization: getCurrentInstance(appDefIds.promoteHome),
      }).list({
        templateListId: list.recommended,
        paging: {
          limit: 50,
        },
      }),
    ),
  );

  let templatesLists = responses.map((response) => response.templates);
  templatesLists = filterOutDynamicTemplates(templatesLists);
  templatesLists = filterOutTemplatesWithMissingAssets(templatesLists);
  templatesLists = processQATag(templatesLists);
  templatesLists = processSpecialIntentTemplates(templatesLists);

  return formatOutput(templatesLists);
};

const processQATag = (currentTemplateLists: Template[][]) => {
  return currentTemplateLists.map(filterQATag);
};

const processSpecialIntentTemplates = (currentTemplateLists: Template[][]) =>
  currentTemplateLists.map(filterSpecialIntentTemplates);

const filterOutDynamicTemplates = (currentTemplateLists: Template[][]) =>
  currentTemplateLists.map((templateList) =>
    templateList.filter((template) => !template.isDynamic),
  );

const filterOutTemplatesWithMissingAssets = (
  currentTemplateLists: Template[][],
) => currentTemplateLists.map(verifyAssets);

function formatOutput(currentTemplateLists: Template[][]): EmailTemplate[] {
  const mergedLists = currentTemplateLists.reduce((acc, current) => {
    return [...acc, ...current];
  }, []);

  return mergedLists
    .filter(
      (template, index, templatesList) =>
        index ===
        templatesList.findIndex(
          (currentTemplate) =>
            currentTemplate.campaignId === template.campaignId,
        ),
    )
    .map((template) => {
      const thumbnail = template.thumbnails.find(
        (thumb) => thumb.role === 'thumbnailLarge',
      );
      return {
        templateId: template.campaignId,
        background: thumbnail!.url,
        templateName: template.title!,
      };
    });
}

function filterQATag(currentTemplateList: Template[]) {
  const isQATagEnabled = false; // TBD: once experiments are added into project, check experiments['specs.so.ui.QATemplates']
  const filterFunction = isQATagEnabled ? passAll : doesntHaveQATag;
  return currentTemplateList.filter(filterFunction);
}

function passAll() {
  return true;
}

function doesntHaveQATag(template: Template) {
  return !template.tags || !template.tags.includes('QA');
}

function filterSpecialIntentTemplates(currentTemplateList: Template[]) {
  const isSpecialIntentTemplateShown = false; // TBD: once experiments are added into project, check experiments['specs.so.ui.EventABTemplate']
  return currentTemplateList.filter((template) => {
    if (
      (template.tags || [])
        .map((tag) => tag.toLowerCase())
        .includes('EventABTemplate'.toLowerCase()) &&
      !isSpecialIntentTemplateShown
    ) {
      return false;
    }

    return true;
  });
}

function verifyAssets(currentTemplateLists: Template[]) {
  return currentTemplateLists.filter(removeTemplatesWithoutAssets);
}

function removeTemplatesWithoutAssets(template: Template) {
  return (
    template.thumbnails.length &&
    template.thumbnails.some((thumbnail) => thumbnail.role === 'thumbnailLarge')
  );
}
