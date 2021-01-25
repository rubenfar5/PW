
//quando inicia a página faz
window.onload = function () {
    //chama a função para atualizar a lista de pedidos
    if (localStorage.Tabela == 0){
        verOcorrencias();
    }
    else if (localStorage.Tabela == 1) {
        verOcorrenciasNaoConluídas();
    }
    else {
        verOcorrencias();
    }

    fetch('http://127.0.0.1:3000/occurrencesMaterial/8/list/', {
        headers: { 'Content-Type': 'application/json' },
        method: 'GET',
    })
        .then(res => res.json())
        .then((out) => {
            let materiais = out
            $('#tableMateriais').DataTable({
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
                data: materiais,
                columns: [
                    { data: 'nome_material', title: 'Material' },
                    { data: 'quantidade_usada', title: 'Quantidade Usada' },
                ],
                lengthMenu: [[-1], ["TODOS"]]
            });
        })

    //função para carregar a combo box dos GESTORES
    cbmBoxGestores();
    //função para carregar a combo box dos Materiais
    cbmBoxMateriais();

    nomeUser.innerText = localStorage.User;

};

function cbmBoxGestores() {
    fetch('http://127.0.0.1:3000/occurrencesCmbBox/', {
        headers: { 'Content-Type': 'application/json' },
        method: 'GET',
    })
        .then(res => res.json())
        .then((out) => {
            let gestores = out;
            let tamanho = gestores.length;

            let cbmbox = "";
            for (let i = 1; i < tamanho; i++) {
                let username = gestores[i].username;
                let id_gestor = gestores[i].id_gestor;
                cbmbox = cbmbox + "<option value=" + id_gestor + ">" + username + "</option>";
            }
            document.getElementById('cbmBoxGestores').innerHTML = cbmbox;
        })
        .catch(error => {
            console.log(error);
        });
}

function cbmBoxMateriais() {
    fetch('http://127.0.0.1:3000/occurrencesCmbBoxMaterials/', {
        headers: { 'Content-Type': 'application/json' },
        method: 'GET',
    })
        .then(res => res.json())
        .then((out) => {
            let materiais = out;
            let tamanho = materiais.length;

            let cbmbox = "";
            for (let i = 1; i < tamanho; i++) {
                let nome_material = materiais[i].nome_material;
                let id_material = materiais[i].id_material;
                cbmbox = cbmbox + "<option value=" + id_material + ">" + nome_material + "</option>";
            }
            document.getElementById('material').innerHTML = cbmbox;
        })
        .catch(error => {
            console.log(error);
        });
}

$('#ocorrenciasNaoConcluidas').click(function () {
    if (localStorage.Tabela == 0){
        localStorage.setItem("Tabela", 1);
        window.location.reload();
    }
    else if (localStorage.Tabela == 1) {
        localStorage.setItem("Tabela", 0);
        window.location.reload();
    }
    else {
        localStorage.setItem("Tabela", 0);
        window.location.reload();
    }
})

function verOcorrenciasNaoConluídas() {
    //$('#Tabela').DataTable().destroy();
    fetch('http://127.0.0.1:3000/occurrencesNotFinished/', {
        headers: { 'Content-Type': 'application/json' },
        method: 'GET',
    })
        .then(res => res.json())
        .then((out) => {
            let ocorrencias = out
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
                data: ocorrencias,
                columns: [
                    { data: 'id_ocorrencia', title: 'ID' },
                    { data: 'descricao_pedido', title: 'Descrição' },
                    { data: 'username', title: 'Gestor Ocorrências' },
                    { data: 'dataFormatada', title: 'Data' },
                    { data: 'entidade', title: 'Entidade' },
                    { data: 'descricao_urgencia', title: 'Grau de Urgência' },
                    { data: 'descricao_estado', title: 'Estado' },
                    { data: 'distrito', title: 'Distrito' }
                ],

                rowCallback: function (row, data, index) {
                    var cellValue = data["descricao_estado"];
                    var cellValue1 = data["username"];
                    if (cellValue == "Concluída") {
                        $("td:eq(6)", row).addClass("badge-4 badge-pil badge");
                    }
                    if (cellValue == "Em espera") {
                        $("td:eq(6)", row).addClass("badge-2 badge-pil badge");
                    }
                    if (cellValue == "Em progresso") {
                        $("td:eq(6)", row).addClass("badge-1 badge-pil badge");
                    }
                    if (cellValue1 == "Aguardando Gestor") {
                        $("td:eq(2)", row).addClass("badge-6 badge-pil badge");
                    }
                },
                /*columnDefs: [
                    {"className": "dt-center", "targets": "_all"}
                  ],*/

            });

            var table = $('#dataTable').DataTable();
            let grau_urgencia = "";

            let data = "";
            let gestor;
            let grauUrg;
            let estado;

            //selecionar linha e marcar a mesma
            $('#dataTable').on('click', 'tr', function () {
                let index = table.row(this).index();
                grau_urgencia = ocorrencias[index].descricao_urgencia;
                id_ocorrencia = ocorrencias[index].id_ocorrencia;
                data = ocorrencias[index].dataFormatada;
                gestor = ocorrencias[index].username;
                grauUrg = ocorrencias[index].descricao_urgencia;
                estado = ocorrencias[index].descricao_estado;
                if ($(this).hasClass('selected')) {
                    $(this).removeClass('selected');
                }
                else {
                    table.$('tr.selected').removeClass('selected');
                    $(this).addClass('selected');
                }
            });


            $('#btnconfirmar').click(function () {
                if (gestor == null) {
                    swal.fire({
                        icon: "error",
                        title: "Erro",
                        text: "Selecione uma ocorrência"
                    })
                        .then(function () {
                            window.location.href = "./gerirOcorrências.html";
                        })
                }
                else {
                    swal.fire({
                        icon: "warning",
                        title: "Eliminar",
                        text: "Deseja eliminar a ocorrência: " + id_ocorrencia + " ?",
                        showCancelButton: true,
                        confirmButtonText: 'Sim, eliminar!',
                        cancelButtonText: "Cancelar",
                        showLoaderOnConfirm: true,
                        preConfirm: () => {
                            fetch('http://127.0.0.1:3000/occurrences/' + id_ocorrencia, {
                                headers: { 'Content-Type': 'application/json' },
                                method: 'DELETE',
                            })
                                .then(res => res.json())
                                .then((out) => {
                                    console.log(out);
                                    swal.fire({
                                        icon: "success",
                                        title: "Sucesso",
                                        text: out.message.pt
                                    }).then(function () {
                                        window.location.href = "./gerirOcorrências.html";
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

            //Atribuir gestor
            $('#atribuirGestor').click(function () {
                var data = {};
                data.id_gestor = document.getElementById("cbmBoxGestores").value;
                fetch('http://127.0.0.1:3000/occurrencesGestor/' + id_ocorrencia, {
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
                            text: "Gestor alterado com sucesso"
                        }).then(function () {
                            window.location.href = "./gerirOcorrências.html";
                        })

                    })
                    .catch(error => {
                        console.log(error);
                    });
            });

            $('#toogle1').click(function () {
                if (gestor == null) {
                    swal.fire({
                        icon: "error",
                        title: "Erro",
                        text: "Selecione uma ocorrência"
                    })
                        .then(function () {
                            window.location.href = "./gerirOcorrências.html";
                        })
                } else
                    if (gestor != "Aguardando Gestor") {
                        swal.fire({
                            icon: "error",
                            title: "Erro",
                            text: "Esta ocorrência já tem um gestor atribuído"
                        })
                            .then(function () {
                                window.location.href = "./gerirOcorrências.html";
                            })
                    }
            })
            //gerir material
            $('#toogleE1').click(function () {
                if (gestor == null) {
                    swal.fire({
                        icon: "error",
                        title: "Erro",
                        text: "Selecione uma ocorrência"
                    })
                        .then(function () {
                            window.location.href = "./gerirOcorrências.html";
                        })
                }
                if (estado == "Concluída" || estado == "Em espera") {
                    swal.fire({
                        icon: "error",
                        title: "Erro",
                        text: "O estado da ocorrência não permite esta função",
                    })
                        .then(function () {
                            window.location.href = "./gerirOcorrências.html";
                        })
                }
                else {
                    fetch('http://127.0.0.1:3000/servicesdiscover/' + id_ocorrencia, {
                        headers: { 'Content-Type': 'application/json' },
                        method: 'GET',
                    })
                        .then(res => res.json())
                        .then((out) => {
                            document.getElementById("idOcorrencia_materiais").value = id_ocorrencia;
                            document.getElementById("serviço_materiais").value = out.descricao_tipo_servico;
                            document.getElementById("data").value = data;
                            fetch('http://127.0.0.1:3000/occurrencesLocal/' + id_ocorrencia, {
                                headers: { 'Content-Type': 'application/json' },
                                method: 'GET',
                            }).then(res => res.json())
                                .then((out) => {
                                    document.getElementById("distrit").value = out.distrito;
                                    document.getElementById("concelho").value = out.concelho;
                                    document.getElementById("morada").value = out.morada;
                                    fetch('http://127.0.0.1:3000/occurrencesMaterial/' + id_ocorrencia + '/list/', {
                                        headers: { 'Content-Type': 'application/json' },
                                        method: 'GET',
                                    })
                                        .then(res => res.json())
                                        .then((out) => {
                                            $('#tableMateriais').DataTable().destroy();
                                            let materiais = out
                                            $('#tableMateriais').DataTable({
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
                                                data: materiais,
                                                columns: [
                                                    { data: 'nome_material', title: 'Material' },
                                                    { data: 'quantidade_usada', title: 'Quantidade Usada' },
                                                ],
                                                lengthMenu: [[-1], ["TODOS"]]
                                            });
                                        })
                                        .catch(error => {
                                            console.log(error);
                                        });
                                })
                                .catch(error => {
                                    console.log(error);
                                });
                        })
                        .catch(error => {
                            console.log(error);
                        });
                }

            });

            let descricaoUrgencia;

            //alterar
            $('#toogle3').click(function () {

                if (gestor == null) {
                    swal.fire({
                        icon: "error",
                        title: "Erro",
                        text: "Selecione uma ocorrência"
                    })
                        .then(function () {
                            window.location.href = "./gerirOcorrências.html";
                        })
                } else
                    if (estado == "Concluída") {
                        swal.fire({
                            icon: "error",
                            title: "Erro",
                            text: "Impossível alterar uma ocorrência concluída!"
                        })

                            .then(function () {
                                window.location.href = "./gerirOcorrências.html";
                            })
                    } else {
                        fetch('http://127.0.0.1:3000/occurrencesLevel/' + id_ocorrencia, {
                            headers: { 'Content-Type': 'application/json' },
                            method: 'GET',
                        })
                            .then(res => res.json())
                            .then((out) => {
                                descricaoUrgencia = out.descricao_urgencia;
                                console.log(descricaoUrgencia);
                                fetch('http://127.0.0.1:3000/occurrencesLevel/' + id_ocorrencia, {
                                    headers: { 'Content-Type': 'application/json' },
                                    method: 'GET',
                                })
                                    .then(res => res.json())
                                    .then((out) => {
                                        document.getElementById("grauOcorrencia").value = out.id_nivel;
                                        document.getElementById("idOcorrencia_alterar").value = id_ocorrencia;
                                        document.getElementById("gestor_alterar").value = gestor;
                                    })
                                    .catch(error => {
                                        console.log(error);
                                    })
                            })

                    }
            });



            $('#alterarOcorrencia').click(function () {
                let grauUrgenciaCMB = "nível " + document.getElementById("grauOcorrencia").value;
                console.log(grauUrgenciaCMB);
                if (descricaoUrgencia == grauUrgenciaCMB) {
                    swal.fire({
                        icon: "error",
                        title: "Erro",
                        text: "Esta ocorrência já tem este grau de urgência!"
                    })
                }
                else {
                    var data = {};
                    data.id_nivel = document.getElementById("grauOcorrencia").value;
                    console.log(data);

                    fetch('http://127.0.0.1:3000/occurrences/' + id_ocorrencia, {
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
                                text: "Nível alterado com sucesso!"
                            }).then(function () {
                                window.location.href = "./gerirOcorrências.html";
                            })

                        })
                        .catch(error => {
                            console.log(error);
                        })
                }
            });

            //Concluir ocorrência
            $('#btnConcluir').click(function () {
                if (gestor == null) {
                    swal.fire({
                        icon: "error",
                        title: "Erro",
                        text: "Selecione uma ocorrência"
                    })
                        .then(function () {
                            window.location.href = "./gerirOcorrências.html";
                        })
                }

                else if (estado == "Em espera") {
                    swal.fire({
                        icon: "error",
                        title: "Erro",
                        text: "Esta ocorrência não pode ser concluída"
                    })
                        .then(function () {
                            window.location.href = "./gerirOcorrências.html";
                        })
                }

                else if (estado == "Concluída") {
                    swal.fire({
                        icon: "error",
                        title: "Erro",
                        text: "Esta ocorrência já se encontra concluída"
                    })
                        .then(function () {
                            window.location.href = "./gerirOcorrências.html";
                        })
                }
                else {
                    swal.fire({
                        icon: "warning",
                        title: "Concluir",
                        text: "Deseja concluir a ocorrência: " + id_ocorrencia + " ?",
                        showCancelButton: true,
                        confirmButtonText: 'Sim, concluir!',
                        cancelButtonText: "Cancelar",
                        showLoaderOnConfirm: true,
                        preConfirm: () => {
                            //detalhes
                            alert("cursor a rodar");
                            console.log("ola");
                            fetch('http://127.0.0.1:3000/occurrencesCusto/' + id_ocorrencia, {
                                headers: { 'Content-Type': 'application/json' },
                                method: 'GET',
                            })
                                .then(res => res.json())
                                .then((out) => {
                                    console.log(out);
                                    fetch('http://127.0.0.1:3000/occurrences/' + id_ocorrencia + '/finish/', {
                                        headers: { 'Content-Type': 'application/json' },
                                        method: 'PUT',
                                    })
                                        .then(res => res.json())
                                        .then((out) => {
                                            console.log(out);
                                            swal.fire({
                                                icon: "success",
                                                title: "Sucesso",
                                                text: "Gestor notificado!"
                                            })
                                                .then(function () {
                                                    window.location.href = "./gerirOcorrências.html";
                                                })
                                        })
                                        .catch(error => {
                                            console.log(error);
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






            $('#detalhes').click(function () {
                if (gestor == null) {
                    swal.fire({
                        icon: "error",
                        title: "Erro",
                        text: "Selecione uma ocorrência"
                    })
                        .then(function () {
                            window.location.href = "./gerirOcorrências.html";
                        })
                }

                else if (estado == "Em espera") {
                    swal.fire({
                        icon: "error",
                        title: "Erro",
                        text: "O estado desta ocorrência não permite a visualização dos seus detalhes"
                    })
                        .then(function () {
                            window.location.href = "./gerirOcorrências.html";
                        })
                }

                else if (estado == "Em progresso") {
                    swal.fire({
                        icon: "error",
                        title: "Erro",
                        text: "O estado desta ocorrência não permite a visualização dos seus detalhes"
                    })
                        .then(function () {
                            window.location.href = "./gerirOcorrências.html";
                        })
                }
                else {
                    fetch('http://127.0.0.1:3000/servicesdiscover/' + id_ocorrencia, {
                        headers: { 'Content-Type': 'application/json' },
                        method: 'GET',
                    })
                        .then(res => res.json())
                        .then((out) => {
                            document.getElementById("serviço_concluir").value = out.descricao_tipo_servico;
                            document.getElementById("idOcorrencia_concluir").value = id_ocorrencia;
                            fetch('http://127.0.0.1:3000/occurrencesCusto/' + id_ocorrencia, {
                                headers: { 'Content-Type': 'application/json' },
                                method: 'GET',
                            })
                                .then(res => res.json())
                                .then((out) => {
                                    custoOcorrencia.innerText = out[0];
                                    distanciaCO.innerText = out[1];
                                    tempoViagem.innerText = out[2];
                                })
                                .catch(error => {
                                    console.log(error);
                                });
                        })

                        .catch(error => {
                            console.log(error);
                        });
                }

            });

            /*
                        $('#concluirOcorrencia').click(function () {
                            swal.fire({
                                icon: "warning",
                                title: "Concluir",
                                text: "Deseja concluir a ocorrência: " + id_ocorrencia + " ?",
                                showCancelButton: true,
                                confirmButtonText: 'Sim, concluir!',
                                cancelButtonText: "Cancelar",
                                showLoaderOnConfirm: true,
                                preConfirm: () => {
                                    fetch('http://127.0.0.1:3000/occurrences/' + id_ocorrencia + '/finish/', {
                                        headers: { 'Content-Type': 'application/json' },
                                        method: 'PUT',
                                    })
                                        .then(res => res.json())
                                        .then((out) => {
                                            swal.fire({
                                                icon: "success",
                                                title: "Sucesso",
                                                text: "Ocorrência concluída com sucesso"
                                            })
                                                .then(function () {
                                                    window.location.href = "./gerirOcorrências.html";
                                                })
                                        })
            
                                        .catch(error => {
                                            console.log(error);
                                        })
                                },
                                allowOutsideClick: () => !swal.isLoading()
                            })
                        })
            
            */
            $('#notificarGestor').click(function () {
                if (gestor == null) {
                    swal.fire({
                        icon: "error",
                        title: "Erro",
                        text: "Selecione uma ocorrência"
                    })
                } else
                    if (gestor == "Aguardando Gestor") {
                        swal.fire({
                            icon: "error",
                            title: "Erro",
                            text: "Esta ocorrência ainda não tem um gestor atribuido"
                        })
                    }

                    else {
                        swal.fire({
                            icon: "warning",
                            title: "Notificar",
                            text: "Deseja notificar o gestor " + gestor + ", sobre o estado da ocorrência: " + id_ocorrencia + " ?",
                            showCancelButton: true,
                            confirmButtonText: 'Sim, notificar!',
                            cancelButtonText: "Cancelar",
                            showLoaderOnConfirm: true,
                            preConfirm: () => {
                                document.body.style.cursor = 'wait';
                                fetch('http://127.0.0.1:3000/occurrencesNotGestor/' + id_ocorrencia, {
                                    headers: { 'Content-Type': 'application/json' },
                                    method: 'GET',
                                })
                                    .then(res => res.json())
                                    .then((out) => {
                                        document.body.style.cursor = 'default';
                                        swal.fire({
                                            icon: "success",
                                            title: "Sucesso",
                                            text: "O gestor desta ocorrência foi notificado"
                                        })
                                            .then(function () {
                                                window.location.href = "./gerirOcorrências.html";
                                            })
                                    })
                                    .catch(error => {
                                        console.log(error);
                                    })
                            },
                            allowOutsideClick: () => !swal.isLoading()
                        })
                    }
            });

            $('#menuMaterial').click(function () {
                fetch('http://127.0.0.1:3000/occurrences/' + id_ocorrencia + '/material/', {
                    headers: { 'Content-Type': 'application/json' },
                    method: 'GET',
                })
                    .then(res => res.json())
                    .then((out) => {
                        let tamanho = out.length;
                        let texto = [];
                        for (let i = 0; i < tamanho; i++) {
                            if (i == 0) {
                                texto.push(out[i]);
                            }
                            else {
                                texto.push("\n" + out[i]);
                            }
                        }
                        document.getElementById("materialSugerido").value = texto;
                    })
            });

            let listar = [];
            let i = 0;
            let nome;

            $('#adicionarMaterial').click(function () {
                let material = document.getElementById("material").value;
                let quantidade = document.getElementById("quantidade").value;
                fetch('http://127.0.0.1:3000/materials/' + material, {
                    headers: { 'Content-Type': 'application/json' },
                    method: 'GET',
                })
                    .then(res => res.json())
                    .then((out) => {
                        nome = out.nome_material;
                        let dados = {};
                        dados.id_material = material;
                        dados.quantidade_usada = quantidade;
                        fetch('http://127.0.0.1:3000/occurrencesMaterial/' + id_ocorrencia, {
                            headers: { 'Content-Type': 'application/json' },
                            method: 'PUT',
                            body: JSON.stringify(dados)
                        })
                            .then(res => res.json())
                            .then((out) => {
                                if (out.msg == "Este material já foi adicionado") {
                                    // swal.fire(out.msg);
                                    swal.fire({
                                        icon: "error",
                                        title: "Erro",
                                        text: "Este material já foi adicionado",
                                        showConfirmButton: false,
                                        timer: 1500
                                    })
                                }
                                else {
                                    if (i == 0) {
                                        listar.push("material: " + nome + ", quantidade: " + quantidade);
                                        i = 1;
                                    }
                                    else {
                                        listar.push("\n" + "material: " + nome + ", quantidade: " + quantidade);
                                    }
                                    document.getElementById("materialSelecionado").value = listar;
                                    swal.fire({
                                        icon: "success",
                                        title: "Sucesso",
                                        text: "Material adicionado!",
                                        showConfirmButton: false,
                                        timer: 1500
                                    })

                                }
                            })
                            .catch(error => {
                                console.log(error);
                            });
                    })
                    .catch(error => {
                        console.log(error);
                    });
            })

            $('#concluirMaterial').click(function () {
                swal.fire({
                    icon: "success",
                    title: "Sucesso",
                    text: "Material adicionado com sucesso à ocorrência: " + document.getElementById("idOcorrencia_materiais").value
                })
                    .then(function () {
                        window.location.href = "./gerirOcorrências.html";
                    })
            })

        })
        .catch(error => {
            console.log(error);
        });

    }

function verOcorrencias() {
    //$('#Tabela').DataTable().destroy();
    fetch('http://127.0.0.1:3000/occurrencesTable/', {
        headers: { 'Content-Type': 'application/json' },
        method: 'GET',
    })
        .then(res => res.json())
        .then((out) => {
            let ocorrencias = out
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
                data: ocorrencias,
                columns: [
                    { data: 'id_ocorrencia', title: 'ID' },
                    { data: 'descricao_pedido', title: 'Descrição' },
                    { data: 'username', title: 'Gestor Ocorrências' },
                    { data: 'dataFormatada', title: 'Data' },
                    { data: 'entidade', title: 'Entidade' },
                    { data: 'descricao_urgencia', title: 'Grau de Urgência' },
                    { data: 'descricao_estado', title: 'Estado' },
                    { data: 'distrito', title: 'Distrito' }
                ],

                rowCallback: function (row, data, index) {
                    var cellValue = data["descricao_estado"];
                    var cellValue1 = data["username"];
                    if (cellValue == "Concluída") {
                        $("td:eq(6)", row).addClass("badge-4 badge-pil badge");
                    }
                    if (cellValue == "Em espera") {
                        $("td:eq(6)", row).addClass("badge-2 badge-pil badge");
                    }
                    if (cellValue == "Em progresso") {
                        $("td:eq(6)", row).addClass("badge-1 badge-pil badge");
                    }
                    if (cellValue1 == "Aguardando Gestor") {
                        $("td:eq(2)", row).addClass("badge-6 badge-pil badge");
                    }
                },
                /*columnDefs: [
                    {"className": "dt-center", "targets": "_all"}
                  ],*/

            });

            var table = $('#dataTable').DataTable();
            let grau_urgencia = "";

            let data = "";
            let gestor;
            let grauUrg;
            let estado;

            //selecionar linha e marcar a mesma
            $('#dataTable').on('click', 'tr', function () {
                let index = table.row(this).index();
                grau_urgencia = ocorrencias[index].descricao_urgencia;
                id_ocorrencia = ocorrencias[index].id_ocorrencia;
                data = ocorrencias[index].dataFormatada;
                gestor = ocorrencias[index].username;
                grauUrg = ocorrencias[index].descricao_urgencia;
                estado = ocorrencias[index].descricao_estado;
                if ($(this).hasClass('selected')) {
                    $(this).removeClass('selected');
                }
                else {
                    table.$('tr.selected').removeClass('selected');
                    $(this).addClass('selected');
                }
            });


            $('#btnconfirmar').click(function () {
                if (gestor == null) {
                    swal.fire({
                        icon: "error",
                        title: "Erro",
                        text: "Selecione uma ocorrência"
                    })
                        .then(function () {
                            window.location.href = "./gerirOcorrências.html";
                        })
                }
                else {
                    swal.fire({
                        icon: "warning",
                        title: "Eliminar",
                        text: "Deseja eliminar a ocorrência: " + id_ocorrencia + " ?",
                        showCancelButton: true,
                        confirmButtonText: 'Sim, eliminar!',
                        cancelButtonText: "Cancelar",
                        showLoaderOnConfirm: true,
                        preConfirm: () => {
                            fetch('http://127.0.0.1:3000/occurrences/' + id_ocorrencia, {
                                headers: { 'Content-Type': 'application/json' },
                                method: 'DELETE',
                            })
                                .then(res => res.json())
                                .then((out) => {
                                    console.log(out);
                                    swal.fire({
                                        icon: "success",
                                        title: "Sucesso",
                                        text: out.message.pt
                                    }).then(function () {
                                        window.location.href = "./gerirOcorrências.html";
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

            //Atribuir gestor
            $('#atribuirGestor').click(function () {
                var data = {};
                data.id_gestor = document.getElementById("cbmBoxGestores").value;
                fetch('http://127.0.0.1:3000/occurrencesGestor/' + id_ocorrencia, {
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
                            text: "Gestor alterado com sucesso"
                        }).then(function () {
                            window.location.href = "./gerirOcorrências.html";
                        })

                    })
                    .catch(error => {
                        console.log(error);
                    });
            });

            $('#toogle1').click(function () {
                if (gestor == null) {
                    swal.fire({
                        icon: "error",
                        title: "Erro",
                        text: "Selecione uma ocorrência"
                    })
                        .then(function () {
                            window.location.href = "./gerirOcorrências.html";
                        })
                } else
                    if (gestor != "Aguardando Gestor") {
                        swal.fire({
                            icon: "error",
                            title: "Erro",
                            text: "Esta ocorrência já tem um gestor atribuído"
                        })
                            .then(function () {
                                window.location.href = "./gerirOcorrências.html";
                            })
                    }
            })
            //gerir material
            $('#toogleE1').click(function () {
                if (gestor == null) {
                    swal.fire({
                        icon: "error",
                        title: "Erro",
                        text: "Selecione uma ocorrência"
                    })
                        .then(function () {
                            window.location.href = "./gerirOcorrências.html";
                        })
                }
                if (estado == "Concluída" || estado == "Em espera") {
                    swal.fire({
                        icon: "error",
                        title: "Erro",
                        text: "O estado da ocorrência não permite esta função",
                    })
                        .then(function () {
                            window.location.href = "./gerirOcorrências.html";
                        })
                }
                else {
                    fetch('http://127.0.0.1:3000/servicesdiscover/' + id_ocorrencia, {
                        headers: { 'Content-Type': 'application/json' },
                        method: 'GET',
                    })
                        .then(res => res.json())
                        .then((out) => {
                            document.getElementById("idOcorrencia_materiais").value = id_ocorrencia;
                            document.getElementById("serviço_materiais").value = out.descricao_tipo_servico;
                            document.getElementById("data").value = data;
                            fetch('http://127.0.0.1:3000/occurrencesLocal/' + id_ocorrencia, {
                                headers: { 'Content-Type': 'application/json' },
                                method: 'GET',
                            }).then(res => res.json())
                                .then((out) => {
                                    document.getElementById("distrit").value = out.distrito;
                                    document.getElementById("concelho").value = out.concelho;
                                    document.getElementById("morada").value = out.morada;
                                    fetch('http://127.0.0.1:3000/occurrencesMaterial/' + id_ocorrencia + '/list/', {
                                        headers: { 'Content-Type': 'application/json' },
                                        method: 'GET',
                                    })
                                        .then(res => res.json())
                                        .then((out) => {
                                            $('#tableMateriais').DataTable().destroy();
                                            let materiais = out
                                            $('#tableMateriais').DataTable({
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
                                                data: materiais,
                                                columns: [
                                                    { data: 'nome_material', title: 'Material' },
                                                    { data: 'quantidade_usada', title: 'Quantidade Usada' },
                                                ],
                                                lengthMenu: [[-1], ["TODOS"]]
                                            });
                                        })
                                        .catch(error => {
                                            console.log(error);
                                        });
                                })
                                .catch(error => {
                                    console.log(error);
                                });
                        })
                        .catch(error => {
                            console.log(error);
                        });
                }

            });

            let descricaoUrgencia;

            //alterar
            $('#toogle3').click(function () {

                if (gestor == null) {
                    swal.fire({
                        icon: "error",
                        title: "Erro",
                        text: "Selecione uma ocorrência"
                    })
                        .then(function () {
                            window.location.href = "./gerirOcorrências.html";
                        })
                } else
                    if (estado == "Concluída") {
                        swal.fire({
                            icon: "error",
                            title: "Erro",
                            text: "Impossível alterar uma ocorrência concluída!"
                        })

                            .then(function () {
                                window.location.href = "./gerirOcorrências.html";
                            })
                    } else {
                        fetch('http://127.0.0.1:3000/occurrencesLevel/' + id_ocorrencia, {
                            headers: { 'Content-Type': 'application/json' },
                            method: 'GET',
                        })
                            .then(res => res.json())
                            .then((out) => {
                                descricaoUrgencia = out.descricao_urgencia;
                                console.log(descricaoUrgencia);
                                fetch('http://127.0.0.1:3000/occurrencesLevel/' + id_ocorrencia, {
                                    headers: { 'Content-Type': 'application/json' },
                                    method: 'GET',
                                })
                                    .then(res => res.json())
                                    .then((out) => {
                                        document.getElementById("grauOcorrencia").value = out.id_nivel;
                                        document.getElementById("idOcorrencia_alterar").value = id_ocorrencia;
                                        document.getElementById("gestor_alterar").value = gestor;
                                    })
                                    .catch(error => {
                                        console.log(error);
                                    })
                            })

                    }
            });



            $('#alterarOcorrencia').click(function () {
                let grauUrgenciaCMB = "nível " + document.getElementById("grauOcorrencia").value;
                console.log(grauUrgenciaCMB);
                if (descricaoUrgencia == grauUrgenciaCMB) {
                    swal.fire({
                        icon: "error",
                        title: "Erro",
                        text: "Esta ocorrência já tem este grau de urgência!"
                    })
                }
                else {
                    var data = {};
                    data.id_nivel = document.getElementById("grauOcorrencia").value;
                    console.log(data);

                    fetch('http://127.0.0.1:3000/occurrences/' + id_ocorrencia, {
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
                                text: "Nível alterado com sucesso!"
                            }).then(function () {
                                window.location.href = "./gerirOcorrências.html";
                            })

                        })
                        .catch(error => {
                            console.log(error);
                        })
                }
            });

            //Concluir ocorrência
            $('#btnConcluir').click(function () {
                if (gestor == null) {
                    swal.fire({
                        icon: "error",
                        title: "Erro",
                        text: "Selecione uma ocorrência"
                    })
                        .then(function () {
                            window.location.href = "./gerirOcorrências.html";
                        })
                }

                else if (estado == "Em espera") {
                    swal.fire({
                        icon: "error",
                        title: "Erro",
                        text: "Esta ocorrência não pode ser concluída"
                    })
                        .then(function () {
                            window.location.href = "./gerirOcorrências.html";
                        })
                }

                else if (estado == "Concluída") {
                    swal.fire({
                        icon: "error",
                        title: "Erro",
                        text: "Esta ocorrência já se encontra concluída"
                    })
                        .then(function () {
                            window.location.href = "./gerirOcorrências.html";
                        })
                }
                else {
                    swal.fire({
                        icon: "warning",
                        title: "Concluir",
                        text: "Deseja concluir a ocorrência: " + id_ocorrencia + " ?",
                        showCancelButton: true,
                        confirmButtonText: 'Sim, concluir!',
                        cancelButtonText: "Cancelar",
                        showLoaderOnConfirm: true,
                        preConfirm: () => {
                            //detalhes
                            fetch('http://127.0.0.1:3000/occurrencesCusto/' + id_ocorrencia, {
                                headers: { 'Content-Type': 'application/json' },
                                method: 'GET',
                            })
                                .then(res => res.json())
                                .then((out) => {
                                    console.log(out);
                                    fetch('http://127.0.0.1:3000/occurrences/' + id_ocorrencia + '/finish/', {
                                        headers: { 'Content-Type': 'application/json' },
                                        method: 'PUT',
                                    })
                                        .then(res => res.json())
                                        .then((out) => {
                                            console.log(out);
                                            swal.fire({
                                                icon: "success",
                                                title: "Sucesso",
                                                text: "Gestor notificado!"
                                            })
                                                .then(function () {
                                                    window.location.href = "./gerirOcorrências.html";
                                                })
                                        })
                                        .catch(error => {
                                            console.log(error);
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






            $('#detalhes').click(function () {
                if (gestor == null) {
                    swal.fire({
                        icon: "error",
                        title: "Erro",
                        text: "Selecione uma ocorrência"
                    })
                        .then(function () {
                            window.location.href = "./gerirOcorrências.html";
                        })
                }

                else if (estado == "Em espera") {
                    swal.fire({
                        icon: "error",
                        title: "Erro",
                        text: "O estado desta ocorrência não permite a visualização dos seus detalhes"
                    })
                        .then(function () {
                            window.location.href = "./gerirOcorrências.html";
                        })
                }

                else if (estado == "Em progresso") {
                    swal.fire({
                        icon: "error",
                        title: "Erro",
                        text: "O estado desta ocorrência não permite a visualização dos seus detalhes"
                    })
                        .then(function () {
                            window.location.href = "./gerirOcorrências.html";
                        })
                }
                else {
                    fetch('http://127.0.0.1:3000/servicesdiscover/' + id_ocorrencia, {
                        headers: { 'Content-Type': 'application/json' },
                        method: 'GET',
                    })
                        .then(res => res.json())
                        .then((out) => {
                            document.getElementById("serviço_concluir").value = out.descricao_tipo_servico;
                            document.getElementById("idOcorrencia_concluir").value = id_ocorrencia;
                            fetch('http://127.0.0.1:3000/occurrencesCusto/' + id_ocorrencia, {
                                headers: { 'Content-Type': 'application/json' },
                                method: 'GET',
                            })
                                .then(res => res.json())
                                .then((out) => {
                                    custoOcorrencia.innerText = out[0];
                                    distanciaCO.innerText = out[1];
                                    tempoViagem.innerText = out[2];
                                })
                                .catch(error => {
                                    console.log(error);
                                });
                        })

                        .catch(error => {
                            console.log(error);
                        });
                }

            });

            /*
                        $('#concluirOcorrencia').click(function () {
                            swal.fire({
                                icon: "warning",
                                title: "Concluir",
                                text: "Deseja concluir a ocorrência: " + id_ocorrencia + " ?",
                                showCancelButton: true,
                                confirmButtonText: 'Sim, concluir!',
                                cancelButtonText: "Cancelar",
                                showLoaderOnConfirm: true,
                                preConfirm: () => {
                                    fetch('http://127.0.0.1:3000/occurrences/' + id_ocorrencia + '/finish/', {
                                        headers: { 'Content-Type': 'application/json' },
                                        method: 'PUT',
                                    })
                                        .then(res => res.json())
                                        .then((out) => {
                                            swal.fire({
                                                icon: "success",
                                                title: "Sucesso",
                                                text: "Ocorrência concluída com sucesso"
                                            })
                                                .then(function () {
                                                    window.location.href = "./gerirOcorrências.html";
                                                })
                                        })
            
                                        .catch(error => {
                                            console.log(error);
                                        })
                                },
                                allowOutsideClick: () => !swal.isLoading()
                            })
                        })
            
            */
            $('#notificarGestor').click(function () {
                if (gestor == null) {
                    swal.fire({
                        icon: "error",
                        title: "Erro",
                        text: "Selecione uma ocorrência"
                    })
                } else
                    if (gestor == "Aguardando Gestor") {
                        swal.fire({
                            icon: "error",
                            title: "Erro",
                            text: "Esta ocorrência ainda não tem um gestor atribuido"
                        })
                    }

                    else {
                        swal.fire({
                            icon: "warning",
                            title: "Notificar",
                            text: "Deseja notificar o gestor " + gestor + ", sobre o estado da ocorrência: " + id_ocorrencia + " ?",
                            showCancelButton: true,
                            confirmButtonText: 'Sim, notificar!',
                            cancelButtonText: "Cancelar",
                            showLoaderOnConfirm: true,
                            preConfirm: () => {
                                document.body.style.cursor = 'wait';
                                fetch('http://127.0.0.1:3000/occurrencesNotGestor/' + id_ocorrencia, {
                                    headers: { 'Content-Type': 'application/json' },
                                    method: 'GET',
                                })
                                    .then(res => res.json())
                                    .then((out) => {
                                        document.body.style.cursor = 'default';
                                        swal.fire({
                                            icon: "success",
                                            title: "Sucesso",
                                            text: "O gestor desta ocorrência foi notificado"
                                        })
                                            .then(function () {
                                                window.location.href = "./gerirOcorrências.html";
                                            })
                                    })
                                    .catch(error => {
                                        console.log(error);
                                    })
                            },
                            allowOutsideClick: () => !swal.isLoading()
                        })
                    }
            });

            $('#menuMaterial').click(function () {
                fetch('http://127.0.0.1:3000/occurrences/' + id_ocorrencia + '/material/', {
                    headers: { 'Content-Type': 'application/json' },
                    method: 'GET',
                })
                    .then(res => res.json())
                    .then((out) => {
                        let tamanho = out.length;
                        let texto = [];
                        for (let i = 0; i < tamanho; i++) {
                            if (i == 0) {
                                texto.push(out[i]);
                            }
                            else {
                                texto.push("\n" + out[i]);
                            }
                        }
                        document.getElementById("materialSugerido").value = texto;
                    })
            });

            let listar = [];
            let i = 0;
            let nome;

            $('#adicionarMaterial').click(function () {
                let material = document.getElementById("material").value;
                let quantidade = document.getElementById("quantidade").value;
                fetch('http://127.0.0.1:3000/materials/' + material, {
                    headers: { 'Content-Type': 'application/json' },
                    method: 'GET',
                })
                    .then(res => res.json())
                    .then((out) => {
                        nome = out.nome_material;
                        let dados = {};
                        dados.id_material = material;
                        dados.quantidade_usada = quantidade;
                        fetch('http://127.0.0.1:3000/occurrencesMaterial/' + id_ocorrencia, {
                            headers: { 'Content-Type': 'application/json' },
                            method: 'PUT',
                            body: JSON.stringify(dados)
                        })
                            .then(res => res.json())
                            .then((out) => {
                                if (out.msg == "Este material já foi adicionado") {
                                    // swal.fire(out.msg);
                                    swal.fire({
                                        icon: "error",
                                        title: "Erro",
                                        text: "Este material já foi adicionado",
                                        showConfirmButton: false,
                                        timer: 1500
                                    })
                                }
                                else {
                                    if (i == 0) {
                                        listar.push("material: " + nome + ", quantidade: " + quantidade);
                                        i = 1;
                                    }
                                    else {
                                        listar.push("\n" + "material: " + nome + ", quantidade: " + quantidade);
                                    }
                                    document.getElementById("materialSelecionado").value = listar;
                                    swal.fire({
                                        icon: "success",
                                        title: "Sucesso",
                                        text: "Material adicionado!",
                                        showConfirmButton: false,
                                        timer: 1500
                                    })

                                }
                            })
                            .catch(error => {
                                console.log(error);
                            });
                    })
                    .catch(error => {
                        console.log(error);
                    });
            })

            $('#concluirMaterial').click(function () {
                swal.fire({
                    icon: "success",
                    title: "Sucesso",
                    text: "Material adicionado com sucesso à ocorrência: " + document.getElementById("idOcorrencia_materiais").value
                })
                    .then(function () {
                        window.location.href = "./gerirOcorrências.html";
                    })
            })

        })
        .catch(error => {
            console.log(error);
        });


};


