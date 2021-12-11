import React from "react";
import { Fragment } from "react";
// import ReactImageMagnify from "react-image-magnify";

// import image1 from "../ProductPhotos/product1/1.jpg";
// import image2 from "../ProductPhotos/product1/1L.jpg";

const ProductCard = (prop) => {
  console.log(prop.image1);

  return (
    <Fragment>
      <img
        src={`https://glacial-woodland-05160.herokuapp.com/${prop.image1}`}
        alt="xb"
        id="productImage"
      />

      {/*<div style = {{width: '400px'}}>
				<ReactImageMagnify {...{
				    smallImage: {
				        alt: 'Wristwatch by Ted Baker London',
				        isFluidWidth: true,
				        src: `http://localhost:4000/${prop.image1}`


				    },
				    largeImage: {
				        src: `http://localhost:4000/${prop.image2}`,
				        width: 1600,
				        height: 1600
				    }
				}} />
			</div>*/}
    </Fragment>
  );
};

export default ProductCard;
