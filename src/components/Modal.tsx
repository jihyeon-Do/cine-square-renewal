import React, { useRef, Dispatch, SetStateAction } from 'react';

interface ModalProps {
  modal: string;
  setModal: Dispatch<SetStateAction<string>>;
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
  handleAddReply: any;
  addReply: any;
  handleEditModalValue: any;
}

function Modal({
  modal,
  setModal,
  value,
  setValue,
  handleAddReply,
  addReply,
  handleEditModalValue,
}: ModalProps) {
  const formtag = useRef(null);

  return (
    <div className={`edit-modal ${modal !== 'false' ? 'active' : ''}`}>
      <div
        className="blur"
        onClick={() => {
          setModal('false');
        }}
      ></div>
      <div className="content-value">
        <form action="/detail" ref={formtag} className="write">
          <fieldset>
            <legend>{modal}</legend>
            <textarea
              // type="text"
              value={value}
              placeholder="자유롭게 댓글을 달아주세요!"
              onChange={addReply}
            />
            <button
              type="button"
              onClick={
                modal === '댓글 작성하기'
                  ? handleAddReply
                  : handleEditModalValue
              }
            >
              {modal === '댓글 작성하기' ? '작성하기' : '수정하기'}
            </button>
          </fieldset>
        </form>
        <button
          className="close-modal"
          onClick={() => {
            setModal('false');
          }}
        >
          x
        </button>
      </div>
    </div>
  );
}

export default Modal;
