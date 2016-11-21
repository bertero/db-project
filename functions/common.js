const strftime = require('strftime')
const u        = require('underscore')

module.exports = {
  log                       : log,
  keepAwake                 : keepAwake,
  listenToUncaughtException : listenToUncaughtException,
  filter                    : filterJson,
}

function log (message, details) {
  var fileNameLineNumber = ""
  var dateTime = strftime("%Y-%m-%d %H:%M:%S:%L") + ' -'
  if(!details){
    var stacklist = (new Error()).stack.split('\n')
    var parseError = stacklist[2].split('/')
    fileNameLineNumber = parseError[parseError.length - 1] + " -"
  }
  if(typeof message == 'string'){
    console.log(dateTime, fileNameLineNumber, message)
  }
  else{
    console.log(dateTime, fileNameLineNumber)
    console.log(message)
  }
  return dateTime + fileNameLineNumber + "\n" + JSON.stringify(message)
}

function keepAwake (){
  log('keepAwake job!')
}

function listenToUncaughtException() {
  process.on('uncaught exception', function(err){
      log(err)
      process.exit(1);
  })
}

function filterJson (json) {
  var newJson = {}
  u.each(json, function (value, key) {
    if (value || value === false) newJson[key] = value
  })
  return newJson
}

function createMongoJson(body) {
  var query = {}
  switch (body.viewType) {
    case 'clientes':
      query = {
        _id          : body.id,
        nome_contato : body.nomeContato,
        nome_empresa : body.nomeEmpresa,
        email        : body.email,
        cnpj         : body.cnpj,
        endereco     : body.endereco,
        telefone     : body.telefone
      }
      break

    case 'filiais':
      query = {
        _id            : body.id,
        nome           : body.nome,
        cidade_base    : body.cidadeBase,
        endereco       : body.endereco,
        telefone       : body.telefone,
        responsavel_id : body.responsavelId
      }
      break

    case 'funcionarios':
      query = {
        _id             : body.id,
        nome            : body.nome,
        email           : body.email,
        rg              : body.rg,
        cpf             : body.cpf,
        endereco        : body.endereco,
        telefone        : body.telefone,
        data_nascimento : body.dataNasc,
        senha           : body.senha
      }
      break

    case 'pedidos':
      query = {
        _id            : body.id,
        lista_produtos : createProductsList(body),
        filial_id      : body.filialId,
        funcionario_id : body.funcionarioId,
        cliente_id     : body.clienteId
      }
      break

    case 'produtos':
      query = {
        _id      : body.id,
        nome     : body.nome,
        tamanho  : body.tamanho,
        material : body.material,
        preco    : body.preco
      }
      break
  }
  return u.compact(query)
}

function createProductsList(body) {
  var list = {}
  for (var index = 0; index < 10; index++) {
    if (body['produto_' + index]) list[body['produto_' + index]] = body['quantidade_' + index]
  }
  return list
}