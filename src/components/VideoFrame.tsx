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
      title: '기적',
      src: `https://www.youtube.com/embed/F-QaVTwt4KY?si=smZPSbc3IRabBZD7${autoPalyUrl}`,
    },
    {
      id: 2,
      title: '듄',
      src: `https://www.youtube.com/embed/r4vMqiPPqdQ?si=yyfaiEu0AIKK8wtE${autoPalyUrl}`,
    },
    {
      id: 3,
      title: '용과 주근깨 공주',
      src: `https://www.youtube.com/embed/YCSaw66rkWc?si=phaSKGMhgzUj9SRc${autoPalyUrl}`,
    },
    {
      id: 4,
      title: '화이트데이',
      src: `https://www.youtube.com/embed/1M9S_awwqw8?si=9xE6O9RXELQ5HmQm"${autoPalyUrl}`,
    },
  ];

  const index = id;

  const [matchMovie] = videos.filter((video) => video.id === index);
  const close = useCallback(() => {
    hide();
  }, []);
  return (
    <div className={styles['video-background']} onClick={close}>
      {
        <iframe
          title={matchMovie.title}
          width="920"
          height="515"
          src={matchMovie.src}
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
        >
          <button className={styles['close-btn']}>
            <div className={styles['btn-1']}></div>
            <div className={styles['btn']}></div>
          </button>
        </iframe>
      }
    </div>
  );
}

export default MainVideoPotal;
