import React from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import "../App.css";

const ProductCardBrowse = ({ productProp }) => {
  console.log(productProp);

  const {
    productName,
    description,
    price,
    stocks,
    _id,
    productImage1,
    productImage2,
  } = productProp;
  return (
    <Card>
      <Card.Body>
        <img
          src={`https://glacial-woodland-05160.herokuapp.com/${productImage1}`}
          alt="xb"
          id="productImage"
        />
        <img
          src={`https://glacial-woodland-05160.herokuapp.com/${productImage2}`}
          alt="xb"
          id="productImage"
        />
        <Card.Title>{productName}</Card.Title>
        <Card.Subtitle>Description:</Card.Subtitle>
        <Card.Text>{description}</Card.Text>
        <Card.Subtitle>Price:</Card.Subtitle>
        <Card.Text>{price}</Card.Text>
        <Card.Subtitle>Stocks:</Card.Subtitle>
        <Card.Text>{stocks}</Card.Text>
        <Link className="btn btn-primary" to={`/products/${_id}`}>
          View Product
        </Link>
      </Card.Body>
    </Card>
  );
};

export default ProductCardBrowse;

/*
<Fragment>
			<Card style={{ width: '18rem' }}>
			  <Card.Img variant="top" src="https://www.e-gizmo.net/oc/image/cache/package/KIT/211000028-800x800.jpg" />
			  <Card.Body>
			    <Card.Title>ENHANCED TP4056 TYPE C USB PORT LI-ION CHARGER MODULE 1A WITH BMS PROTECTION</Card.Title>
			    <Card.Text>
			      Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit...
			    </Card.Text>
			    <Button variant="primary">View Product</Button>
			  </Card.Body>
			</Card>
		</Fragment>
*/
