import Navbar from "react-bootstrap/Navbar";
import "../App.css";

export default function BannerTop() {
  return (
    <Navbar
      className="justify-content-center"
      variant="dark"
      expand="lg"
      id="banner-top"
    >
      <Navbar.Brand id="banner-top-text">
        Free shipping on all orders over ₱2000.
      </Navbar.Brand>
    </Navbar>
  );
}
