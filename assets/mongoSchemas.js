const mongoose = require('mongoose')
const ObjectId = mongoose.Schema.Types.ObjectId

module.exports = {
	clientes : new mongoose.Schema({
    nome       : String,
    endereco   : String,
    created_at : Date,
    telefone   : String,
    email      : String,
    cnpj       : String
	}),

	filiais : new mongoose.Schema({
    nome           : String,
    cidadeBase     : String,
    endereco       : String,
    created_at     : Date,
    telefone       : String,
    responsavel_id : { type : ObjectId, ref : 'funcionarios' }
	}),

	funcionarios : new mongoose.Schema({
    nome            : String,
    endereco        : String,
    created_at      : Date,
    telefone        : String,
    email           : String,
    rg              : String,
    cpf             : String,
    data_nascimento : String,
    senha           : String
	}),

	pedidos : new mongoose.Schema({
    lista_produtos : {},
    created_at     : Date,
    status         : String,
    filial_id      : { type : ObjectId, ref : 'filiais' },
    funcionario_id : { type : ObjectId, ref : 'funcionarios' },
    cliente_id     : { type : ObjectId, ref : 'clients' },
	}),

	produtos : new mongoose.Schema({
    nome       : String,
    tamanho    : String,
    created_at : Date,
    material   : String,
    preco      : Number
	})
}