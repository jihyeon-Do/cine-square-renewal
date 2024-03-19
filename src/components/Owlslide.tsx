import React, { useCallback, useState } from 'react';
import OwlCarousel from 'react-owl-carousel';
import './owlslide.scss';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';

const images = [
  {
    id: 1,
    title: '이승윤 콘서트 도킹 : 리프트오프',
    src: '../images/main-slide-img1.jpeg',
  },
  {
    id: 2,
    title: '[위드키즈]래빗스쿨 2: 부활절 대소동',
    src: '../images/main-slide-img2.jpeg',
  },
  {
    id: 3,
    title: '[위드키즈]브레드이발소: 셀럽 인 베이커리타운',
    src: '../images/main-slide-img3.jpeg',
  },
  {
    id: 4,
    title: '비키퍼',
    src: '../images/main-slide-img4.jpeg',
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
