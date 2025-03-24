import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Offcanvas from "react-bootstrap/Offcanvas";
import logo from "../../assets/logo.png";
import "./Header.css";

function Header() {
  return (
    <>
      {["xxl"].map((expand) => (
        <Navbar key={expand} expand={expand} className="Navbar ">
          <Container fluid>
            <Navbar.Brand href="/"></Navbar.Brand>
            <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
            <Navbar.Offcanvas
              id={`offcanvasNavbar-expand-${expand}`}
              aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
              placement="end"
              className="offcanvas"
            >
              <Offcanvas.Header closeButton></Offcanvas.Header>
              <Offcanvas.Body>
                <Nav className="nav flex-grow-1 ">
                  <Nav.Link href="/" className="navlink">
                    <img className="logo" src={logo} />
                  </Nav.Link>
                  <Nav.Link href="#action1" className="navlink">
                    Home
                  </Nav.Link>
                  <Nav.Link href="#action2" className="navlink">
                    Link
                  </Nav.Link>
                  <Nav.Link href="#action2" className="navlink">
                    Link
                  </Nav.Link>
                  <Nav.Link href="#action2" className="navlink">
                    <i class="ri-user-line"></i>
                  </Nav.Link>
                </Nav>
              </Offcanvas.Body>
            </Navbar.Offcanvas>
          </Container>
        </Navbar>
      ))}
    </>
  );
}

export default Header;
