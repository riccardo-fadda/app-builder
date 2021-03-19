/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState } from 'react';
import withPermissions from 'ui/auth/withPermissions';
import InternalPage from 'ui/internal-page/InternalPage';
import { ADMINISTRATION_AREA_PERMISSION } from 'state/permissions/const';

export const UserFeedbackPageBody = () => {
  // console.log({ userPermissions });

  const [commentsEnabled, setCommentsEnabled] = useState(false);
  const toggleComments = () => setCommentsEnabled(!commentsEnabled);

  const handleOverlayClick = (e) => {
    console.log(e.nativeEvent);
  };

  return (
    <InternalPage className="DashboardPage">
      <button onClick={toggleComments}> Toggle Comments</button>
      <div>Comments are <b>{commentsEnabled ? 'enabled' : 'disabled'}</b></div>
      {commentsEnabled && (<div
        style={{
          position: 'absolute',
          zIndex: '1',
          background: 'red',
          opacity: '0.2',
          width: '100%',
          height: '800px',
        }}
        onClick={handleOverlayClick}
      />)}
      <iframe
        title="preview"
        id="previewFrame"
        src="http://localhost:8080/entando-de-app/en/my_homepage.page"
        width="100%"
        height="800px"
        onError={e => console.warn('*************', e)}
      />
    </InternalPage>
  );
};

export default withPermissions(ADMINISTRATION_AREA_PERMISSION)(UserFeedbackPageBody);
