import React from "react";
import { Container } from "reactstrap";
// used for making the prop types of this component
import PropTypes from "prop-types";

class Footer extends React.Component {
  render() {
    return (
      <footer
        className={"footer" + (this.props.default ? " footer-default" : "")}
      >
        <Container fluid={this.props.fluid ? true : false}>
          <nav>
            <ul>
              <li>
                <a href="https://www.facebook.com/filipe.campos.161">FACEBOOK</a>
              </li>
              <li>
                <a href="https://www.linkedin.com/in/filipecps/">LINKEDIN</a>
              </li>
            </ul>
          </nav>
          <div className="copyright">
            &copy; {1900 + new Date().getYear()} - Desenvolvido por {" "}
            <a
              className="text-info"
              href="https://github.com/filipefcl"
              target="_blank"
              rel="noopener noreferrer"
            >
              Filipe Campos
            </a>. 
          </div>
        </Container>
        
      </footer>
    );
  }
}

Footer.propTypes = {
  default: PropTypes.bool,
  fluid: PropTypes.bool
};

export default Footer;
