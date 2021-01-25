
window.onload = function () {
    //chama a função para atualizar a lista de pedidos
    verEntidades();
    
    nomeUser.innerText = localStorage.User;
}
    //REFRESH DA TABELA    
    function verEntidades() {
        fetch('http://127.0.0.1:3000/entitiesTable/', {
            headers: { 'Content-Type': 'application/json' },
            method: 'GET',
        })
            .then(res => res.json())
            .then((out) => {
                let entidades = out
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
                    data: entidades,
                    columns: [
                        { data: 'id_entidade', title: 'ID' },
                        { data: 'entidade', title: 'Nome' },
                        { data: 'distrito', title: 'Distrito' },
                        { data: 'concelho', title: 'Concelho' },
                        { data: 'morada', title: 'Morada' },
                        { data: 'tipo', title: 'Tipo' }     
                    ],
                    columnDefs: [
                        {"className": "dt-center", "targets": "_all"}
                      ],
                });


                var table = $('#dataTable').DataTable();
                let id;
                let id_local = ""
                //selecionar linha e marcar a mesma
                $('#dataTable').on('click', 'tr', function () {
                    let index = table.row(this).index();
                    id = entidades[index].id_entidade;
                    id_local = entidades[index].id_local;

                    if ($(this).hasClass('selected')) {
                        $(this).removeClass('selected');
                    }
                    else {
                        table.$('tr.selected').removeClass('selected');
                        $(this).addClass('selected');
                    }
                });

                $('#submeterEntidade').click(function () {
                    let nome = document.getElementById("nome").value;
                    let distrito = document.getElementById("district").value;
                    let morada = document.getElementById("morada_registar").value;
                   
            
                    if (nome == "") {
                        swal.fire("Preencha o campo com o nome!");
                      //formNewEntidade.nome.focus();
                      return false;
                    }
                    if (nome.length < 2) {
                        swal.fire("Insira um nome completo!");
                      //formNewEntidade.nome.focus();
                      return false;
                    }
            
                    if (distrito == "---") {
                        swal.fire("Selecione um distrito!");
                        //formNewEntidade.distrito.focus();
                        return false;
                    }
            
                    if (morada == "") {
                        swal.fire("Preencha o campo com a morada!");
                        //formNewEntidade.morada.focus();
                        return false;
                    }
                    if (morada.length < 5) {
                        swal.fire("Insira a morada completa!");
                        //formNewEntidade.morada.focus();
                        return false;
                    }
            
                  
            
                  else {
                    //return true;
                    //função de registar
                    var data = {};
                    data.entidade = document.getElementById("nome").value;
                    data.distrito = document.getElementById("district").value;
                    data.concelho = document.getElementById("locations").value;
                    data.morada = document.getElementById("morada_registar").value;
                    data.tipo = document.getElementById("tipo").value;
                    console.log(data); //debugging para ver os dados que foram enviados
                    //chamada fetch para envio dos dados para o servior via POST
                    fetch('http://127.0.0.1:3000/entities/', {
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
                                window.location.href = "./TabelEntidades.html";
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
                        text: "Esta função só é permitida depois de selecionar uma entidade"
                    })
                        .then(function () {
                            window.location.href = "./TabelEntidades.html";
                        })
                }
                else {
                    swal.fire({
                        icon: "warning",
                        title: "Eliminar",
                        text: "Deseja eliminar a entidade: " + id + " ?",
                        showCancelButton: true,
                        confirmButtonText: 'Sim, eliminar!',
                        cancelButtonText: "Cancelar",
                        showLoaderOnConfirm: true,
                        preConfirm: () => {
                            fetch('http://127.0.0.1:3000/entities/' + id, {
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
                                        window.location.href = "./TabelEntidades.html";
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

                $('#toogle2').click(function () {
                    if (id == null) {
                        swal.fire({
                            icon: "error",
                            title: "Erro",
                            text: "Esta função só é permitida depois de selecionar uma entidade"
                        })
                        .then(function () {
                            window.location.href = "./TabelEntidades.html";
                        })
                    }
                    else {
                    fetch('http://127.0.0.1:3000/entities/' + id, {
                        headers: { 'Content-Type': 'application/json' },
                        method: 'GET',
                    })
                        .then(res => res.json())
                        .then((out) => {

                            entidade = out;
                            document.getElementById("id_entidade").value = entidade.id_entidade;
                            document.getElementById("nome_alterar").value = entidade.entidade;
                            document.getElementById("tipo_alterar").value = entidade.tipo;

                        })
                        .catch(error => {
                            console.log(error);
                        });
                    }
                });

                //alterarEntidade
                $('#alterarEntidade').click(function () {
                    let nome = document.getElementById("nome_alterar").value;

                    if (nome == "") {
                        swal.fire("Preencha o campo com o nome da entidade!");
                        return false;
                    }
                    if (nome.length < 2) {
                        swal.fire("Insira um nome de entidade completo!");
                        return false;
                    }
                    else {
                        var data = {};
                        data.entidade = document.getElementById("nome_alterar").value;
                        data.tipo = document.getElementById("tipo_alterar").value;
                        console.log(data);
                        fetch('http://127.0.0.1:3000/entities/' + id, {
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
                                    text: "Entidade alterada com sucesso"
                                }).then(function () {
                                    window.location.href = "./TabelEntidades.html";
                                })

                            })
                            .catch(error => {
                                console.log(error);
                            })
                    }

                });

            })
            .catch(error => {
                console.log(error);
            });   
    };

