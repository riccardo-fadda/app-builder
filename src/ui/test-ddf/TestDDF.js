import React from 'react';
import FormRenderer from '@data-driven-forms/react-form-renderer/form-renderer';
import componentTypes from '@data-driven-forms/react-form-renderer/component-types';
import validatorTypes from '@data-driven-forms/react-form-renderer/validator-types';
import componentMapper from '@data-driven-forms/carbon-component-mapper/component-mapper';
import FormTemplate from '@data-driven-forms/carbon-component-mapper/form-template';

import { TYPE_BOOLEAN, TYPE_CHECKBOX, TYPE_DATE, TYPE_ENUMERATOR, TYPE_LONGTEXT, TYPE_TEXT } from 'state/data-types/const';

const wdfJSON = {
  code: 'NWS',
  name: 'News',
  status: '0',
  attributes: [
    {
      code: 'first_name',
      type: 'Text',
      name: null,
      names: {
        en: 'First Name',
      },
      mandatory: true,
      validationRules: {
        minLength: 5,
      },
    },
    {
      code: 'last_name',
      type: 'Text',
      name: null,
      names: {
        en: 'Last Name',
      },
      mandatory: true,
    },
    {
      code: 'about',
      type: 'Longtext',
      name: 'About Self',
      names: {
        en: 'About Self',
      },
      mandatory: false,
      validationRules: {
        maxLength: 20,
      },
    },
    {
      code: 'birthdate',
      type: 'Date',
      name: 'Birthdate',
      names: {
        en: 'Birthdate',
      },
      mandatory: true,
      validationRules: {
        rangeEndDate: '2021-03-20 00:00:00',
      },
    },
    {
      code: 'email',
      type: 'Text',
      name: 'Email',
      names: {
        en: 'Email',
      },
      mandatory: true,
      validationRules: {
        regex: '[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,}$',
      },
    },
    {
      code: 'single',
      name: 'Single',
      type: 'Boolean',
      mandatory: true,
    },
    {
      code: 'country',
      name: 'Country',
      type: 'Enumerator',
      mandatory: true,
      enumeratorStaticItems: ['USA', 'Philippines', 'Italy', 'Brazil'],
    },
  ],
};

const wdfDDFComponentMap = {
  [TYPE_TEXT]: componentTypes.TEXT_FIELD,
  [TYPE_CHECKBOX]: componentTypes.CHECKBOX,
  [TYPE_DATE]: componentTypes.DATE_PICKER,
  [TYPE_BOOLEAN]: componentTypes.SWITCH,
  [TYPE_LONGTEXT]: componentTypes.TEXTAREA,
  [TYPE_ENUMERATOR]: componentTypes.SELECT,
};

const customValidatorMapper = {
  customRangeEndDate: ({ threshold }) => value => (new Date(threshold) < (value && value[0]) ? `Date should be equal to or before ${threshold}` : undefined),
};

const wdfDDFValidationMap = {
  regex: {
    type: validatorTypes.PATTERN,
    createMessage: pattern => `Value should match this pattern: ${pattern}`,
    ddfRuleValueKey: 'pattern',
  },
  minLength: {
    type: validatorTypes.MIN_LENGTH,
    createMessage: threshold => `Length should be more than or equal to ${threshold}`,
    ddfRuleValueKey: 'threshold',
  },
  maxLength: {
    type: validatorTypes.MAX_LENGTH,
    createMessage: threshold => `Length should be less than or equal to ${threshold}`,
    ddfRuleValueKey: 'threshold',
  },
  rangeEndDate: {
    type: 'customRangeEndDate',
    ddfRuleValueKey: 'threshold',
    custom: true,
  },
};

const wdfToDDFValidation = (rule, value) => {
  const {
    type, createMessage, ddfRuleValueKey, custom,
  } = wdfDDFValidationMap[rule];

  return ({
    type,
    [ddfRuleValueKey]: value,
    ...(custom ? {} : { message: createMessage(value) }),
  });
};

const wdfToDDF = ({ attributes }) => {
  const fields = attributes.map(({
    type, code, name, names,
    mandatory, validationRules = {},
    enumeratorStaticItems,
  }) => ({
    label: name || names.en,
    name: code,
    component: wdfDDFComponentMap[type],
    isRequired: mandatory,
    validate: Object.keys(validationRules)
      .filter(rule => rule)
      .map(rule => wdfToDDFValidation(rule, validationRules[rule]))
      .concat(mandatory ? { type: validatorTypes.REQUIRED } : []),
    ...(enumeratorStaticItems ?
      { options: enumeratorStaticItems.map(item => ({ label: item, value: item })) } : {}),
  }));

  return { fields };
};

const ddfToWDFMessage = (formCode, values) => ({
  typeCode: formCode,
  attributes: Object.keys(values).map(field => ({
    code: field,
    value: values[field],
  })),
});

const handleSubmit = (values) => {
  console.log(ddfToWDFMessage(wdfJSON.code, values));
};

const schema = wdfToDDF(wdfJSON);

const TestDDF = () => (
  <FormRenderer
    schema={schema}
    componentMapper={componentMapper}
    FormTemplate={FormTemplate}
    onSubmit={handleSubmit}
    validatorMapper={customValidatorMapper}
  />
);

export default TestDDF;
