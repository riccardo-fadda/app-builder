import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Field, FieldArray, reduxForm } from 'redux-form';
import { Row, Col, FormGroup } from 'patternfly-react';
import { Button } from 'react-bootstrap';
import { formattedText, required } from '@entando/utils';
import { FormattedMessage } from 'react-intl';

import RenderTextInput from 'ui/common/form/RenderTextInput';
import FormLabel from 'ui/common/form/FormLabel';
import FormSectionTitle from 'ui/common/form/FormSectionTitle';
import MultiSelectRenderer from 'ui/pages/common/MultiSelectRenderer';
import PageTreeSelectorContainer from 'ui/pages/common/PageTreeSelectorContainer';
import SwitchRenderer from 'ui/common/form/SwitchRenderer';
import RenderSelectInput from 'ui/common/form/RenderSelectInput';
import { ACTION_SAVE, ACTION_SAVE_AND_CONFIGURE } from 'state/pages/const';

export class PageFormBody extends Component {
  componentWillMount() {
    if (this.props.onWillMount) {
      this.props.onWillMount(this.props);
    }
  }

  render() {
    const {
      handleSubmit, invalid, submitting, selectedJoinGroups, groups, pageModels,
      contentTypes, charsets, mode, onChangeEnTitle, parentCode, parentTitle,
    } = this.props;

    const isEditMode = mode === 'edit';
    const isCloneMode = mode === 'clone';

    const pageModelsWithEmpty =
      [{ code: '', descr: formattedText('app.chooseAnOption') }].concat(pageModels);

    const groupsWithEmpty =
      [{ code: '', name: formattedText('app.chooseAnOption') }].concat(groups);

    const parentPageComponent = parentCode ?
      <span>{parentTitle}</span> :
      (<Field
        component={PageTreeSelectorContainer}
        name="parentCode"
        validate={[required]}
      />);

    const renderFullForm = () => {
      if (isCloneMode) {
        return null;
      }

      return (
        <div>
          <Row>
            <Col xs={12}>
              <FormSectionTitle titleId="pages.pageForm.pageGroups" />
            </Col>
          </Row>
          <Row>
            <Col xs={12}>
              <Field
                component={RenderSelectInput}
                name="ownerGroup"
                className="form-control"
                validate={[required]}
                disabled={isEditMode}
                label={<FormLabel labelId="pages.pageForm.ownerGroup" required />}
                options={groupsWithEmpty}
                optionValue="code"
                optionDisplayName="name"
              />
              <FormGroup>
                <label htmlFor="ownerGroup" className="col-xs-2 control-label">
                  <FormLabel labelId="pages.pageForm.joinGroup" required />
                </label>
                <Col xs={10}>
                  <FieldArray
                    component={MultiSelectRenderer}
                    name="joinGroups"
                    options={groups}
                    selectedValues={selectedJoinGroups}
                    labelKey="name"
                    valueKey="code"
                    emptyOptionTextId="app.chooseAnOption"
                  />
                </Col>
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col xs={12}>
              <FormSectionTitle titleId="pages.pageForm.settings" />
            </Col>
          </Row>
          <Row>
            <Col xs={12}>
              <Field
                component={RenderSelectInput}
                name="pageModel"
                className="form-control"
                validate={[required]}
                label={
                  <FormLabel
                    labelId="pages.pageForm.pageModel"
                    helpId="pages.pageForm.pageModelHelp"
                    required
                  />
                }
                options={pageModelsWithEmpty}
                optionValue="code"
                optionDisplayName="descr"
              />
              <FormGroup>
                <label htmlFor="displayedInMenu" className="col-xs-2 control-label">
                  <FormLabel
                    labelId="pages.pageForm.displayedInMenu"
                    helpId="pages.pageForm.displayedInMenuHelp"
                  />
                </label>
                <Col xs={4}>
                  <Field
                    component={SwitchRenderer}
                    name="displayedInMenu"
                  />
                </Col>
                <label htmlFor="seo" className="col-xs-2 control-label">
                  <FormLabel
                    labelId="pages.pageForm.seo"
                    helpId="pages.pageForm.seoHelp"
                  />
                </label>
                <Col xs={4}>
                  <Field
                    component={SwitchRenderer}
                    name="seo"
                  />
                </Col>
              </FormGroup>
              <FormGroup>
                <label htmlFor="charset" className="col-xs-2 control-label">
                  <FormLabel
                    labelId="pages.pageForm.charset"
                    helpId="pages.pageForm.charsetHelp"
                  />
                </label>
                <Col xs={2}>
                  <Field
                    component="select"
                    name="charset"
                    className="PageForm__charsets-select form-control"
                    size="3"
                    validate={[required]}
                  >
                    {charsets.map(type => (
                      <option
                        key={type}
                        className="PageForm__bullet-option"
                        value={type}
                      >
                        {type}
                      </option>
                  ))}
                  </Field>
                </Col>
                <label htmlFor="seo" className="col-xs-2 col-xs-offset-2 control-label">
                  <FormLabel
                    labelId="pages.pageForm.mimeType"
                    helpId="pages.pageForm.mimeTypeHelp"
                  />
                </label>
                <Col xs={2}>
                  <Field
                    component="select"
                    name="contentType"
                    className="PageForm__content-types-select form-control"
                    size="5"
                    validate={[required]}
                  >
                    {contentTypes.map(type => (
                      <option
                        key={type}
                        className="PageForm__bullet-option"
                        value={type}
                      >
                        {type}
                      </option>
                  ))}
                  </Field>
                </Col>
              </FormGroup>
            </Col>
          </Row>
        </div>
      );
    };

    return (
      <form className="PageForm form-horizontal">
        <Row>
          <Col xs={12}>
            <FormSectionTitle titleId="pages.pageForm.info" />
          </Col>
        </Row>
        <Row>
          <Col xs={12}>
            <FormGroup>
              <label htmlFor="parentCode" className="col-xs-2 control-label">
                <FormLabel labelId="pages.pageForm.pagePlacement" required />
              </label>
              <Col xs={10}>
                { parentPageComponent }
              </Col>
            </FormGroup>
            <Field
              component={RenderTextInput}
              name="titles.en"
              label={<FormLabel labelId="app.title" langLabelId="app.en" required />}
              placeholder={formattedText('app.enTitle')}
              validate={[required]}
              onChange={(ev) => { if (onChangeEnTitle) onChangeEnTitle(ev.currentTarget.value); }}
            />
            <Field
              component={RenderTextInput}
              name="titles.it"
              label={<FormLabel labelId="app.title" langLabelId="app.it" required />}
              placeholder={formattedText('app.itTitle')}
              validate={[required]}
            />
            <Field
              component={RenderTextInput}
              name="code"
              label={<FormLabel labelId="app.code" helpId="pages.pageForm.codeHelp" required />}
              placeholder={formattedText('app.code')}
              validate={[required]}
              disabled={isEditMode}
            />

          </Col>
        </Row>

        {renderFullForm()}

        <Row>
          <Col xs={12}>
            <div className="btn-toolbar pull-right">

              <Button
                className="PageForm__save-and-configure-btn"
                type="submit"
                bsStyle="success"
                disabled={invalid || submitting}
                onClick={handleSubmit(values =>
                  this.props.onSubmit(values, ACTION_SAVE_AND_CONFIGURE))}
              >
                <FormattedMessage id="pages.pageForm.saveAndConfigure" />

              </Button>
              <Button
                className="PageForm__save-btn"
                type="submit"
                bsStyle="primary"
                disabled={invalid || submitting}
                onClick={handleSubmit(values =>
                  this.props.onSubmit(values, ACTION_SAVE))}
              >
                <FormattedMessage id="app.save" />

              </Button>
            </div>
          </Col>
        </Row>
      </form>
    );
  }
}

PageFormBody.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  invalid: PropTypes.bool,
  submitting: PropTypes.bool,
  selectedJoinGroups: PropTypes.arrayOf(PropTypes.string).isRequired,
  charsets: PropTypes.arrayOf(PropTypes.string).isRequired,
  contentTypes: PropTypes.arrayOf(PropTypes.string).isRequired,
  groups: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  })).isRequired,
  pageModels: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.string.isRequired,
    descr: PropTypes.string.isRequired,
  })).isRequired,
  mode: PropTypes.string,
  onWillMount: PropTypes.func,
  onChangeEnTitle: PropTypes.func,
  parentCode: PropTypes.string,
  parentTitle: PropTypes.string,
};

PageFormBody.defaultProps = {
  invalid: false,
  submitting: false,
  mode: 'add',
  onWillMount: null,
  onChangeEnTitle: null,
  parentCode: null,
  parentTitle: null,
};

const PageForm = reduxForm({
  form: 'page',
})(PageFormBody);

export default PageForm;
