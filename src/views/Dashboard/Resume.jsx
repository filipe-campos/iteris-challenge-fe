import React from "react"
import {
  Card,
  CardBody,
  Row,
  Col,
} from "reactstrap"
import { Redirect } from 'react-router-dom'
import { PanelHeader } from "components"
import SweetAlert from 'react-bootstrap-sweetalert'

class Resume extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      redirect: null,
      alert: null,
      loading: true
    }

    this.hideAlert = this.hideAlert.bind(this)
  }

  // Quando todos os componentes foram carregados
  componentDidMount() {
    this.setState({
      resume: (
        <Row>
          <Col xs={12} md={12} className="ml-auto mr-auto text-center">
            <h2 className="resume-header">Olá {localStorage.getItem("username")}, <br />Seja muito bem-vindo a Iteris!</h2>
          </Col>
        </Row>
      )
    })
  }

  // Alerta de mensagem de erro 
  errorAlert(title, message, expirou) {
    this.setState({
      alert: (
        <SweetAlert
          danger
          style={{ display: "block", marginTop: "-100px" }}
          title={title}
          onConfirm={() => this.hideAlert(expirou)}
          showConfirm={false}
        >
          {message}
        </SweetAlert>
      )
    })

    setTimeout(this.hideAlert, 2000, expirou)
  }

  // Esconde os alertas de mensagem
  hideAlert(expirou) {
    this.setState({
      alert: null
    })

    if (expirou)
      this.redirectToLogin()
  }

  // redireciona para a tela de login caso o token do usuario expirou
  redirectToLogin() {
    this.setState({
      redirect: <Redirect to="/pages/login-page" />
    })
  }

  render() {
    return (
      <div>

        <PanelHeader
          size="sm"
        />
        {this.state.alert}
        {this.state.redirect}
        <div className="content">
          <Row>
            <Col xs={12} md={12}>
              <Card className="card-stats card-raised">
                <CardBody>
                  {this.state.resume}

                  <Row>
                    <h6 className="resume-phrase"> "Faça da disciplina um lema, da dedicação uma bandeira e da paixão pelo trabalho um exemplo." <small>Ayrton Senna</small></h6> 
                  </Row>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </div>
      </div>
    )
  }
}

export default Resume
