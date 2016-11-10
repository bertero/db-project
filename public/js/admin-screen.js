/*
** Functions declarations.
*/
function showDiv(divName) {
	switch (divName) {
		case "queryForm":
			$('#query_form_div').show();
			$('#query_view_div').hide();
			$('#add_form_div').hide();
			$('#add_result_div').hide();
			break;

		case "queryView":
			$('#query_view_div').show();
			$('#query_form_div').hide();
			$('#add_form_div').hide();
			$('#add_result_div').hide();
			break;

		case "addForm":
			$('#add_form_div').show();
			$('#query_form_div').hide();
			$('#query_view_div').hide();
			$('#add_result_div').hide();
			break;

		case "addResult":
			$('#add_result_div').show();
			$('#query_form_div').hide();
			$('#query_view_div').hide();
			$('#add_form_div').hide();
			break;
	}
}

function showForm (type, formName) {
	console.log(type)
	console.log(formName)
	switch (formName) {
		case "clientes":
			$('#' + type +'_form_clientes_div').show();
			$('#' + type +'_form_filiais_div').hide();
			$('#' + type +'_form_funcionarios_div').hide();
			$('#' + type +'_form_pedidos_div').hide();
			$('#' + type +'_form_produtos_div').hide();
			break;

		case "filiais":
			$('#' + type +'_form_clientes_div').hide();
			$('#' + type +'_form_filiais_div').show();
			$('#' + type +'_form_funcionarios_div').hide();
			$('#' + type +'_form_pedidos_div').hide();
			$('#' + type +'_form_produtos_div').hide();
			break;

		case "funcionarios":
			$('#' + type +'_form_clientes_div').hide();
			$('#' + type +'_form_filiais_div').hide();
			$('#' + type +'_form_funcionarios_div').show();
			$('#' + type +'_form_pedidos_div').hide();
			$('#' + type +'_form_produtos_div').hide();
			break;

		case "pedidos":
			$('#' + type +'_form_clientes_div').hide();
			$('#' + type +'_form_filiais_div').hide();
			$('#' + type +'_form_funcionarios_div').hide();
			$('#' + type +'_form_pedidos_div').show();
			$('#' + type +'_form_produtos_div').hide();
			break;

		case "produtos":
			$('#' + type +'_form_clientes_div').hide();
			$('#' + type +'_form_filiais_div').hide();
			$('#' + type +'_form_funcionarios_div').hide();
			$('#' + type +'_form_pedidos_div').hide();
			$('#' + type +'_form_produtos_div').show();
			break;
	}
}

function postViewForm (buttonInfo) {
	console.log(buttonInfo.target.value)
	// const data = $('#').serializeArray().reduce(function(obj, item) {
	//     obj[item.name] = item.value;
	//     return obj;
	// }, {});
}

function postCreateForm (buttonInfo) {
	console.log(buttonInfo.target.value)
	// const data = $('#').serializeArray().reduce(function(obj, item) {
	//     obj[item.name] = item.value;
	//     return obj;
	// }, {});
}

/*
** Functions calls only after page is loaded.
*/
$(document).on('ready', function () {
		$('#view_button_div').on('click', showDiv.bind(null, 'queryForm'))
		$('#add_button_div').on('click', showDiv.bind(null, 'addForm'))

		$('#view_form_type_selector').change(function () {
			showForm('view', $('#view_form_type_selector option:selected').val())
		})
		$('#create_form_type_selector').change(function () {
			showForm('create', $('#create_form_type_selector option:selected').val())
		})

		$('.view_form_submit').on('click', postViewForm.bind(this))
		$('.create_form_submit').on('click', postCreateForm.bind(this))

	})