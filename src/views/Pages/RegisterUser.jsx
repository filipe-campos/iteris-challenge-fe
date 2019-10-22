import React from "react"
import {
  Card,
  CardHeader,
  CardTitle,
  CardBody,
  CardFooter,
  Container,
  Row,
  Col,
  Form,
  FormGroup,
  Input,
  Label,
  InputGroup,
  InputGroupAddon,
  InputGroupText
} from "reactstrap"
import Select from "react-select"
import { Constants, SELECT_USER_TYPE } from "variables/general"
import Util from "variables/util"
import { Button } from "components"
import axios from 'axios'
import bgImage from "assets/img/bg16.jpg"
import SweetAlert from 'react-bootstrap-sweetalert'
import { Redirect } from 'react-router-dom'
import LoadingScreen from 'react-loading-screen'
import iterisLogo from "assets/img/logo-iteris.png"

class RegisterUser extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      // Objeto que guarda as informações inseridas pelo usuario
      dataInfos: {
        emailState: "",
        nameState: "",
        typeState: "",
        confirmState: "",
        passwordState: "",
        confirmPasswordState: "",
        email: "",
        name: "",
        type: "",
        password: "",
        confirmPassword: "",
      },
      alert: null,
      redirect: null,
      loading: false,
      checkBox: false,
    }

    // Referencia o "this" do objeto que está chamando o método com o "this" do constructor
    this.registerSubmit = this.registerSubmit.bind(this)
    this.hideAlert = this.hideAlert.bind(this)
  }

  // Nada ainda
  componentDidMount() {
    console.log(this.props)
  }

  // Alerta de mensagem de sucesso
  successAlert(title, message) {
    this.setState({
      alert: (
        <SweetAlert
          success
          style={{ display: "block", marginTop: "-100px" }}
          title={title}
          onConfirm={() => this.hideAlert()}
          showConfirm={false}
        >
          {message}
        </SweetAlert>
      )
    })
    setTimeout(this.hideAlert, 2000, true)
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

    if (redirect)
      this.redirectToLogin()
  }

  // Redireciona para a tela de login
  redirectToLogin() {
    this.setState({
      redirect: <Redirect to="/pages/login-page" />
    })
  }

  // Verifica se os dados digitados pelo usuario sao validos e em caso afirmativo cadastra ele no sistema
  registerSubmit(e) {
    e.preventDefault()
    let dataInfos = this.state.dataInfos

    if (dataInfos.emailState === "" || dataInfos.confirmPasswordState === "" ||
      dataInfos.password === "" || dataInfos.nameState === "") {
      this.errorAlert("Dados inválidos!", "Por favor! Preencha todos os campos.", "warning")
    }
    else if (dataInfos.emailState === "has-danger" ||
      dataInfos.confirmPasswordState === "has-danger" || dataInfos.passwordState === "has-danger" ||
      dataInfos.nameState === "has-danger") {
      this.errorAlert("Dados inválidos!", "Por favor! Preencha todos os campos de forma válida.", "warning")
    }
    else if (!this.state.checkBox) {
      this.errorAlert("Dados inválidos!", "Você deve concordar com os termos da Iteris.", "warning")
    }
    else {
      let self = this

      let data = {
        user: {
          username: this.state.dataInfos.name,
          email: this.state.dataInfos.email,
          password: this.state.dataInfos.password,
          usertype: this.state.dataInfos.type
        }
      }

      this.setState({ loading: true })
      axios.post(Constants.ROUTE_USER_INSERT, data)
        .then(function (response) {
          self.setState({ loading: false })
          
          if (response.status === Constants.CODE_SUCCESS) {
            self.successAlert("Iteris", "Usuário registrado com sucesso!")
          }
          else {
            self.errorAlert('Falhamos em algo :(', 'Desculpe, favor tentar novamente.', "danger")
          }
        })
        .catch(function (error) {
          console.log(error)
          self.setState({ loading: false })

          if (error.response.status === Constants.CODE_USER_EXISTS) {
            self.errorAlert("Dados inválidos!", "Este email já está cadastrado.")
          } else {
            self.errorAlert('Falhamos em algo :(', 'Desculpe, favor tentar novamente.', "danger")
          }
        })
    }
  }

  // Método onde a parte visível do site será "renderizada"
  render() {
    return (
      <div>
        <LoadingScreen
          loading={this.state.loading}
          bgColor={Constants.LOADING_BG_COLOR}
          spinnerColor={Constants.LOADING_SPN_COLOR}
          textColor={Constants.LOADING_TXT_COLOR}
          logoSrc={iterisLogo}
        >
          {this.state.alert}
          {this.state.redirect}
          <div className="full-page-content">
            <div className="register-page">
              <Container>
                <Row className="justify-content-center">
                  <Col lg={6} md={8} xs={12}>
                    <Card className="card-signup">
                      <CardHeader className="text-center">
                        <CardTitle tag="h4">Registrar</CardTitle>
                      </CardHeader>
                      <CardBody>
                        <Form>
                          <InputGroup className={this.state.nameFocus ? `input-group-focus ${this.state.dataInfos.nameState} `
                            : this.state.dataInfos.nameState}>
                            <InputGroupAddon addonType="prepend">
                              <InputGroupText>
                                <i className="now-ui-icons users_single-02" />
                              </InputGroupText>
                            </InputGroupAddon>
                            <Input
                              type="text"
                              placeholder="Nome..."
                              onFocus={e => this.setState({ nameFocus: true })}
                              onBlur={e => this.setState({ nameFocus: false })}
                              onChange={(e) => this.setState({
                                dataInfos:
                                  Util.nameValidation(e, this.state.dataInfos)
                              })}
                            />
                          </InputGroup>

                          <InputGroup className={this.state.emailFocus ? `input-group-focus ${this.state.dataInfos.emailState} `
                            : this.state.dataInfos.emailState}>
                            <InputGroupAddon addonType="prepend">
                              <InputGroupText>
                                <i className="now-ui-icons ui-1_email-85" />
                              </InputGroupText>
                            </InputGroupAddon>
                            <Input
                              type="text"
                              placeholder="Email..."
                              onFocus={e => this.setState({ emailFocus: true })}
                              onBlur={e => this.setState({ emailFocus: false })}
                              onChange={(e) => this.setState({
                                dataInfos:
                                  Util.emailValidation(e, this.state.dataInfos)
                              })}
                            />
                          </InputGroup>

                          <InputGroup className={this.state.passwordFocus ? `input-group-focus ${this.state.dataInfos.passwordState} `
                            : this.state.dataInfos.passwordState}>
                            <InputGroupAddon addonType="prepend">
                              <InputGroupText>
                                <i className="now-ui-icons objects_key-25" />
                              </InputGroupText>
                            </InputGroupAddon>
                            <Input
                              type="text"
                              placeholder="Senha..."
                              onFocus={e => this.setState({ passwordFocus: true })}
                              onBlur={e => this.setState({ passwordFocus: false })}
                              onChange={(e) => this.setState({
                                dataInfos:
                                  Util.passwordValidation(e, this.state.dataInfos)
                              })}
                            />
                          </InputGroup>

                          <InputGroup className={this.state.confirmPasswordFocus ? `input-group-focus ${this.state.dataInfos.confirmPasswordState} `
                            : this.state.dataInfos.confirmPasswordState}>
                            <InputGroupAddon addonType="prepend">
                              <InputGroupText>
                                <i className="now-ui-icons objects_key-25" />
                              </InputGroupText>
                            </InputGroupAddon>
                            <Input
                              type="text"
                              placeholder="Confirmar senha..."
                              onFocus={e => this.setState({ confirmPasswordFocus: true })}
                              onBlur={e => this.setState({ confirmPasswordFocus: false })}
                              onChange={(e) => this.setState({
                                dataInfos:
                                  Util.confirmPasswordValidation(e, this.state.dataInfos)
                              })}
                            />
                          </InputGroup>

                          <Select
                              className="react-select"
                              classNamePrefix="react-select"
                              placeholder="Tipo de usuário..."
                              name="singleSelect"
                              options={SELECT_USER_TYPE}
                              onChange={(e) => this.setState({
                                dataInfos:
                                  Util.typeValidation(e, this.state.dataInfos)
                              })}
                            />

                          <FormGroup check>
                            <Label check>
                              <Input type="checkbox" onChange={e => this.setState({ checkBox: !this.state.checkBox })} {...this.props.inputProps} />
                              <span className="form-check-sign" />
                              <div>
                                Eu concordo com os{" "}
                                <a href="#something">termos e condições</a>.
                              </div>
                            </Label>
                          </FormGroup>
                        </Form>
                      </CardBody>
                      <CardFooter className="text-center">
                        <Button type="submit" color="info" size="lg" round onClick={e => this.registerSubmit(e)}> Registrar </Button>
                      </CardFooter>
                    </Card>
                  </Col>
                </Row>
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

export default RegisterUser
