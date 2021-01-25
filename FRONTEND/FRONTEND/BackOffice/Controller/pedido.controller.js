//quando inicia a página faz
//var validator = require('validator');

window.onload = function () {
    //chama a função para atualizar a lista de pedidos
    verPedidos();

    //função para carregar a combo box dos serviços
    cbmBoxServiços();
    cbmBoxEntidades();

    nomeUser.innerText = localStorage.User;

    function cbmBoxEntidades() {
        fetch('http://127.0.0.1:3000/entities/', {
            headers: { 'Content-Type': 'application/json' },
            method: 'GET',
        })
            .then(res => res.json())
            .then((out) => {
                let entidades = out;
                let tamanho = entidades.length;

                let cbmbox = "";
                for (let i = 0; i < tamanho; i++) {
                    let id_entidade = entidades[i].id_entidade;
                    let entidade = entidades[i].entidade;
                    cbmbox = cbmbox + "<option value=" + id_entidade + ">" + entidade + "</option>";
                }
                document.getElementById('id_entidade').innerHTML = cbmbox;
            })
            .catch(error => {
                console.log(error);
            });
    }


    function cbmBoxServiços() {
        fetch('http://127.0.0.1:3000/servicesCmbBox/', {
            headers: { 'Content-Type': 'application/json' },
            method: 'GET',
        })
            .then(res => res.json())
            .then((out) => {
                let servicos = out;
                let tamanho = servicos.length;

                let cbmbox = "";
                for (let i = 0; i < tamanho; i++) {
                    let id_servico = servicos[i].id_servico;
                    let descricao = servicos[i].descricao_tipo_servico;
                    cbmbox = cbmbox + "<option value=" + id_servico + ">" + descricao + "</option>";
                }
                document.getElementById('cbmBoxServiços').innerHTML = cbmbox;
            })
            .catch(error => {
                console.log(error);
            });
    }
}
//REFRESH DA TABELA    
function verPedidos() {
    fetch('http://127.0.0.1:3000/solicitationsTabel/', {
        headers: { 'Content-Type': 'application/json' },
        method: 'GET',
    })
        .then(res => res.json())
        .then((out) => {
            let pedidos = out
            $('#dataTable').DataTable({
                language: {
                    "sEmptyTable": "Não foi encontrado nenhum registo",
                    "sLoadingRecords": "A carregar...",
                    "sProcessing": "A processar...",
                    "sLengthMenu": "Mostrar _MENU_ registos",
                    "sZeroRecords": "Não foram encontrados resultados",
                    "sInfo": "Mostrando de _START_ até _END_ de _TOTAL_ registos",
                    "sInfoEmpty": "Mostrando de 0 até 0 de 0 registos",
                    "sInfoFiltered": "(filtrado de _MAX_ registos no total)",
                    "sInfoPostFix": "",
                    "sSearch": "Procurar:",
                    "sUrl": "",
                    "oPaginate": {
                        "sFirst": "Primeiro",
                        "sPrevious": "Anterior",
                        "sNext": "Seguinte",
                        "sLast": "Último"
                    },
                    oAria: {
                        "sSortAscending": ": Ordenar colunas de forma ascendente",
                        "sSortDescending": ": Ordenar colunas de forma descendente"
                    }
                },
                data: pedidos,
                columns: [
                    { data: 'id_pedido', title: 'ID' },
                    { data: 'nome', title: 'Autor' },
                    { data: 'entidade', title: 'Entidade' },
                    { data: 'distrito', title: 'Distrito' },
                    { data: 'via', title: 'Via' },
                    { data: 'email', title: 'Contacto' },
                    { data: 'lesados', title: 'Lesados' },
                    { data: 'descricao_tipo_pedido', title: 'Tipo pedido' },
                    { data: 'descricao_subtipo', title: 'Subtipo pedido' },
                    { data: 'descricao_tipologia_pedido', title: 'Tipologia pedido' },
                    { data: 'descricao_pedido', title: 'Descrição' },
                    { data: 'dataFormatada', title: 'Data' }

                ],
                lengthMenu: [[5, 10, 25, 50, -1], [5, 10, 25, 50, "TODOS"]],

                /*falso urgente ordinario necessita verificação*/
                rowCallback: function(row, data, index) {
                    var cellValue = data["descricao_tipologia_pedido"];
                    if (cellValue=="Falso") {
                    $("td:eq(9)",row).addClass("badge-warning badge-pil badge");
                    }
                    if (cellValue=="Urgente") {
                    $("td:eq(9)",row).addClass("badge-1 badge-pil badge");
                    }
                    if (cellValue=="Ordinário") {
                    $("td:eq(9)",row).addClass("badge-4 badge-pil badge");
                    }
                    if (cellValue=="Necessita verificação") {
                    $("td:eq(9)",row).addClass("badge-2 badge-pil badge");
                    }
                },
                columnDefs: [
                    {"className": "dt-center", "targets": "_all"}
                  ],
            });


            var table = $('#dataTable').DataTable();
            let id;
            let tipo = "";
            let tipologia = "";
            let linha = "";
            //selecionar linha e marcar a mesma
            $('#dataTable').on('click', 'tr', function () {
                let index = table.row(this).index();
                linha = pedidos[index];
                id = pedidos[index].id_pedido;
                tipo = pedidos[index].descricao_tipo_pedido;
                tipologia = pedidos[index].descricao_tipologia_pedido;
                console.log(tipo);
                console.log(tipologia);

                if ($(this).hasClass('selected')) {
                    $(this).removeClass('selected');
                }
                else {
                    table.$('tr.selected').removeClass('selected');
                    $(this).addClass('selected');
                }
            });



            $('#btnsubmeter').click(function () {
                let nome = document.getElementById("nome").value;
                let id_entidade = document.getElementById("id_entidade").value;
                let distrito = document.getElementById("district").value;
                let concelho = document.getElementById("locations").value;
                let morada = document.getElementById("morada").value;
                let email = document.getElementById("email").value;
                //  let telemovel = document.getElementById("telemovel").value;
                let lesados = document.getElementById("lesados").value;
                let descricao_pedido = document.getElementById("descricao_pedido").value;
                let via = document.getElementById("via").value;


                if (nome == "") {
                    swal.fire("Preencha o campo com o nome!");
                    formNewPedidoAjuda.nome.focus();
                    return false;
                }
                if (nome.length < 2) {
                    swal.fire("Insira um nome completo!");
                    formNewPedidoAjuda.nome.focus();
                    return false;
                }

                if (id_entidade == "") {
                    swal.fire("Preencha o campo com o id da entidade!");
                    formNewPedidoAjuda.id_entidade.focus();
                    return false;
                }
                if (id_entidade.value < 1) {
                    swal.fire("Insira um id da entidade válido!");
                    formNewPedidoAjuda.id_entidade.focus();
                    return false;
                }

                if (distrito == "") {
                    swal.fire("Preencha o campo do distrito!");
                    formNewPedidoAjuda.distrito.focus();
                    return false;
                }
                if (morada == "") {
                    swal.fire("Preencha o campo com a morada!");
                    formNewPedidoAjuda.morada.focus();
                    return false;
                }
                if (morada.length < 5) {
                    swal.fire("Insira a morada completa!");
                    formNewPedidoAjuda.morada.focus();
                    return false;
                }

                if (via == "Email") {


                    var filter = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
                    if (!filter.test(email)) {
                        swal.fire('Digite o email corretamente');
                        document.getElementById("email").focus();
                        return false;

                    }
                } else {
                    var filter = /^9[1236]{1}[0-9]{7}$/;
                    if (!filter.test(email)) {
                        swal.fire('Digite o número de telefone corretamente');
                        document.getElementById("email").focus();
                        return false;
                    }
                }

                if (lesados == "") {
                    swal.fire("Preencha o campo com o número de envolvidos!");
                    formNewPedidoAjuda.lesados.focus();
                    return false;
                }

                if (lesados <= 0) {
                    swal.fire("Insira um número de envolvidos válido!");
                    formNewPedidoAjuda.lesados.focus();
                    return false;
                }
                if (descricao_pedido == "") {
                    swal.fire("Preecha o campo com a descrição!");
                    formNewPedidoAjuda.descricao_pedido.focus();
                    return false;
                }
                if (descricao_pedido.length < 10) {
                    swal.fire("Insira uma descrição completa!");
                    formNewPedidoAjuda.descricao_pedido.focus();
                    return false;
                }
                else {
                    //return true;
                    //função de registar
                    var data = {};
                    data.via = document.getElementById("via").value;
                    data.nome = document.getElementById("nome").value;
                    data.descricao_pedido = document.getElementById("descricao_pedido").value;
                    data.id_subtipo_pedido = document.getElementById("id_subtipo_pedido").value;
                    data.lesados = document.getElementById("lesados").value;
                    data.id_entidade = document.getElementById("id_entidade").value;
                    data.email = document.getElementById("email").value;
                    data.morada = document.getElementById("morada").value;
                    data.distrito = document.getElementById("district").value;
                    data.concelho = document.getElementById("locations").value;
                    console.log(data); //debugging para ver os dados que foram enviados
                    //chamada fetch para envio dos dados para o servior via POST
                    fetch('http://127.0.0.1:3000/solicitations/', {
                        headers: { 'Content-Type': 'application/json' },
                        method: 'POST',
                        body: JSON.stringify(data)
                    })
                        .then(res => res.json())
                        .then((out) => {
                            console.log(out);
                            //completar
                            swal.fire({
                                icon: "success",
                                title: "Sucesso",
                                text: out.message.pt
                            }).then(function () {
                                window.location.href = "./TabelPedidosAjuda.html";
                            })

                        })
                        .catch(error => {
                            console.log(error);
                        })

                }
            });

            $('#btnconfirmar').click(function () {
                if (id == null) {
                    swal.fire({
                        icon: "error",
                        title: "Erro",
                        text: "Esta função só é permitida depois de selecionar um pedido"
                    })
                        .then(function () {
                            window.location.href = "./TabelPedidosAjuda.html";
                        })
                }
                else {
                    swal.fire({
                        icon: "warning",
                        title: "Eliminar",
                        text: "Deseja eliminar o pedido: " + id + " ?",
                        showCancelButton: true,
                        confirmButtonText: 'Sim, eliminar!',
                        cancelButtonText: "Cancelar",
                        showLoaderOnConfirm: true,
                        preConfirm: () => {
                            fetch('http://127.0.0.1:3000/solicitations/' + id, {
                                headers: { 'Content-Type': 'application/json' },
                                method: 'DELETE',
                            })
                                .then(res => res.json())
                                .then((out) => {
                                    console.log(out);
                                    //completar
                                    swal.fire({
                                        icon: "success",
                                        title: "Sucesso",
                                        text: out.message.pt
                                    }).then(function () {
                                        window.location.href = "./TabelPedidosAjuda.html";
                                    })

                                })
                                .catch(error => {
                                    console.log(error);
                                });
                        },
                        allowOutsideClick: () => !swal.isLoading()
                    })
                }
            });

            let pedido = "";
            let morada = "";
            let concelho = "";
            let distrito = "";

            $('#toogle2').click(function () {
                if (id == null) {
                    swal.fire({
                        icon: "error",
                        title: "Erro",
                        text: "Esta função só é permitida depois de selecionar um pedido"
                    })
                        .then(function () {
                            window.location.href = "./TabelPedidosAjuda.html";
                        })
                }
                else {
                let editar = id;
                fetch('http://127.0.0.1:3000/solicitationsIdLocal/' + editar, {
                    headers: { 'Content-Type': 'application/json' },
                    method: 'GET',
                })
                    .then(res => res.json())
                    .then((out) => {
                        let pedido = out;
                        console.log(pedido);
                        morada = pedido.morada;
                        concelho = pedido.concelho;
                        distrito = pedido.distrito;
                    })
                    .catch(error => {
                        console.log(error);
                    });


                fetch('http://127.0.0.1:3000/solicitations/' + editar, {
                    headers: { 'Content-Type': 'application/json' },
                    method: 'GET',
                })
                    .then(res => res.json())
                    .then((out) => {

                        pedido = out;

                        document.getElementById("nome_alterar").value = pedido.nome;
                        document.getElementById("id_entidade_alterar").value = linha.entidade;
                        document.getElementById("distrito_alterar").value = distrito;
                        document.getElementById("concelho_alterar").value = concelho;
                        document.getElementById("morada_alterar").value = morada;
                        document.getElementById("via_alterar").value = pedido.via;
                        document.getElementById("email_alterar").value = pedido.email;
                        document.getElementById("id_subtipo_pedido_alterar").value = pedido.id_subtipo_pedido;
                        document.getElementById("lesados_alterar").value = pedido.lesados;
                        document.getElementById("descricao_pedido_alterar").value = pedido.descricao_pedido;
                    })
                    .catch(error => {
                        //alert("Erro ao carregar dados do pedido");
                        console.log(error);
                    });
                }
            });

            $('#btnalterar').click(function () {
                let nome = document.getElementById("nome_alterar").value;
                let lesados = document.getElementById("lesados_alterar").value;

                if (nome == "") {
                    swal.fire("Preencha o campo com o nome!");
                    formNewPedidoAjuda.nome.focus();
                    return false;
                }
                if (nome.length < 2) {
                    swal.fire("Insira um nome completo!");
                    formNewPedidoAjuda.nome.focus();
                    return false;
                }

                if (lesados == "") {
                    swal.fire("Preencha o campo com o número de envolvidos!");
                    formNewPedidoAjuda.lesados.focus();
                    return false;
                }

                if (lesados <= 0) {
                    swal.fire("Insira um número de envolvidos válido!");
                    formNewPedidoAjuda.lesados.focus();
                    return false;
                }
                else {
                    let editar = id;
                    var data = {};
                    data.nome = document.getElementById("nome_alterar").value;
                    data.id_subtipo_pedido = document.getElementById("id_subtipo_pedido_alterar").value;
                    data.lesados = document.getElementById("lesados_alterar").value;
                    console.log(data);
                    fetch('http://127.0.0.1:3000/solicitations/' + editar, {
                        headers: { 'Content-Type': 'application/json' },
                        method: 'PUT',
                        body: JSON.stringify(data),
                    })
                        .then(res => res.json())
                        .then((out) => {
                            console.log(out);
                            //completar
                            swal.fire({
                                icon: "success",
                                title: "Sucesso",
                                text: out.message.pt
                            }).then(function () {
                                window.location.href = "./TabelPedidosAjuda.html";
                            })

                        })
                        .catch(error => {
                            console.log(error);
                        })
                }
            })

            $('#toogle5').click(function () {
                if (id == null) {
                    swal.fire({
                        icon: "error",
                        title: "Erro",
                        text: "Esta função só é permitida depois de selecionar um pedido"
                    })
                        .then(function () {
                            window.location.href = "./TabelPedidosAjuda.html";
                        })
                } else
                if (tipo == "Em espera") {
                    swal.fire({
                        icon: "error",
                        title: "Erro",
                        text: "É impossível converter um pedido que ainda não tenha sido validado"
                    })
                        .then(function () {
                            window.location.href = "./TabelPedidosAjuda.html";
                        })
                } else
                if (tipologia == "Necessita verificação") {
                    swal.fire({
                        icon: "error",
                        title: "Erro",
                        text: "É impossível converter um pedido que ainda não tenha sido validado"
                    })
                        .then(function () {
                            window.location.href = "./TabelPedidosAjuda.html";
                        })
                } else
                if (tipologia == "Falso") {
                    swal.fire({
                        icon: "error",
                        title: "Erro",
                        text: "É impossível converter um pedido que tenha sido validado como falso"
                    })
                        .then(function () {
                            window.location.href = "./TabelPedidosAjuda.html";
                        })
                }
            })

            $('#btnconverter').click(function () {
                    let id_converter = id;
                    console.log(id_converter);
                    var data = {};
                    data.id_nivel = document.getElementById("grauOcorrencia").value;
                    data.id_servico = document.getElementById("cbmBoxServiços").value;
                    console.log(data);
                    //animação
                    fetch('http://127.0.0.1:3000/solicitations/' + id_converter + '/convert/', {
                        headers: { 'Content-Type': 'application/json' },
                        method: 'POST',
                        body: JSON.stringify(data)
                    }).then(res => res.json())
                        //fim da animação
                        .then((out) => {
                            console.log(out);
                            swal.fire({
                                icon: "success",
                                title: "Sucesso",
                                text: out.message.pt
                            }).then(function () {
                                window.location.href = "./TabelPedidosAjuda.html";
                            })
                        })
                        .catch(error => {
                            console.log(error);
                        });
            });

            $('#toogle4').click(function () {
                if (id == null) {
                    swal.fire({
                        icon: "error",
                        title: "Erro",
                        text: "Esta função só é permitida depois de selecionar um pedido"
                    })
                        .then(function () {
                            window.location.href = "./TabelPedidosAjuda.html";
                        })
                } else
                if (tipologia != "Necessita verificação") {
                    swal.fire({
                        icon: "error",
                        title: "Erro",
                        text: "Este pedido já foi validado"
                    })
                        .then(function () {
                            window.location.href = "./TabelPedidosAjuda.html";
                        })
                }
            })

            $('#btnvalidar').click(function () {
                    id_validar = id;
                    console.log(id_validar);
                    var data = {};
                    data.id_tipologia_pedido = document.getElementById("tipologia_pedido_validar").value;
                    fetch('http://127.0.0.1:3000/solicitations/' + id_validar + '/validate/', {
                        headers: { 'Content-Type': 'application/json' },
                        method: 'PUT',
                        body: JSON.stringify(data)
                    })
                        .then(res => res.json())
                        .then((out) => {
                            console.log(out);
                            swal.fire({
                                icon: "success",
                                title: "Sucesso",
                                text: out.message.pt
                            }).then(function () {
                                window.location.href = "./TabelPedidosAjuda.html";
                            })
                        })
                        .catch(error => {
                            console.log(error);
                        });
            });
        })
        .catch(error => {
            console.log(error);
        });
};
