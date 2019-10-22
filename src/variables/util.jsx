function emailValidation(e, data) {
  var dataInfos = data
  dataInfos["email"] = e.target.value;
  var emailRex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (emailRex.test(e.target.value)) {
    dataInfos["emailState"] = "has-success";
  } else {
    dataInfos["emailState"] = "has-danger";
  }
  //this.setState({ dataInfos });
  return dataInfos
}
function userValidation(e, data) {
  var dataInfos = data;
  dataInfos["user"] = e.target.value;
  if (e.target.value.length >= 3) {
    dataInfos["userState"] = "has-success";
  } else {
    dataInfos["userState"] = "has-danger";
  }
  return dataInfos
}
function typeValidation(e, data) {
  var dataInfos = data;
  dataInfos["type"] = e.value;
  if (e.value.length >= 3) {
    dataInfos["typeState"] = "has-success";
  } else {
    dataInfos["typeState"] = "has-danger";
  }
  return dataInfos
}
function passwordValidation(e, data) {
  var dataInfos = data;
  dataInfos["password"] = e.target.value;
  if (e.target.value.length >= 5) {
    dataInfos["passwordState"] = "has-success";
    if (e.target.value === dataInfos.confirmPassword)
      dataInfos["confirmPasswordState"] = "has-success"
    else if (e.target.value !== dataInfos.confirmPassword && dataInfos.confirmPassword.length >= 5)
      dataInfos["confirmPasswordState"] = "has-danger"
  } else {
    dataInfos["passwordState"] = "has-danger";
  }
  return dataInfos
}
function confirmPasswordValidation(e, data) {
  var dataInfos = data;
  dataInfos["confirmPassword"] = e.target.value;
  if (e.target.value === dataInfos.password && e.target.value.length >= 5) {
    dataInfos["confirmPasswordState"] = "has-success";
  } else {
    dataInfos["confirmPasswordState"] = "has-danger";
  }
  return dataInfos
}
function nameValidation(e, data) {
  var dataInfos = data;
  dataInfos["name"] = e.target.value;
  if (e.target.value.length >= 3) {
    dataInfos["nameState"] = "has-success";
  } else {
    dataInfos["nameState"] = "has-danger";
  }
  return dataInfos
}
function descriptionValidation(e, data) {
  var dataInfos = data;
  dataInfos["description"] = e.target.value;
  if (e.target.value.length >= 3) {
    dataInfos["descriptionState"] = "has-success";
  } else {
    dataInfos["descriptionState"] = "has-danger";
  }
  return dataInfos
}
function cnpjValidation(e, data) {
  var dataInfos = data;
  dataInfos["cnpj"] = mCNPJ(e.target.value)

  if (/^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/.test(dataInfos["cnpj"]))
    dataInfos["cnpjState"] = "has-success";
  else
    dataInfos["cnpjState"] = "has-danger";

  return dataInfos
}
function addressValidation(e, data) {
  var dataInfos = data;
  dataInfos["address"] = e.target.value;
  if (e.target.value.length >= 3) {
    dataInfos["addressState"] = "has-success";
  } else {
    dataInfos["addressState"] = "has-danger";
  }
  return dataInfos
}
function cepValidation(e, data) {
  var dataInfos = data;
  dataInfos["cep"] = mCEP(e.target.value)

  if (e.target.value.length === 9) {
    dataInfos["cepState"] = "has-success";
  } else {
    dataInfos["cepState"] = "has-danger";
  }
  return dataInfos
}
function ufValidation(e, data) {
  var dataInfos = data;
  dataInfos["uf"] = e.target.value;
  if (e.target.value.length === 2) {
    dataInfos["ufState"] = "has-success";
  } else {
    dataInfos["ufState"] = "has-danger";
  }
  return dataInfos
}
function cityValidation(e, data) {
  var dataInfos = data;
  dataInfos["city"] = e.target.value;
  if (e.target.value.length >= 3) {
    dataInfos["cityState"] = "has-success";
  } else {
    dataInfos["cityState"] = "has-danger";
  }
  return dataInfos
}
function countryValidation(e, data) {
  var dataInfos = data;
  dataInfos["country"] = e.target.value;
  if (e.target.value.length >= 3) {
    dataInfos["countryState"] = "has-success";
  } else {
    dataInfos["countryState"] = "has-danger";
  }
  return dataInfos
}
function cnaeValidation(e, data) {
  var dataInfos = data;
  dataInfos["cnae"] = e.target.value

  if (e.target.value.length >= 3)
    dataInfos["cnaeState"] = "has-success";
  else
    dataInfos["cnaeState"] = "has-danger";

  return dataInfos
}
function cardCodValidation(e, data) {
  var dataInfos = data;
  dataInfos["codSecurity"] = e.target.value;
  if (e.target.value.length === 3)
    dataInfos["codSecurityState"] = "has-success";
  else
    dataInfos["codSecurityState"] = "has-danger";
  return dataInfos
}
function cardNumberValidation(e, data) {
  var dataInfos = data;
  dataInfos["number"] = mCARD(e.target.value, dataInfos.number)
  if (e.target.value.length === 19)
    dataInfos["numberState"] = "has-success";
  else
    dataInfos["numberState"] = "has-danger";
  return dataInfos
}
function cpfValidation(e, data) {
  var dataInfos = data;
  dataInfos["cpf"] = mCPF(e.target.value)
  if (/^\d{3}\.\d{3}\.\d{3}-\d{2}$/.test(e.target.value))
    dataInfos["cpfState"] = "has-success";
  else
    dataInfos["cpfState"] = "has-danger";
  return dataInfos
}
function dateValidation(e, data) {
  var dataInfos = data;
  dataInfos["date"] = mDATE(e.target.value, dataInfos.date)
  if (e.target.value.length === 7)
    dataInfos["dateState"] = "has-success";
  else
    dataInfos["dateState"] = "has-danger";
  return dataInfos
}
function mCNPJ(cnpj) {
  cnpj = cnpj.replace(/\D/g, "")
  cnpj = cnpj.replace(/^(\d{2})(\d)/, "$1.$2")
  cnpj = cnpj.replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3")
  cnpj = cnpj.replace(/\.(\d{3})(\d)/, ".$1/$2")
  cnpj = cnpj.replace(/(\d{4})(\d)/, "$1-$2")
  return cnpj
}
function mCPF(cpf) {
  cpf = cpf.replace(/\D/g, "")
  cpf = cpf.replace(/(\d{3})(\d)/, "$1.$2")
  cpf = cpf.replace(/(\d{3})(\d)/, "$1.$2")
  cpf = cpf.replace(/(\d{3})(\d{1,2})$/, "$1-$2")
  return cpf
}
function mCARD(cardNumber, cardNumberAnt) {
  if((cardNumber.length === 4 || cardNumber.length === 9 || cardNumber.length === 14) && cardNumber.length > cardNumberAnt.length)
    return cardNumber+'\xa0'
  return cardNumber
}
function mCEP(cep) {
  cep = cep.replace(/\D/g, "")
  cep = cep.replace(/^(\d{5})(\d)/, "$1-$2")
  cep = cep.replace(/\.(\d{3})(\d)/, "$1-$2")
  return cep
}
function mDATE(date, dateAnt) {
  if((date.length === 2) && date.length > dateAnt.length)
    return date+'/'
  return date
}

export default {
  emailValidation,
  userValidation,
  typeValidation,
  passwordValidation,
  confirmPasswordValidation,
  nameValidation,
  cnpjValidation,
  addressValidation,
  cepValidation,
  ufValidation,
  cityValidation,
  countryValidation,
  cnaeValidation,
  cardCodValidation,
  cardNumberValidation,
  cpfValidation,
  descriptionValidation,
  dateValidation
}