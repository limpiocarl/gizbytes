import React from "react";
import { Fragment } from "react";
import ReactImageMagnify from "react-image-magnify";

const ProductCard = (prop) => {
  console.log(prop.productImage1);

  return (
    <Fragment>
      <div style={{ width: "500px" }}>
        <ReactImageMagnify
          {...{
            smallImage: {
              alt: "Wristwatch by Ted Baker London",
              isFluidWidth: true,
              src: `https://glacial-woodland-05160.herokuapp.com/${prop.productImage1}`,
            },
            largeImage: {
              src: `https://glacial-woodland-05160.herokuapp.com/${prop.productImage2}`,
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
