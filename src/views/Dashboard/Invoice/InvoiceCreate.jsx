import React from "react"
import {
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  CardFooter,
  Row,
  Col,
  Form,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText
} from "reactstrap"
import { PanelHeader, Button } from "components"
import Util from "variables/util"
import SweetAlert from 'react-bootstrap-sweetalert'
import { Redirect } from 'react-router-dom'
import { Constants } from "variables/general"
import axios from 'axios'
import Datetime from 'react-datetime'
import LoadingScreen from 'react-loading-screen'
import iterisLogo from "assets/img/logo-iteris.png"

class InvoiceCreate extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      dataInfos: {
        descriptionState: "",
        description: ""
      },
      dateBilling: '',
      datePayment: '',
      alert: null,
      redirect: null,
      loading: false
    }

    // Referencia o "this" do objeto que está chamando o método com o "this" do constructor
    this.handleChangeDateBilling = this.handleChangeDateBilling.bind(this)
    this.handleChangeDatePayment = this.handleChangeDatePayment.bind(this)
    this.createInvoiceSubmit = this.createInvoiceSubmit.bind(this)
    this.hideAlert = this.hideAlert.bind(this)
    this.redirectToLogin = this.redirectToLogin.bind(this)
  }

  handleChangeDateBilling(e) {
    if (e.format !== undefined) {
      let dateBilling = `${e.format('DD')}/${e.format('MM')}/${e.format('YYYY')}`
      this.setState({ dateBilling: dateBilling })
    }
  }

  // Sempre que alterar a data final, salva ela em uma variavel do state para manipulação
  handleChangeDatePayment(e) {
    if (e.format !== undefined) {
      let datePayment = `${e.format('DD')}/${e.format('MM')}/${e.format('YYYY')}`
      this.setState({ datePayment: datePayment })
    }
  }

  componentDidMount() {
  }

  // Alerta de mensagem de erro 
  errorAlert(title, message, expirou, type) {
    this.setState({
      alert: (
        <SweetAlert
          danger={type === "warning" ? false : true}
          warning={type === "warning" ? true : false}
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
    setTimeout(this.hideAlert, 2000, false)
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

  // Quando o usuário clicar em pesquisar, mostra as informações iniciais (tabela inicial e grafico inicial)
  createInvoiceSubmit(e) {
    if (this.state.dateBilling !== '' && this.state.dataInfos.descriptionState !== 'has-danger') {
      let self = this


      var dateBilling = this.state.dateBilling.split("/")[1] + '-' +
                        this.state.dateBilling.split("/")[0] + '-' +
                        this.state.dateBilling.split("/")[2]

      var datePayment = this.state.datePayment.split("/")[1] + '-' +
                        this.state.datePayment.split("/")[0] + '-' +
                        this.state.datePayment.split("/")[2]

      let data = {
        invoice: {
          description: this.state.dataInfos.description,
          dateBilling: dateBilling,
          datePayment: datePayment
        }
      }

      let config = {
        headers: {
          'Authorization': "Bearer " + localStorage.getItem("token"),
          'Content-Type': 'application/json'
        }
      }

      this.setState({ loading: true })
      axios.post(Constants.ROUTE_INVOICE_INSERT, data, config)
        .then(function (response) {
          self.setState({ loading: false })

          if (response.status === Constants.CODE_SUCCESS) {
            self.successAlert("Iteris", "Nota Fiscal cadastrada com sucesso!")

            self.setState({
              "dateBilling": '',
              "datePayment": '',
              "dataInfos": {
                descriptionState: "",
                description: ""
              }
            })
          } else {
            self.errorAlert('Não conseguimos processar sua requisição :(', 'Desculpe, favor tentar novamente.')
          }

        })
        .catch(function (error) {
          self.setState({ loading: false })
          self.errorAlert('Não conseguimos processar sua requisição :(', 'Desculpe, favor tentar novamente.')
          console.log(error)
        })
    } else {
      this.errorAlert('Iteris', 'Campo Data de Faturamento e Descrição obrigatórios.', false, "warning")
    }
  }

  render() {
    require('moment/locale/pt')
    return (
      <div>
        <LoadingScreen
          loading={this.state.loading}
          bgColor={Constants.LOADING_BG_COLOR}
          spinnerColor={Constants.LOADING_SPN_COLOR}
          textColor={Constants.LOADING_TXT_COLOR}
          logoSrc={iterisLogo}
          text={Constants.LOADING_TEXT}
          className="loading-screen"
        >
          {this.state.redirect}
          {this.state.alert}
          <PanelHeader size="sm" />

          <div className="content">
            <Card className="card-signup">
              <CardHeader className="text-center">
                <CardTitle tag="h4">Cadastrar Nota Fiscal</CardTitle>
              </CardHeader>

              <Row>
                <Col xs={12} md={4} className="ml-auto mr-auto">
                  <Card>
                    <CardBody>
                      <Datetime
                        locale="pt-br"
                        timeFormat={false}
                        inputProps={{ placeholder: "Data de Faturamento" }}
                        dateFormat='DD/MM/YYYY'
                        onChange={this.handleChangeDateBilling}
                        value={this.state.dateBilling}
                      />
                    </CardBody>
                  </Card>
                </Col>

                <Col xs={12} md={4} className="ml-auto mr-auto">
                  <Card>
                    <CardBody>
                      <Datetime
                        locale="pt-br"
                        timeFormat={false}
                        inputProps={{ placeholder: "Data de Pagamento" }}
                        dateFormat='DD/MM/YYYY'
                        onChange={this.handleChangeDatePayment}
                        value={this.state.datePayment}
                      />
                    </CardBody>
                  </Card>
                </Col>
              </Row>
              <CardBody>
                <Form>
                  <InputGroup className={this.state.descriptionFocus ? `input-group-focus ${this.state.dataInfos.descriptionState} `
                    : this.state.dataInfos.descriptionState}>
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="now-ui-icons text_align-center" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input
                      type="text"
                      placeholder="Descrição..."
                      onFocus={e => this.setState({ descriptionFocus: true })}
                      onBlur={e => this.setState({ descriptionFocus: false })}
                      onChange={(e) => this.setState({
                        dataInfos:
                          Util.descriptionValidation(e, this.state.dataInfos)
                      })}
                      value={this.state.dataInfos.description}
                    />
                  </InputGroup>

                </Form>
              </CardBody>
              <CardFooter className="text-center">
                <Button type="submit" color="info" size="lg" round onClick={e => this.createInvoiceSubmit(e)}> Cadastrar </Button>
              </CardFooter>
            </Card>
          </div>
        </LoadingScreen>
      </div>
    )
  }
}

export default InvoiceCreate



