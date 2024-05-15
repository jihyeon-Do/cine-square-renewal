import React, { Dispatch, SetStateAction } from 'react';
import './confirmModal.scss';

interface Confirm {
  confirm: string;
  setConfirm: Dispatch<SetStateAction<string>>;
  deleteComment: any;
  deleteReply: any;
}

function ConfirmModal({
  confirm,
  setConfirm,
  deleteComment,
  deleteReply,
}: Confirm) {
  return (
    <div className={`comfirm-modal ${confirm !== 'false' ? 'active' : ''}`}>
      <div className="blur"></div>
      <div className="confirm">
        <p>해당 {confirm}을 삭제하시겠습니까?</p>
        <div>
          <button onClick={() => setConfirm('false')}>취소</button>
          <button
            onClick={() =>
              confirm === '댓글'
                ? deleteReply()
                : confirm === '코멘트'
                  ? deleteComment()
                  : () => {
                      return;
                    }
            }
          >
            확인
          </button>
        </div>
      </div>
    </div>
  );
}
export default ConfirmModal;
