import React from 'react';
import { UilTrashAlt } from '@iconscout/react-unicons';
import './../styles/dialogStyle.scss';

const DialogBox = ({
  dialogMessage,
  onProceedClickFn,
  onCancelClickFn,
  args,
}) => {
  return (
    <div className="dialog_box">
      <div style={{ textAlign: 'center' }}>
        <UilTrashAlt size="2em" color="#EA5555" />
      </div>
      <h2 style={{ textAlign: 'center', marginBottom: 0 }}>Are You Sure?</h2>
      <p style={{ marginTop: 0 }}>
        {!dialogMessage ? 'No dialog message set yet' : dialogMessage}
      </p>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          marginBottom: '1em',
          columnGap: '.5em',
        }}
      >
        <button
          className="dialog__btn cancel_btn"
          onClick={() => {
            onCancelClickFn(false);
          }}
        >
          CANCEL
        </button>
        <button
          className="dialog__btn proceed_btn"
          onClick={() => {
            onProceedClickFn(args);
            onCancelClickFn(false);
          }}
        >
          PROCEED
        </button>
      </div>
    </div>
  );
};

export default DialogBox;
