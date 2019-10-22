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

class HomeHeader extends React.Component {
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

  clearStorage() {
    localStorage.clear()
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
                <Link to={'/login-page'} className="nav-link" onClick={() => this.clearStorage()}>
                  <i className="now-ui-icons media-1_button-power" /> Sair
                </Link>
              </NavItem>

              <NavItem key='1' className={this.activeRoute('/home/index')}>
                <Link to={'/home/index'} className="nav-link">
                  <i className="now-ui-icons shopping_shop" /> Home
                </Link>
              </NavItem>

              <NavItem key='2' className={this.activeRoute('/home/user-profile')}>
                <Link to={'/home/user-profile'} className="nav-link">
                  <i className="now-ui-icons users_circle-08" /> Perfil
                </Link>
              </NavItem>

              {/* <NavItem key='3' className={this.activeRoute('/home/plans')}>
                <Link to={'/home/plans'} className="nav-link">
                  <i className="now-ui-icons users_circle-08" /> Plano
                </Link>
              </NavItem> */}
            </Nav>
          </Collapse>
        </Container>
      </Navbar>
    );
  }
}

export default HomeHeader;
