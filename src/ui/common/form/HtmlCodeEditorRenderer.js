import React from 'react';
import PropTypes from 'prop-types';
import { Col } from 'patternfly-react';

import LoadableCodeMirror from 'ui/common/form/LoadableCodeMirror';


const HtmlCodeEditorRenderer = ({
  input, field, name, label, form, meta, help,
}) => {
  const isField = field !== null;
  const inputProps = isField ? field : input;
  const { touched, error } = isField
    ? { touched: form.touched[field.name], error: form.errors[field.name] }
    : meta;
  return (
    <div className={(touched && error) ? 'form-group has-error' : 'form-group'}>
      <label htmlFor={name} className="col-xs-2 control-label">
        {label} {help}
      </label>
      <Col xs={10}>
        <LoadableCodeMirror
          value={inputProps.value}
          autoCursor={false}
          onChange={(editor, data, value) => inputProps.onChange(value)}
          onBlur={instance => inputProps.onBlur(instance.doc.getValue())}
          onFocus={instance => inputProps.onFocus && inputProps.onFocus(instance.doc.getValue())}
          options={{
            lineNumbers: true,
            mode: 'htmlembedded',
            styleActiveLine: true,
          }}
        />
        {touched && error && <div className="help-block">{error}</div>}
      </Col>
    </div>
  );
};

const InputPropType = PropTypes.shape({
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  onFocus: PropTypes.func,
  value: PropTypes.string,
});

HtmlCodeEditorRenderer.propTypes = {
  name: PropTypes.string,
  label: PropTypes.node,
  meta: PropTypes.shape({}),
  form: PropTypes.shape({
    touched: PropTypes.shape({}),
    errors: PropTypes.shape({}),
  }),
  help: PropTypes.node,
  input: InputPropType,
  field: InputPropType,
};

HtmlCodeEditorRenderer.defaultProps = {
  input: {},
  field: null,
  form: {},
  name: '',
  label: '',
  meta: {},
  help: null,
};
export default HtmlCodeEditorRenderer;
