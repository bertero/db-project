const mongoose        = require('mongoose')
const commonFunctions = require('./common.js')
const log             = commonFunctions.log
const u               = require('underscore')
const schemas         = require('../assets/mongoSchemas')
const ObjectId        = mongoose.Schema.Types.ObjectId
const async           = require('async')

var uri = 'mongodb://<dbuser>:<dbpassword>@ds023714.mlab.com:23714/main_first'
uri     = uri.replace('<dbuser>',     process.env.MONGO_MAIN_USER)
uri     = uri.replace('<dbpassword>', process.env.MONGO_MAIN_PASSWORD)

var db          = mongoose.createConnection(uri)

module.exports = {
	connect       : connect,
	collections   : {},
	persistNew    : persistNewDoc,
	persistUpdate : persistUpdatedDoc,
	find          : findDoc,
	createJson    : createMongoJson
}

function connect(callback) {

	db.on('error', console.error.bind(console, 'connection error:'))

	db.once('open', function () {
	  
	  u.each(schemas, function (schema, collection) {

	  	module.exports.collections[collection] = db.model(collection, schema)

	  })

	  log("MongoDB Connected")
	  callback()

	})

}

function persistNewDoc(collection, data, callback) {

	data.created_at = new Date()

	const docToBePersisted = new module.exports.collections[collection](data)

	docToBePersisted.save(callback)

}

function persistUpdatedDoc(collection, id, data, callback) {

	module.exports.collections[collection].update({ _id : id }, data).exec(callback)

}

function findDoc(collection, query, infoRequested, callback) {

	log(query)

	if (!query)         query         = {}
	if (!infoRequested) infoRequested = {}

	module.exports.collections[collection]
		.find(query, infoRequested)
		.lean(true)
		.exec(callback)
}

function createMongoJson(body, isCreate, callback) {
  var query = {}
  var shouldReplaceIds = false
  const collection = body.viewType
  switch (collection) {
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
        _id               : body.id,
        nome              : body.nome,
        cidade_base       : body.cidadeBase,
        endereco          : body.endereco,
        telefone          : body.telefone,
        email_funcionario : body.emailFuncionario,
        responsavel_id    : ''
      }
      if (isCreate) shouldReplaceIds = true
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
        _id               : body.id,
        lista_produtos    : createProductsList(body),
        cidade_base       : body.cidadeBase,
        filial_id         : '',
        email_funcionario : body.emailFuncionario,
        funcionario_id    : '',
        email_cliente     : body.emailCliente,
        cliente_id        : ''
      }
      if (isCreate) shouldReplaceIds = true
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

  log('collection: ' + collection)
  log('shouldReplaceIds: ' + shouldReplaceIds)

  async.parallel({
    filiais : function (cb1) {
      if (!shouldReplaceIds || collection !== 'pedidos') return cb1()
      findDoc('filiais', { cidade_base : query.cidade_base }, { _id : 1}, function(err, filial) {
        if (err || !filial.length) return cb1(err || new Error('filiais query returned empty'))
        cb1(null, filial[0]._id)
      })
    },
    funcionarios : function (cb2) {
      if (!shouldReplaceIds || (collection !== 'pedidos' && collection !== 'filiais' )) return cb2()
      findDoc('funcionarios', { email : query.email_funcionario }, { _id : 1}, function(err, funcionario) {
        if (err || !funcionario.length) return cb2(err || new Error('funcionarios query returned empty'))
        cb2(null, funcionario[0]._id)
      })
    },
    clientes : function (cb3) {
      if (!shouldReplaceIds || collection !== 'pedidos') return cb3()
      findDoc('clientes', { email : query.email_cliente }, { _id : 1}, function(err, cliente) {
        if (err || !cliente.length) return cb3(err || new Error('clientes query returned empty'))
        cb3(null, cliente[0]._id)
      })
    }
  }, function (err, results) {
    if (err) return callback(err)
    if (shouldReplaceIds) {
      if (collection === 'filiais') query.responsavel_id = results.funcionarios
      else {
        query.filial_id      = results.filiais
        query.funcionario_id = results.funcionarios
        query.cliente_id     = results.clientes
      }
    }
    log('query -------------------')
    log(JSON.parse(JSON.stringify(query, null, 2)))
    callback(null, JSON.parse(JSON.stringify(u.compact(query), null, 2)))
  })
}

function createProductsList(body) {
  var list = {}
  for (var index = 0; index < 10; index++) {
    if (body['produto_' + index]) list[body['produto_' + index]] = body['quantidade_' + index]
  }
	log('items list')
	log(list)
  return list
}