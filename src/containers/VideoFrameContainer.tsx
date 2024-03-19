import React from 'react';
import ReactDOM from 'react-dom';
import VideoFrame from '../components/VideoFrame';

interface VideoFrameContainerProps {
  hide: () => void;
  id: number;
}

function VideoFrameContainer({ hide, id }: VideoFrameContainerProps) {
  const portalContainer = document.querySelector('#mainVideoPortal');
  if (!portalContainer) {
    console.error('Error: Portal container not found');
    return null; // 또는 오류 처리 로직을 추가할 수 있습니다.
  }

  return ReactDOM.createPortal(
    <VideoFrame hide={hide} id={id} />,
    portalContainer,
  );
}

export default VideoFrameContainer;
