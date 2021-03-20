/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useEffect, useState } from 'react';
import withPermissions from 'ui/auth/withPermissions';
import InternalPage from 'ui/internal-page/InternalPage';
import { ADMINISTRATION_AREA_PERMISSION } from 'state/permissions/const';
import unique from 'unique-selector';

export const UserFeedbackPageBody = () => {
  // console.log({ userPermissions });

  const [commentsEnabled, setCommentsEnabled] = useState(false);
  const toggleComments = () => setCommentsEnabled(!commentsEnabled);

  const [comments, setComments] = useState([]);
  const addComment = comment => setComments([...comments, comment]);

  const handleOverlayClick = (e) => {
    console.log(e.nativeEvent);
  };

  const handleTestAreaClick = (e) => {
    console.log(e.nativeEvent);
    const text = prompt('Comment');
    const x = e.nativeEvent.clientX - 5;
    const y = e.nativeEvent.clientY - 15;
    const el = document.elementFromPoint(x, y);
    addComment({
      x,
      y,
      selector: unique(el),
      text,
    });
  };

  return (
    <InternalPage className="DashboardPage">
      <button onClick={toggleComments}> Toggle Comments</button>
      <div id="testArea" onClick={handleTestAreaClick}>
        {comments.map(comment => (
          <div
            style={{
              position: 'absolute',
              top: `${comment.y}px`,
              left: `${comment.x}px`,
            }}
            className="Marker"
          >
            {comment.text}
          </div>
        ))}
        <div style={{
          backgroundColor: 'yellow',
          height: '100px',
          width: '100px',
        }}
        />
        <div style={{
          backgroundColor: 'orange',
          height: '100px',
          width: '100px',
        }}
        />
        <div style={{
          backgroundColor: 'red',
          height: '100px',
          width: '100px',
        }}
        />
      </div>

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
