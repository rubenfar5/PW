//quando inicia a página faz
window.onload = function () {
    //chama a função para atualizar a lista de operacionais

    verOperacionais();
    //adicionar função de validação ao formulário

    nomeUser.innerText = localStorage.User;

    //REFRESH DA TABELA    
    function verOperacionais() {
        fetch('http://127.0.0.1:3000/operationalTable/', {
            headers: { 'Content-Type': 'application/json' },
            method: 'GET',
        })
            .then(res => res.json())
            .then((out) => {
                let operacionais = out
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
                    data: operacionais,
                    columns: [
                        { data: 'id_operacional', title: 'ID' },
                        { data: 'username', title: 'Username' },
                        { data: 'nome', title: 'Nome' },
                        { data: 'email_utilizador', title: 'Email' },
                        { data: 'disponibilidade', title: 'Disponibilidade' },
                    ],
                    columnDefs: [
                        {"className": "dt-center", "targets": "_all"}
                      ],
                });


                var table = $('#dataTable').DataTable();
                let id;
                let username_pk;
                //selecionar linha e marcar a mesma
                $('#dataTable').on('click', 'tr', function () {
                    let index = table.row(this).index();
                    id = operacionais[index].id_operacional;
                    username_pk = operacionais[index].username;
                    if ($(this).hasClass('selected')) {
                        $(this).removeClass('selected');
                    }
                    else {
                        table.$('tr.selected').removeClass('selected');
                        $(this).addClass('selected');
                    }
                });

                $('#btnconfirmar').click(function () {
                    textoconfirmacao.innerText = 'Selecione "Eliminar" se desejar realmente eliminar o operacional ' + id;
                });

                $('#submeterOperacional').click(function () {
                    let nome = document.getElementById("uname").value;
                    let username = document.getElementById("username").value;
                    let email = document.getElementById("emailOperacional").value;

                    if (nome == "") {
                        swal.fire("Preencha o campo com o nome!");
                        formNewOperacional.nome.focus();
                        return false;
                    }
                    if (nome.length < 2) {
                        swal.fire("Insira um nome completo!");
                        formNewOperacional.nome.focus();
                        return false;
                    }

                    if (username == "") {
                        swal.fire("Preencha o campo com um username correto !");
                        formNewOperacional.username.focus();
                        return false;
                    }
                    if (username.length < 5 || username.length >15) {
                        swal.fire("O username deverá ter entre 5 a 15 caracteres!");
                        formNewOperacional.username.focus();
                        return false;
                    }

                    var filter = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
                    if (!filter.test(email)) {
                        swal.fire('Por favor, digite o email corretamente');
                        document.getElementById("email").focus();
                        return false;
                    }


                    else {

                        var data = {};
                        data.nome = document.getElementById("uname").value;
                        data.username = document.getElementById("username").value;
                        data.email_utilizador = document.getElementById("emailOperacional").value;

                        console.log(data); //debugging para ver os dados que foram enviados
                        //chamada fetch para envio dos dados para o servior via POST
                        fetch('http://127.0.0.1:3000/users/', {
                            headers: { 'Content-Type': 'application/json' },
                            method: 'POST',
                            body: JSON.stringify(data)
                        })
                            .then(res => res.json())
                            .then((out) => {
                        
                           if (out.msg == "Inserido com sucesso") {
                            //completar
                            swal.fire({
                                icon: "success",
                                title: "Sucesso",
                                text: out.msg
                            }).then(function () {
                                window.location.href = "./TabelOperacionais.html";
                            })
                        }
                        else{
                            swal.fire({
                                icon: "error",
                                title: "Erro",
                                text: out.msg
                            })
                        }

                            })
                            .catch(error => {
                                console.log(error);
                            });
                    }

                })



                //abrir menu com dados para a alteração
                $('#toogle2').click(function () {
                    if (id == null) {
                        swal.fire({
                            icon: "error",
                            title: "Erro",
                            text: "Esta função só é permitida depois de selecionar um operacional"
                        })
                        .then(function () {
                            window.location.href = "./TabelOperacionais.html";
                        })
                    }
                    else {
                    let operacional = "";

                    fetch('http://127.0.0.1:3000/operationalDados/' + username_pk, {
                        headers: { 'Content-Type': 'application/json' },
                        method: 'GET',
                    })
                        .then(res => res.json())
                        .then((out) => {

                            operacional = out;

                            document.getElementById("username_alterar").value = operacional.username;
                            document.getElementById("nome_alterar").value = operacional.nome;
                            document.getElementById("disponibilidade_alterar").value = operacional.disponibilidade;

                        })
                        .catch(error => {
                            console.log(error);
                        });
                    }
                });

                //alterar disponibilidade
                $('#submeterAlteracao').click(function () {
                    let id_disponivel = id;
                    var data = {};
                    data.disponibilidade = document.getElementById("disponibilidade_alterar").value;
                    console.log(data);
                    fetch('http://127.0.0.1:3000/operational/' + id_disponivel, {
                        headers: { 'Content-Type': 'application/json' },
                        method: 'PUT',
                        body: JSON.stringify(data)
                    })
                        .then(res => res.json())
                        .then((out) => {
                            swal.fire({
                                icon: "success",
                                title: "Sucesso",
                                text: "Disponibilidade alterada com sucesso"
                            }).then(function () {
                                window.location.href = "./TabelOperacionais.html";
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

};