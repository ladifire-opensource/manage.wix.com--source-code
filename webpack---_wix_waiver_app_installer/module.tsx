import React from 'react';
import _ from 'lodash';
import { ModuleInitFn } from '@wix/yoshi-flow-bm';
import {
  appDefIds,
  configModule,
  ExternalPageId,
  ModuleId,
  navigateTo,
} from '@wix/business-manager-api';
import { ReactComponent as HealthWaiverIcon } from './healthWaiver.svg';
import {
  FormFieldContactInfoContactField,
  EmailInfoTag,
  Form,
  FormFieldViewInfoFieldType,
  PhoneInfoTag,
} from '@wix/ambassador-wix-form-builder-web/types';
import { ModuleRegistry } from 'react-module-container';

const appId = '1d9fdfdf-e744-4db1-a62d-b9ef26fd48bc';

export const init: ModuleInitFn = async (flowAPI) => {
  const i18n = await flowAPI.getI18n();

  const template: Form = {
    attributes: {
      app: {
        appId,
        enabled: true,
        labels: ['waiver'],
      },
    },
    viewInfo: {
      title: i18n.t('app.template.initial.title'),
      description: i18n.t('app.template.initial.description'),
      submitButtonInfo: {
        text: i18n.t('app.template.initial.submitButton'),
      },
      successMessage: i18n.t('app.template.initial.successMessage'),
    },
    fields: [
      {
        externalId: 'firstName_1',
        viewInfo: {
          type: 'TEXT' as FormFieldViewInfoFieldType,
          displayProperties: {
            label: i18n.t('app.template.initial.fields.firstName.label'),
            placeholder: i18n.t(
              'app.template.initial.fields.firstName.placeholder',
            ),
          },
          validationProperties: {
            maxLength: 100,
            required: true,
          },
        },
        contactInfo: {
          contactField: 'FIRST_NAME' as FormFieldContactInfoContactField,
        },
      },
      {
        externalId: 'lastName_1',
        viewInfo: {
          type: 'TEXT' as FormFieldViewInfoFieldType,
          displayProperties: {
            label: i18n.t('app.template.initial.fields.lastName.label'),
            placeholder: i18n.t(
              'app.template.initial.fields.lastName.placeholder',
            ),
          },
          validationProperties: {
            maxLength: 100,
            required: true,
          },
        },
        contactInfo: {
          contactField: 'LAST_NAME' as FormFieldContactInfoContactField,
        },
      },
      {
        externalId: 'email_1',
        viewInfo: {
          type: 'EMAIL' as FormFieldViewInfoFieldType,
          displayProperties: {
            label: i18n.t('app.template.initial.fields.email.label'),
            placeholder: i18n.t(
              'app.template.initial.fields.email.placeholder',
            ),
          },
          validationProperties: {
            pattern:
              "[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?\\.)+[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])",
            maxLength: 250,
            required: true,
          },
        },
        contactInfo: {
          contactField: 'EMAIL' as FormFieldContactInfoContactField,
          emailInfo: {
            tag: 'MAIN' as EmailInfoTag,
          },
        },
      },
      {
        externalId: 'phone_1',
        viewInfo: {
          type: 'PHONE' as FormFieldViewInfoFieldType,
          displayProperties: {
            label: i18n.t('app.template.initial.fields.phone.label'),
            placeholder: i18n.t(
              'app.template.initial.fields.phone.placeholder',
            ),
          },
          validationProperties: {
            maxLength: 50,
            pattern: '^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\\s\\./0-9]*$',
          },
        },
        contactInfo: {
          contactField: 'PHONE' as FormFieldContactInfoContactField,
          phoneInfo: {
            tag: 'MAIN' as PhoneInfoTag,
          },
        },
      },
      {
        externalId: 'radio_1',
        viewInfo: {
          type: 'RADIO_GROUP' as FormFieldViewInfoFieldType,
          displayProperties: {
            label: i18n.t('app.template.initial.fields.radio.label'),
            options: [
              {
                label: i18n.t(
                  'app.template.initial.fields.radio.option1.label',
                ),
                value: i18n.t(
                  'app.template.initial.fields.radio.option1.value',
                ),
              },
              {
                label: i18n.t(
                  'app.template.initial.fields.radio.option2.label',
                ),
                value: i18n.t(
                  'app.template.initial.fields.radio.option2.value',
                ),
              },
            ],
          },
          validationProperties: {
            required: true,
          },
        },
      },
      {
        externalId: 'paragraph_1',
        viewInfo: {
          type: 'PARAGRAPH' as FormFieldViewInfoFieldType,
          displayProperties: {
            label: i18n.t('app.template.initial.fields.paragraph.label'),
            placeholder: i18n.t(
              'app.template.initial.fields.paragraph.placeholder',
            ),
          },
        },
      },
      {
        externalId: 'checkbox_1',
        viewInfo: {
          type: 'CHECKBOX' as FormFieldViewInfoFieldType,
          displayProperties: {
            label: i18n.t('app.template.initial.fields.checkbox.label'),
          },
          validationProperties: {
            required: true,
          },
        },
      },
      {
        externalId: 'signature_1',
        viewInfo: {
          type: 'SIGNATURE' as FormFieldViewInfoFieldType,
          displayProperties: {
            label: i18n.t('app.template.initial.fields.signature.label'),
            clearButton: i18n.t(
              'app.template.initial.fields.signature.clearButton',
            ),
          },
          validationProperties: {
            required: true,
          },
        },
      },
    ],
  };

  const learnMoreUrl = ModuleRegistry.invoke(
    'businessManager.buildModuleLink',
    ExternalPageId.Support,
    {
      article: '/article/adding-a-health-waiver-form',
      locale: flowAPI.moduleParams.accountLanguage,
    },
  );

  const learnMoreBookingsUrl = ModuleRegistry.invoke(
    'businessManager.buildModuleLink',
    ExternalPageId.Support,
    {
      article: '/article/wix-bookings-setting-up-a-waiver#setting-up-a-waiver',
      locale: flowAPI.moduleParams.accountLanguage,
    },
  );

  const groupByFieldType = (schema: Form) =>
    _.groupBy(schema.fields, (field) => field.viewInfo?.type);

  const handleSaveForm = (schema: Form) => {
    let action;

    const fieldByType = groupByFieldType(schema);

    const hasRequiredEmailField = fieldByType.EMAIL?.some(
      (field) => field.viewInfo?.validationProperties?.required,
    );

    if (!hasRequiredEmailField) {
      action = {
        type: 'NOTIFICATION',
        payload: {
          notificationType: 'WARNING',
          content: i18n.t('app.saveForm.requiredEmailWarning'),
        },
      };
    }

    return action ? { valid: false, action } : { valid: true };
  };

  const handleDeleteField = (schema: Form, fieldId: string) => {
    let action;

    const currentField = schema.fields?.find((field) => field.id === fieldId);
    const fieldByType = groupByFieldType(schema);

    if (currentField?.viewInfo?.type !== 'EMAIL') {
      return { valid: true };
    }

    const hasRequiredEmailField = fieldByType.EMAIL?.some(
      (field) =>
        field.viewInfo?.validationProperties?.required && field.id !== fieldId,
    );

    if (!hasRequiredEmailField) {
      action = {
        type: 'SHOW_MODAL',
        payload: {
          title: i18n.t('app.deleteFieldModal.title'),
          content: i18n.t('app.deleteFieldModal.description'),
          primaryCTA: i18n.t('app.deleteFieldModal.okButton'),
          secondaryCTA: i18n.t('app.deleteFieldModal.cancelButton'),
        },
      };
    }

    return action ? { valid: false, action } : { valid: true };
  };

  configModule(flowAPI.moduleInfo.moduleId as ModuleId, ModuleId.WixForms, {
    type: 'CONFIG_TEMPLATE',
    payload: {
      id: 'healthWaiverForm',
      unique: true,
      template,
      info: {
        name: i18n.t('app.template.name'),
        description: i18n.t('app.template.description'),
        link: {
          href: learnMoreUrl,
          label: i18n.t('app.template.learnLabel'),
        },
        icon: <HealthWaiverIcon />,
      },
      disclaimer: {
        text: i18n.t('app.metadata.disclaimer.description'),
        link: {
          href: learnMoreBookingsUrl,
          label: i18n.t('app.metadata.disclaimer.linkLabel'),
        },
      },
      badge: {
        name: i18n.t('app.metadata.badge.name'),
        tooltip: {
          content: i18n.t('app.metadata.badge.tooltip'),
          link: {
            href: learnMoreUrl,
            label: i18n.t('app.metadata.badge.linkLabel'),
          },
          maxWidth: 258,
        },
      },
      beforeAction: ({
        action,
        schema,
        fieldId,
      }: {
        action: string;
        schema: Form;
        fieldId?: string;
      }) => {
        switch (action) {
          case 'SAVE_FORM':
            return handleSaveForm(schema);
          case 'DELETE_FIELD':
            return handleDeleteField(schema, fieldId as string);
        }

        return { valid: true };
      },
      state: {
        delete: {
          title: i18n.t('app.state.delete.title'),
          description: i18n.t('app.state.delete.description'),
          link: {
            href: learnMoreUrl,
            label: i18n.t('app.state.delete.linkLabel'),
          },
        },
        disabled: {
          tooltip: {
            content: i18n.t('app.state.disabled.tooltip'),
            link: {
              onClick: ({ existingForm }: { existingForm: Form }) =>
                navigateTo({
                  pageComponentId: appDefIds.wixForms,
                  contextData: { appState: `edit/${existingForm.id}` },
                }),
              label: i18n.t('app.state.disabled.linkLabel'),
            },
          },
        },
      },
    },
  });
};
