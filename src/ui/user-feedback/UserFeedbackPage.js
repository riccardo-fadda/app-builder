import React, { useState } from 'react';
import PropTypes from 'prop-types';
import withPermissions from 'ui/auth/withPermissions';
import InternalPage from 'ui/internal-page/InternalPage';
import { ADMINISTRATION_AREA_PERMISSION } from 'state/permissions/const';

export const UserFeedbackPageBody = ({ userPermissions }) => {
  console.log({ userPermissions });

  const [commentsEnabled, setCommentsEnabled] = useState(false);
  const toggleComments = () => setCommentsEnabled(!commentsEnabled);

  return (
    <InternalPage className="DashboardPage">
      <button onClick={toggleComments}> Toggle Comments</button>
      <div>Comments are <b>{commentsEnabled ? 'enabled' : 'disabled'}</b></div>
      <iframe
        title="preview"
        id="previewFrame"
        src="http://localhost:8080/entando-de-app/preview/en/my_homepage"
        width="100%"
        height="800px"
        onError={e => console.warn('*************', e)}
      />
    </InternalPage>
  );
};

UserFeedbackPageBody.propTypes = {
  userPermissions: PropTypes.arrayOf(PropTypes.string),
};

UserFeedbackPageBody.defaultProps = {
  userPermissions: [],
};

export default withPermissions(ADMINISTRATION_AREA_PERMISSION)(UserFeedbackPageBody);
