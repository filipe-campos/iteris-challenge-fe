import React from "react"
import SweetAlert from "react-bootstrap-sweetalert"
import axios from 'axios'
import { Constants } from "variables/general"
import { Redirect } from 'react-router-dom'
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'
import LoadingScreen from 'react-loading-screen'
import {
  Card,
  CardBody,
  CardHeader,
  CardFooter,
  Form,
  Container,
  Col,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Row,
  Label,
  FormGroup
} from "reactstrap"
import { Button } from "components"
import iterisLogo from "assets/img/logo-iteris.png"
import bgImage from "assets/img/bg-login.jpg"

class LoginPage extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      user: '',
      pass: '',
      email: '',
      alert: null,
      redirect: null,
      modal: false,
      loading: false
    }

    // Referencia o "this" do objeto que está chamando o método com o "this" do constructor
    this.onChangeUser = this.onChangeUser.bind(this)
    this.onChangePass = this.onChangePass.bind(this)
    this.handleClick = this.handleClick.bind(this)
    this.hideAlert = this.hideAlert.bind(this)
    this.toggleModal = this.toggleModal.bind(this)
  }
  // to stop the warning of calling setState of unmounted component
  componentWillUnmount() {
    var id = window.setTimeout(null, 0)
    while (id--) {
      window.clearTimeout(id)
    }
  }

  // Quando o usuario clicar no botão para logar, verifica se os dados estão corretos e em caso afirmativo ele entra na plataforma
  handleClick(e) {
    e.preventDefault()
    var self = this

    var data = {
      user: {
        email: this.state.user,
        password: this.state.pass
      }
    }

    this.setState({loading:true})
    
    axios.post(Constants.ROUTE_LOGIN, data)
      .then(function (response) {   
        self.setState({loading:false})

        

        if (response.status === Constants.CODE_SUCCESS) {
          var user = response.data.user

          localStorage.setItem("username", user.username)
          localStorage.setItem("image", user.image)
          localStorage.setItem("token", user.token)
          localStorage.setItem("usertype", user.usertype)

          self.successAlert('Login realizado com sucesso', 'Seja muito bem-vindo!')
        } else {
          self.errorAlert('Falhamos em algo :(', 'Desculpe, favor tentar novamente.', "danger")
        }
      })
      .catch(function (error) {
        console.log(error)
        self.setState({loading:false})

        if (error.response.status === Constants.CODE_WRONG_LOGIN) {
          self.errorAlert("Ops!", "E-mail ou Senha incorretos.")
        } else {
          self.errorAlert('Falhamos em algo :(', 'Desculpe, favor tentar novamente.', "danger")
        }
      })
  }

  // Sempre que o valor da input de usuario alterar, salva o valor em uma variavel para manipulação
  onChangeUser(e) {
    this.setState({
      user: e.target.value
    })
  }

  // Sempre que o valor da input de senha alterar, salva o valor em uma variavel para manipulação
  onChangePass(e) {
    this.setState({
      pass: e.target.value
    })
  }

  // Alerta de mensagem de sucesso
  successAlert(title, message) {
    this.setState({
      alert: (
        <SweetAlert
          success
          style={{ display: "block", marginTop: "-100px" }}
          title={title}
          onConfirm={this.hideAlert(true)}
          showConfirm={false}
        >
          {message}
        </SweetAlert>
      )
    })
    setTimeout(this.hideAlert, 2000)
  }

   // Alerta de mensagem de erro 
   errorAlert(title, message, type) {
    this.setState({
      alert: (
        <SweetAlert
          danger={type === "warning" ? false : true}
          warning={type === "warning" ? true : false}
          style={{ display: "block", marginTop: "-100px" }}
          title={title}
          onConfirm={() => this.hideAlert()}
          showConfirm={false}
        >
          {message}
        </SweetAlert>
      )
    })

    setTimeout(this.hideAlert, 2000)
  }

  // Esconde os alertas de mensagem
  hideAlert(redirect) {
    this.setState({
      alert: null
    })

    if (redirect) {
      this.redirectToDashboard()
    }
  }

  // Redireciona para a tela inicial da plataforma caso o usuario consiga logar de forma correta
  redirectToDashboard() {
    this.setState({
      redirect: (
        <Redirect to="/dashboard-resume" />
      )
    })
  }

  // Mostra ou esconde o modal para recuperação de senha
  toggleModal() {
    this.setState({
      modal: !this.state.modal
    })
  }
  
  // TODO: Método para recuperar senha do usuario 
  forgotPassword() {
    
  }

  render() {
    return (
      <div>
        <LoadingScreen
          loading={this.state.loading}
          bgColor={Constants.LOADING_BG_COLOR}
          spinnerColor={Constants.LOADING_SPN_COLOR}
          textColor={Constants.LOADING_TXT_COLOR}
          logoSrc={iterisLogo}
          text={Constants.LOADING_TEXT}
        >
          {this.state.redirect}
          <div className="full-page-content">
            <Modal isOpen={this.state.modal} toggle={this.toggleModal}>
              <ModalHeader className="justify-content-center" toggle={this.toggleModal}>
                Recuperar conta
            </ModalHeader>
              <ModalBody>
                <FormGroup>
                  <Label>Email </Label>
                  <Input
                    type="email"
                    onChange={e => this.setState({ email: e.target.value })}
                  />
                </FormGroup>
              </ModalBody>
              <ModalFooter>
                <Button color="info" onClick={this.forgotPassword}>Enviar</Button>
              </ModalFooter>
            </Modal>

            <div className="login-page">
              <Container>
                <Col xs={12} md={8} lg={4} className="ml-auto mr-auto">
                  {this.state.alert}
                  <Row>
                    <Col xs={12} md={12} className="ml-auto mr-auto text-center">
                      <h2 className="login-header">Olá, <br />Seja muito bem-vindo a Iteris!</h2>
                    </Col>
                  </Row>
                  <Form>
                    <Card className="card-login card-plain">
                      <CardHeader>
                        <div className="logo-container">
                          <img src={iterisLogo} alt="fs-logo" />
                        </div>
                      </CardHeader>
                      <CardBody>
                        <InputGroup
                          className={
                            "no-border form-control-lg " +
                            (this.state.userFocus ? "input-group-focus" : "")
                          }
                        >
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              <i className="now-ui-icons users_circle-08" />
                            </InputGroupText>
                          </InputGroupAddon>
                          <Input
                            id="user"
                            type="text"
                            placeholder="E-mail"
                            autoComplete="off"
                            value={this.state.user}
                            onChange={this.onChangeUser}
                            onFocus={e => this.setState({ userFocus: true })}
                            onBlur={e => this.setState({ userFocus: false })}
                          />
                        </InputGroup>
                        <InputGroup
                          className={
                            "no-border form-control-lg " +
                            (this.state.passwordFocus ? "input-group-focus" : "")
                          }
                        >
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              <i className="now-ui-icons objects_key-25" />
                            </InputGroupText>
                          </InputGroupAddon>
                          <Input
                            id="password"
                            type="password"
                            placeholder="Senha"
                            value={this.state.pass}
                            onChange={this.onChangePass}
                            onFocus={e => this.setState({ passwordFocus: true })}
                            onBlur={e => this.setState({ passwordFocus: false })}
                          />
                        </InputGroup>
                      </CardBody>
                      <CardFooter>
                        <Button
                          type="submit"
                          block
                          round
                          color="info"
                          size="lg"
                          className="mb-3"
                          onClick={e => this.handleClick(e)}
                        >
                          Entrar
                      </Button>
                        <div className="pull-left">
                          <h6>
                            <a href="/register-user" className="link footer-link">
                              Criar Conta
                          </a>
                          </h6>
                        </div>
                        <div className="pull-right">
                          <h6>
                            <a href=" #" className="link footer-link" onClick={this.toggleModal}>
                              Esqueceu a senha?
                          </a>
                          </h6>
                        </div>
                      </CardFooter>
                    </Card>
                  </Form>
                </Col>
              </Container>
            </div>
          </div>
          <div
            className="full-page-background"
            style={{ backgroundImage: "url(" + bgImage + ")" }}
          />
        </LoadingScreen>
      </div>
    )
  }
}

export default LoginPage
