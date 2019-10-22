import React from "react";
import { NavLink } from "react-router-dom";
import { Nav, Collapse } from "reactstrap";
// react plugin for creating notifications over the dashboard
import NotificationAlert from "react-notification-alert";
// javascript plugin used to create scrollbars on windows
import PerfectScrollbar from "perfect-scrollbar";
import { Button } from "components";
import logo from "assets/img/logo-iteris.png";
import avatar from "assets/img/default-avatar.png"

var ps;

class Sidebar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      openAvatar: false,
      userName: localStorage.getItem("username"),
      avatar: localStorage.getItem("image")
    };
    this.activeRoute.bind(this);
    this.minimizeSidebar = this.minimizeSidebar.bind(this);
  }
  // verifies if routeName is the one active (in browser input)
  activeRoute(routeName) {
    return this.props.location.pathname.indexOf(routeName) > -1 ? "active" : "";
  }
  minimizeSidebar() {
    document.body.classList.toggle("sidebar-mini");
  }
  componentDidMount() {
    if (navigator.platform.indexOf("Win") > -1) {
      ps = new PerfectScrollbar(this.refs.sidebar, {
        suppressScrollX: true,
        suppressScrollY: false
      });
    }
  }
  componentWillUnmount() {
    if (navigator.platform.indexOf("Win") > -1) {
      ps.destroy();
    }
    // to stop the warning of calling setState of unmounted component
    var id = window.setTimeout(null, 0);
    while (id--) {
      window.clearTimeout(id);
    }
  }
  
  render() {
    return (
      <div>
        <NotificationAlert ref="notificationAlert" />
        <div className="sidebar" data-color="blue">
          <div className="logo">
            <a
              href="/home/index"
              className="simple-text logo-mini"
            >
              <div className="logo-img">
                <img src={logo} alt="react-logo" />
              </div>
            </a>
            <a
              href="/home/index"
              className="simple-text logo-normal"
            >
              Iteris
            </a>
            <div className="navbar-minimize">
              <Button
                simple
                neutral
                icon
                round
                id="minimizeSidebar"
                onClick={this.minimizeSidebar}
              >
                <i className="now-ui-icons text_align-center visible-on-sidebar-regular" />
                <i className="now-ui-icons design_bullet-list-67 visible-on-sidebar-mini" />
              </Button>
            </div>
          </div>

          <div className="sidebar-wrapper" ref="sidebar">
            <div className="user"> 
              <div className="photo">
                <img src={avatar} alt="Avatar" />
              </div>
              <div className="info" >
                <a
                  data-toggle="collapse"
                  aria-expanded={this.state.openAvatar}
                  onClick={() =>
                    this.setState({ openAvatar: !this.state.openAvatar })
                  }
                  style={{ marginRight: 10}}
                >
                  <span>
                    {this.state.userName.length > 23 ? this.state.userName.substring(0, 23) + "..." : this.state.userName}
                  </span>
                </a>
              </div>
            </div>
            <Nav>
              {this.props.routes.map((prop, key) => {
                if (prop.redirect) return null;
                if (prop.collapse) {
                  var st = {};
                  st[prop["state"]] = !this.state[prop.state];
                  return (
                    <li className={this.activeRoute(prop.path)} key={key}>
                      <a
                        data-toggle="collapse"
                        aria-expanded={this.state[prop.state]}
                        onClick={() => this.setState(st)}
                      >
                        <i className={"now-ui-icons " + prop.icon} />
                        <p>
                          {prop.name}
                          <b className="caret" />
                        </p>
                      </a>
                      <Collapse isOpen={this.state[prop.state]}>
                        <ul className="nav">
                          {prop.views.map((prop, key) => {
                            if (prop.redirect) return null;
                            return (
                              <li
                                className={this.activeRoute(prop.path)}
                                key={key}
                              >
                                <NavLink
                                  to={prop.path}
                                  activeClassName="active"
                                >
                                  <span className="sidebar-mini-icon">
                                    {prop.mini}
                                  </span>
                                  <span className="sidebar-normal">
                                    {prop.name}
                                  </span>
                                </NavLink>
                              </li>
                            );
                          })}
                        </ul>
                      </Collapse>
                      <div style={{ height: 1, marginTop: 10, backgroundColor: "rgba(255, 255, 255, 0.5)", marginLeft: 15, marginRight: 15}}></div>
                    </li>
                  );
                }
                return (
                  <li className={this.activeRoute(prop.path)} key={key}>
                    <NavLink
                      to={prop.path}
                      className="nav-link"
                      activeClassName="active"
                    >
                      <i className={"now-ui-icons " + prop.icon} />
                      <p>{prop.name}</p>
                    </NavLink>
                    <div style={{ height: 1, marginTop: 10, backgroundColor: "rgba(255, 255, 255, 0.5)", marginLeft: 15, marginRight: 15}}></div>
                  </li>
                );
              })}
            </Nav>
          </div>
        </div>
      </div>
    );
  }
}

export default Sidebar;
