import React from "react";
import { Fragment } from "react";
import ReactImageMagnify from "react-image-magnify";

const ProductCard = (prop) => {
  console.log(prop.image1);

  return (
    <Fragment>
      <div style={{ width: "400px" }}>
        <ReactImageMagnify
          {...{
            smallImage: {
              alt: "Wristwatch by Ted Baker London",
              isFluidWidth: true,
              src: `https://glacial-woodland-05160.herokuapp.com/${prop.image1}`,
            },
            largeImage: {
              src: `https://glacial-woodland-05160.herokuapp.com/${prop.image2}`,
              width: 1600,
              height: 1600,
            },
            enlargedImagePosition: "over",
          }}
        />
      </div>
    </Fragment>
  );
};

export default ProductCard;
