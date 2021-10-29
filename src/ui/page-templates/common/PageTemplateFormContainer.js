import { connect } from 'react-redux';
import { initialize, submit } from 'redux-form';
import { clearErrors } from '@entando/messages';
import { withRouter } from 'react-router-dom';
import { routeConverter } from '@entando/utils';

import { getSelectedPageTemplate, getPageTemplateFormCellMap, getPageTemplateFormErrors } from 'state/page-templates/selectors';
import { initPageTemplateForm, updatePageTemplate, createPageTemplate, setSelectedPageTemplate } from 'state/page-templates/actions';
import { FORM_MODE_CLONE, FORM_MODE_EDIT } from 'state/page-templates/const';
import { setVisibleModal } from 'state/modal/actions';
import { ConfirmCancelModalID } from 'ui/common/cancel-modal/ConfirmCancelModal';
import { ROUTE_PAGE_TEMPLATE_LIST } from 'app-init/router';

import PageTemplateForm from 'ui/page-templates/common/PageTemplateForm';

const defaultFormValues = {
  code: '',
  descr: '',
  configuration: '{\n  "frames": []\n}',
};

export const mapStateToProps = state => ({
  initialValues: getSelectedPageTemplate(state) || defaultFormValues,
  previewCellMap: getPageTemplateFormCellMap(state),
  previewErrors: getPageTemplateFormErrors(state),
});

export const mapDispatchToProps = (dispatch, { mode, match: { params }, history }) => ({
  onSubmit: (data, saveType) => {
    const jsonData = {
      ...data,
      configuration: data.configuration ? JSON.parse(data.configuration) : {},
    };

    if (mode === FORM_MODE_EDIT) {
      return dispatch(updatePageTemplate(jsonData, saveType));
    }
    return dispatch(createPageTemplate(jsonData, saveType));
  },
  onWillMount: () => {
    dispatch(clearErrors());
    if ([FORM_MODE_EDIT, FORM_MODE_CLONE].includes(mode)) {
      dispatch(initPageTemplateForm(params.pageTemplateCode, mode));
    } else {
      dispatch(setSelectedPageTemplate(defaultFormValues));
    }
  },
  onSave: () => { dispatch(setVisibleModal('')); dispatch(submit('pageTemplate')); },
  onCancel: () => dispatch(setVisibleModal(ConfirmCancelModalID)),
  onDiscard: () => { dispatch(setVisibleModal('')); history.push(routeConverter(ROUTE_PAGE_TEMPLATE_LIST)); },
});


export default withRouter(connect(mapStateToProps, mapDispatchToProps, null, {
  pure: false,
})(PageTemplateForm));
