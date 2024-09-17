import React, { useCallback } from 'react';
import styles from './videoFrame.module.scss';

const autoPalyUrl = '?rel=0;amp;autoplay=1';

interface VideoFrameContainerProps {
  hide: () => void;
  id: number;
}

function MainVideoPotal({ hide, id }: VideoFrameContainerProps) {
  const videos = [
    {
      id: 1,
      title: '우리가 끝이야',
      src: `https://www.youtube.com/embed/KuLthg1eCIg?si=M3GuSVOtIbN9iJ_x${autoPalyUrl}`,
    },
    {
      id: 2,
      title: '테인티드 러브',
      src: `https://www.youtube.com/embed/Kzrue9nAVwU?si=Ofi8b6tGAmOZLYaj${autoPalyUrl}`,
    },
    {
      id: 3,
      title: '트랜스포머 ONE',
      src: `https://www.youtube.com/embed/wKiwHP3s5hI?si=1Hvp15i3kP8R_pBn${autoPalyUrl}`,
    },
    {
      id: 4,
      title: '오지: 사라진 숲을 찾아서',
      src: `https://www.youtube.com/embed/--qKYen3N7o?si=K_mkCW0mL6W65jtp${autoPalyUrl}`,
    },
  ];

  const index = id;

  const [matchMovie] = videos.filter((video) => video.id === index);
  const close = useCallback(() => {
    hide();
  }, []);
  return (
    <div className={styles['video-background']} onClick={close}>
      <div className="iframe-wrapper">
        <iframe
          title={matchMovie.title}
          src={matchMovie.src}
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
        >
          <button className={styles['close-btn']}>
            <div className={styles['btn-1']}></div>
            <div className={styles['btn']}></div>
          </button>
        </iframe>
      </div>
    </div>
  );
}

export default MainVideoPotal;
