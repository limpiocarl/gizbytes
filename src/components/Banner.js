import Carousel from "react-bootstrap/Carousel";
import image1 from "../bannerphotos/banner1.jpg";
import image2 from "../bannerphotos/banner2.jpg";
import image3 from "../bannerphotos/banner3.jpg";
import "../App.css";

export default function Banner() {
  return (
    <div className="w-100">
      <Carousel controls={false} id="carousel-banner">
        <Carousel.Item interval={1500}>
          <img
            className="d-block w-100"
            height={950}
            src={image1}
            alt="One"
            id="img1"
          />
          <Carousel.Caption className="text-center">
            <h1 id="caption-carousel">Label for first slide</h1>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item interval={1500}>
          <img
            className="d-block w-100"
            height={950}
            src={image2}
            alt="Two"
            id="img2"
          />
          <Carousel.Caption className="text-center">
            <h1 id="caption-carousel">Label for second slide</h1>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item interval={1500}>
          <img
            className="d-block w-100"
            height={950}
            src={image3}
            alt="Two"
            id="img3"
          />
          <Carousel.Caption className="text-center">
            <h1 id="caption-carousel">Label for third slide</h1>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </div>
  );
}
