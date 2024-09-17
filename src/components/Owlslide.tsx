import React, { useCallback, useState } from 'react';
import OwlCarousel from 'react-owl-carousel';
import './owlslide.scss';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';

const images = [
  {
    id: 1,
    title: '우리가 끝이야',
    src: '../images/main-slide-img01.webp',
  },
  {
    id: 2,
    title: '테인티드 러브',
    src: '../images/main-slide-img02.webp',
  },
  {
    id: 3,
    title: '트랜스포머 ONE',
    src: '../images/main-slide-img03.webp',
  },
  {
    id: 4,
    title: '오지: 사라진 숲을 찾아서',
    src: '../images/main-slide-img04.webp',
  },
];

interface showProps {
  show: (id: number) => void;
  modalId: number;
}

function Owlslide({ show, modalId }: showProps) {
  const [slidePageNumber, setSlidePageNumber] = useState(0);
  const open = useCallback((id: number) => {
    show(+id);
  }, []);

  return (
    <div className="slide">
      <OwlCarousel
        className="owl-theme"
        items={1}
        loop
        nav
        autoplay
        autoplayTimeout={4000}
        autoplaySpeed={700}
        dots={false}
        startPosition={slidePageNumber}
      >
        {images.map((images) => (
          <div
            className="images"
            onClick={() => {
              setSlidePageNumber(images.id - 1);
              open(images.id);
            }}
            key={images.id}
          >
            <img src={images.src} alt={images.title} />

            <div className="play-btn">
              <img src="../images/play.png" alt="play-button" />
            </div>
          </div>
        ))}
      </OwlCarousel>
    </div>
  );
}

export default Owlslide;
