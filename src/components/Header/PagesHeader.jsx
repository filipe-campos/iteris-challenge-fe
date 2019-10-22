import React from "react";
import { Link } from "react-router-dom";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  Nav,
  NavItem,
  Container
} from "reactstrap";

class PagesHeader extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false
    };
    this.toggle = this.toggle.bind(this);
    this.activeRoute.bind(this);
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }
  // verifies if routeName is the one active (in browser input)
  activeRoute(routeName) {
    return this.props.location.pathname.indexOf(routeName) > -1 ? "active" : "";
  }
  render() {
    return (
      <Navbar
        expand="lg"
        className={
          this.state.isOpen
            ? "bg-white navbar-absolute"
            : "navbar-transparent navbar-absolute"
        }
      >
        <Container fluid>
          <div className="navbar-wrapper">
            <div className="navbar-toggle">
              <NavbarToggler onClick={this.toggle}>
                <span className="navbar-toggler-bar bar1" />
                <span className="navbar-toggler-bar bar2" />
                <span className="navbar-toggler-bar bar3" />
              </NavbarToggler>
            </div>
          </div>
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav navbar>
              <NavItem key='0' className={this.activeRoute('/login-page')}>
                <Link to={'/login-page'} className="nav-link">
                  <i className="now-ui-icons users_circle-08" /> Entrar
                </Link>
              </NavItem>
              <NavItem key='1' className={this.activeRoute('/register-user')}>
                <Link to={'/register-user'} className="nav-link">
                  <i className="now-ui-icons tech_mobile" /> Registrar
                </Link>
              </NavItem>
            </Nav>
          </Collapse>
        </Container>
      </Navbar>
    );
  }
}

export default PagesHeader;
