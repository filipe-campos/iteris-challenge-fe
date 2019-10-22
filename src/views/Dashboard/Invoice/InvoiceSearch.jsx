import React from "react"
import {
  Card,
  CardBody,
  Table,
  Row,
  Col,
  Modal,
  ModalHeader,
  ModalBody
} from "reactstrap"
import { PanelHeader, Button } from "components"
import SweetAlert from 'react-bootstrap-sweetalert'
import { Redirect } from 'react-router-dom'
import axios from 'axios'
import Datetime from 'react-datetime'
import { Constants, INVOICE_STATUS } from "variables/general"
import LoadingScreen from 'react-loading-screen'
import iterisLogo from "assets/img/logo-iteris.png"
import ReactTable from "react-table"

class InvoiceSearch extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      tableData: [],
      invoiceSelected: {
        datePayment: ''
      },
      modalUpdate: false,
      alert: null,
      redirect: null,
      loading: false,
    }

    this.handleClick = this.handleClick.bind(this)
    this.handleClickAnticipation = this.handleClickAnticipation.bind(this)
    this.handleChangeDatePayment = this.handleChangeDatePayment.bind(this)
    this.hideAlert = this.hideAlert.bind(this)
    this.redirectToLogin = this.redirectToLogin.bind(this)
    this.toggleModalUpdate = this.toggleModalUpdate.bind(this)
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

  // Redireciona para a tela de login caso o token do usuario expirou
  redirectToLogin() {
    this.setState({
      redirect: <Redirect to="/pages/login-page" />
    })
  }

  // Quando o usuário clicar em pesquisar, mostra as informações iniciais (tabela inicial e grafico inicial)
  handleClick() {
    let self = this

    let config = {
      headers: {
        'Authorization': "Bearer " + localStorage.getItem("token"),
        'Content-Type': 'application/json'
      }
    }

    this.setState({ loading: true })
    axios.get(Constants.ROUTE_INVOICE_LIST, config)
      .then(function (response) {
        self.setState({ loading: false })

        if (response.status === Constants.CODE_SUCCESS) {
          if (response.data.invoices.length === 0) {
            self.errorAlert('Iteris', 'Nenhuma informação encontrada.', false, "warning")
          }
          else {
            self.setState({ tableData: [] })
            self.setState({ tableData: response.data.invoices })
          }
        } else {
          self.errorAlert('Não conseguimos processar sua requisição :(', 'Desculpe, favor tentar novamente.')
        }

      })
      .catch(function (error) {
        self.setState({ loading: false })
        self.errorAlert('Não conseguimos processar sua requisição :(', 'Desculpe, favor tentar novamente.')
        console.log(error)
      })

  }

  // Quando o usuário clicar em pesquisar, mostra as informações iniciais (tabela inicial e grafico inicial)
  handleClickAnticipation(e) {
    let self = this

    let config = {
      headers: {
        'Authorization': "Bearer " + localStorage.getItem("token"),
        'Content-Type': 'application/json'
      }
    }

    var datePayment = this.state.invoiceSelected.datePayment.split("/")[1] + '-' +
                      this.state.invoiceSelected.datePayment.split("/")[0] + '-' +
                      this.state.invoiceSelected.datePayment.split("/")[2]

    let data = {
      invoice: {
        status: 1,
        anticipation: true,
        newDatePayment: datePayment
      }
    }


    this.setState({ loading: true })
    axios.put(Constants.ROUTE_INVOICE_UPDATE + this.state.invoiceSelected.number, data, config)
      .then(function (response) {
        self.setState({ loading: false })

        if (response.status === Constants.CODE_SUCCESS) {
          self.successAlert('Sucesso', 'Antecipação solicitada com sucesso.')
          self.handleClick()
          self.setState({
            modalUpdate: false
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

  }

  // Mostra ou esconde o Modal de altereação de Notas Fiscais
  toggleModalUpdate(prop) {
    if (prop.status === INVOICE_STATUS[0]) {
      this.setState({ invoiceSelected: prop })
      this.setState({
        modalTitle: <div> <b> Solicitar antecipação de Pagamento</b></div>,
      })

      this.setState({
        modalUpdate: !this.state.modalUpdate
      })
    } else {
      this.setState({
        modalUpdate: false
      })
    }
  }

  handleChangeDatePayment(e) {
    if (e.format !== undefined) {
      let datePayment = `${e.format('DD')}/${e.format('MM')}/${e.format('YYYY')}`

      var invoiceSelected = this.state.invoiceSelected

      invoiceSelected.datePayment = datePayment

      this.setState({
        invoiceSelected: invoiceSelected
      })
    }
  }

  render() {
    require('moment/locale/pt')

    var moment = require('moment');

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
            <Modal isOpen={this.state.modalUpdate} toggle={this.toggleModalUpdate} size="lg">
              <ModalHeader className="justify-content-center" toggle={this.toggleModalUpdate}>
                {this.state.modalTitle}
              </ModalHeader>
              <ModalBody>
                <div>
                  <Table>
                    <thead className="tableHeaderEditAcc">
                      <tr>
                        <th className="text-left">Número</th>
                        <th className="text-left">Data de Faturamento</th>
                        <th className="text-left">Data de Pagamento</th>
                        <th className="text-left">Descrição</th>
                        <th className="text-left">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="text-left"> {this.state.invoiceSelected === null ? '' : this.state.invoiceSelected.number} </td>
                        <td className="text-left"> {this.state.invoiceSelected === null ? '' : this.state.invoiceSelected.dateBilling} </td>
                        <td className="text-left">
                          <Datetime
                            locale="pt-br"
                            timeFormat={false}
                            inputProps={{ placeholder: "dd/mm/yyyy" }}
                            dateFormat='DD/MM/YYYY'
                            onChange={this.handleChangeDatePayment}
                            value={this.state.invoiceSelected.datePayment}
                          />
                        </td>
                        <td className="text-left"> {this.state.invoiceSelected === null ? '' : this.state.invoiceSelected.description} </td>
                        <td className="text-left"> {this.state.invoiceSelected === null ? '' : this.state.invoiceSelected.status} </td>
                      </tr>
                    </tbody>
                  </Table>

                  <Button color="info" onClick={this.handleClickAnticipation}>Solicitar</Button>
                </div>
              </ModalBody>
            </Modal>

            <Row>
              <Col xs={12} md={12} className="align-center">
                <Button color="info" size="lg" onClick={this.handleClick}>Listar Notas</Button>
              </Col>
            </Row>

            {console.log(this.state.tableData)}

            {this.state.tableData.length > 0 ?
              <Card>
                <CardBody>
                  <ReactTable
                    responsive
                    previousText="Anterior"
                    nextText="Próximo"
                    pageText="Página"
                    ofText="de"
                    rowsText="linhas"
                    NextComponent={(props) => <Button disabled={props.disabled} className="button-next-previus-coa" color="info" onClick={props.onClick}> Próximo </Button>}
                    PreviousComponent={(props) => <Button disabled={props.disabled} className="button-next-previus-coa" color="info" onClick={props.onClick}> Anterior </Button>}
                    data={
                      this.state.tableData.map((prop, key) => {
                        return ({
                          id: key,
                          number: prop.number,
                          dateBilling: moment(prop.dateBilling).format('DD/MM/YYYY'),
                          datePayment: prop.datePayment !== undefined ? moment(prop.datePayment).format('DD/MM/YYYY') : '',
                          description: prop.description,
                          status: INVOICE_STATUS[prop.status],
                        })
                      })
                    }
                    getTdProps={(rowInfo) => {
                      return { style: { marginTop: 10, marginBottom: 10 } }
                    }}
                    getTrProps={(state, rowInfo, column, instance) => {
                      return { className: "row-table-click", onClick: () => this.toggleModalUpdate(rowInfo.row._original) }
                    }}
                    getTheadThProps={() => {
                      return { className: "tableHeader" }
                    }}
                    filterable
                    defaultFilterMethod={({ id, value }, row) =>
                      row[id] ? row[id].toLowerCase().includes(value.toLowerCase()) : true}
                    columns={[
                      {
                        Header: 'Número',
                        accessor: "number",
                        maxWidth: 100
                      },
                      {
                        Header: 'Data de Faturamento',
                        accessor: "dateBilling",
                        maxWidth: 120
                      },
                      {
                        Header: 'Data de Pagamento',
                        accessor: "datePayment",
                        maxWidth: 120
                      },
                      {
                        Header: "Descrição",
                        accessor: "description",
                        minWidth: 250
                      },
                      {
                        Header: "Status",
                        accessor: "status"
                      }
                    ]}
                    pageSize={this.state.tableData.length}
                    showPaginationBottom={false}
                    className="-striped -highlight"
                  />
                </CardBody>
              </Card> : null}
          </div>
        </LoadingScreen>
      </div>
    )
  }
}

export default InvoiceSearch



