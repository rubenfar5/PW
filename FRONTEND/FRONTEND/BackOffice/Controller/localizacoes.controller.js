//quando inicia a página faz
window.onload = function () {
    //chama a função para atualizar a lista de pedidos
    //verLocalizacoes();
    //adicionar função de validação ao formulário
    //MapaPortugal();
    if (localStorage.Mapa == 0){
        verLocalizacoes();
        MapaPortugal();
    }
    else if (localStorage.Mapa == 1) {
        verLocalizacoesConcluidas();
        MapaPortugalConcluidas();
    }
    else if (localStorage.Mapa == 2) {
        verLocalizacoesNaoConcluidas();
        MapaPortugalNaoConcluidas();
    }
    else {
        verLocalizacoes();
        MapaPortugal();
    }

    nomeUser.innerText = localStorage.User;
    //todas
    $('#btnlocaltodas').click(function () {
        if (localStorage.Mapa != 0){
            localStorage.setItem("Mapa", 0);
            window.location.reload();
        }
    });
    //concluidas
    $('#btnlocalconc').click(function () {
        if (localStorage.Mapa != 1){
            localStorage.setItem("Mapa", 1);
            window.location.reload();
        }
    });
    //nao concluidas
    $('#btnlocalativas').click(function () {
        if (localStorage.Mapa != 2){
            localStorage.setItem("Mapa", 2);
            window.location.reload();
        }
    });


//REFRESH DA TABELA    
function verLocalizacoes() {
    let localizacoes = "";
    fetch('http://127.0.0.1:3000/occurrencesLocal/', {
        headers: { 'Content-Type': 'application/json' },
        method: 'GET',
    })
        .then(res => res.json())
        .then((out) => {
            console.log(out);
            localizacoes = out
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
                data: localizacoes,
                columns: [
                    { data: 'id_ocorrencia', title: 'ID Ocorrência' },
                    { data: 'descricao_estado', title: 'Estado' },
                    { data: 'distrito', title: 'Distrito' },
                    { data: 'concelho', title: 'Concelho' },
                    { data: 'morada', title: 'Morada' }
                ],

                rowCallback: function(row, data, index) {
                    var cellValue = data["descricao_estado"];
                    if (cellValue=="Em progresso") {
                    $("td:eq(1)",row).addClass("badge-1 badge-pil badge");
                    }
                    if (cellValue=="Concluída") {
                    $("td:eq(1)",row).addClass("badge-4 badge-pil badge");
                    }
                    if (cellValue == "Em espera") {
                        $("td:eq(1)", row).addClass("badge-2 badge-pil badge");
                    }
                },
                columnDefs: [
                    {"className": "dt-center", "targets": "_all"}
                  ],
            });

            var table = $('#dataTable').DataTable();
            let id = "";

            //selecionar linha e marcar a mesma
            $('#dataTable').on('click', 'tr', function () {
                let index = table.row(this).index();
                id = localizacoes[index].id_ocorrencia;

                if ($(this).hasClass('selected')) {
                    $(this).removeClass('selected');
                }
                else {
                    table.$('tr.selected').removeClass('selected');
                    $(this).addClass('selected');
                }
            });
            
        });
};

function verLocalizacoesNaoConcluidas() {
    fetch('http://127.0.0.1:3000/occurrencesAtivLocal/', {
        headers: { 'Content-Type': 'application/json' },
        method: 'GET',
    })
        .then(res => res.json())
        .then((out) => {
            console.log(out);
            localizacoes = out
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
                data: localizacoes,
                columns: [
                    { data: 'id_ocorrencia', title: 'ID Ocorrência' },
                    { data: 'descricao_estado', title: 'Estado' },
                    { data: 'distrito', title: 'Distrito' },
                    { data: 'concelho', title: 'Concelho' },
                    { data: 'morada', title: 'Morada' }
                ],
                rowCallback: function(row, data, index) {
                    var cellValue = data["descricao_estado"];
                    if (cellValue=="Em progresso") {
                    $("td:eq(1)",row).addClass("badge-1 badge-pil badge");
                    }
                    if (cellValue == "Em espera") {
                        $("td:eq(1)", row).addClass("badge-2 badge-pil badge");
                    }
                },
                columnDefs: [
                    {"className": "dt-center", "targets": "_all"}
                  ],
            });

            var table = $('#dataTable').DataTable();
            let id = "";

            //selecionar linha e marcar a mesma
            $('#dataTable').on('click', 'tr', function () {
                let index = table.row(this).index();
                id = localizacoes[index].id_ocorrencia;

                if ($(this).hasClass('selected')) {
                    $(this).removeClass('selected');
                }
                else {
                    table.$('tr.selected').removeClass('selected');
                    $(this).addClass('selected');
                }
            });

        });
};


function verLocalizacoesConcluidas() {
    fetch('http://127.0.0.1:3000/occurrencesConcLocal/', {
        headers: { 'Content-Type': 'application/json' },
        method: 'GET',
    })
        .then(res => res.json())
        .then((out) => {
            localizacoes = out
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
                data: localizacoes,
                columns: [
                    { data: 'id_ocorrencia', title: 'ID Ocorrência' },
                    { data: 'descricao_estado', title: 'Estado' },
                    { data: 'distrito', title: 'Distrito' },
                    { data: 'concelho', title: 'Concelho' },
                    { data: 'morada', title: 'Morada' }
                ],
                rowCallback: function(row, data, index) {
                    var cellValue = data["descricao_estado"];
                if (cellValue=="Concluída") {
                    $("td:eq(1)",row).addClass("badge-4 badge-pil badge");
                    }
                },
                columnDefs: [
                    {"className": "dt-center", "targets": "_all"}
                  ],
            });
            var table = $('#dataTable').DataTable();
            let id = "";

            //selecionar linha e marcar a mesma
            $('#dataTable').on('click', 'tr', function () {
                let index = table.row(this).index();
                id = localizacoes[index].id_ocorrencia;

                if ($(this).hasClass('selected')) {
                    $(this).removeClass('selected');
                }
                else {
                    table.$('tr.selected').removeClass('selected');
                    $(this).addClass('selected');
                }
            });

        });
};


function MapaPortugal() {
    fetch('http://127.0.0.1:3000/occurrencesDistrito/', {
        headers: { 'Content-Type': 'application/json' },
        method: 'GET',
    })
        .then(res => res.json())
        .then((out) => {
            console.log(out);
            let mapa = out;
            let viana_castelo = 0;
            let braga = 0;
            let vila_real = 0;
            let braganca = 0;
            let porto = 0;
            let viseu = 0;
            let aveiro = 0;
            let guarda = 0;
            let coimbra = 0;
            let castelo_branco = 0;
            let leiria = 0;
            let santarem = 0;
            let portalegre = 0;
            let lisboa = 0;
            let setubal = 0;
            let evora = 0;
            let beja = 0;
            let faro = 0;
            let madeira = 0;
            let acores = 0;

            let tamanho = mapa.length;
            for (let i = 0; i < tamanho; i++) {
                if (mapa[i].distrito == "Viana do Castelo") {
                    viana_castelo = mapa[i].nmr_ocor;
                }
                if (mapa[i].distrito == "Braga") {
                    braga = mapa[i].nmr_ocor;
                }
                if (mapa[i].distrito == "Vila Real") {
                    vila_real = mapa[i].nmr_ocor;
                }
                if (mapa[i].distrito == "Bragança") {
                    braganca = mapa[i].nmr_ocor;
                }
                if (mapa[i].distrito == "Porto") {
                    porto = mapa[i].nmr_ocor;
                }
                if (mapa[i].distrito == "Viseu") {
                    viseu = mapa[i].nmr_ocor;
                }
                if (mapa[i].distrito == "Aveiro") {
                    aveiro = mapa[i].nmr_ocor;
                }
                if (mapa[i].distrito == "Guarda") {
                    guarda = mapa[i].nmr_ocor;
                }
                if (mapa[i].distrito == "Coimbra") {
                    coimbra = mapa[i].nmr_ocor;
                }
                if (mapa[i].distrito == "Castelo Branco") {
                    castelo_branco = mapa[i].nmr_ocor;
                }
                if (mapa[i].distrito == "Leiria") {
                    leiria = mapa[i].nmr_ocor;
                }
                if (mapa[i].distrito == "Santarém") {
                    santarem = mapa[i].nmr_ocor;
                }
                if (mapa[i].distrito == "Portalegre") {
                    portalegre = mapa[i].nmr_ocor;
                }
                if (mapa[i].distrito == "Lisboa") {
                    lisboa = mapa[i].nmr_ocor;
                }
                if (mapa[i].distrito == "Setúbal") {
                    setubal = mapa[i].nmr_ocor;
                }
                if (mapa[i].distrito == "Évora") {
                    evora = mapa[i].nmr_ocor;
                }
                if (mapa[i].distrito == "Beja") {
                    beja = mapa[i].nmr_ocor;
                }
                if (mapa[i].distrito == "Faro") {
                    faro = mapa[i].nmr_ocor;
                }
            }



            //Mapa Porugal
            // Prepare demo data
            // Data is joined to map using value of 'hc-key' property by default.
            // See API docs for 'joinBy' for more info on linking data and map.

            var data = [
                ['pt-fa', faro],
                ['pt-li', lisboa],
                ['pt-av', aveiro],
                ['pt-vc', viana_castelo],
                ['pt-be', beja],
                ['pt-ev', evora],
                ['pt-se', setubal],
                ['pt-pa', portalegre],
                ['pt-sa', santarem],
                ['pt-br', braga],
                ['pt-le', leiria],
                ['pt-ba', braganca],
                ['pt-cb', castelo_branco],
                ['pt-gu', guarda],
                ['pt-co', coimbra],
                ['pt-po', porto],
                ['pt-vi', viseu],
                ['pt-vr', vila_real],
                ['pt-ma', madeira],
                ['pt-ac', acores]
            ];

            // Create the chart
            Highcharts.mapChart('mapaPortugal', {
                chart: {
                    map: 'countries/pt/pt-all'
                },

                title: {
                    text: 'Ocorrências por Distrito'

                },

                subtitle: {
                    text: 'Mapa de: <a href="http://code.highcharts.com/mapdata/countries/pt/pt-all.js">Portugal</a>'
                },

                mapNavigation: {
                    enabled: true,
                    buttonOptions: {
                        verticalAlign: 'bottom'
                    }
                },

                colorAxis: {
                    min: 0
                },

                series: [{
                    data: data,
                    name: 'Ocorrências',
                    states: {
                        hover: {
                            color: '#BADA55'
                        }
                    },
                    dataLabels: {
                        enabled: true,
                        format: '{point.name}'
                    }
                }, {
                    name: 'Separators',
                    type: 'mapline',
                    data: Highcharts.geojson(Highcharts.maps['countries/pt/pt-all'], 'mapline'),
                    color: 'silver',
                    nullColor: 'silver',
                    showInLegend: false,
                    enableMouseTracking: false
                }]
            });

        })




}

//Não concluídas
function MapaPortugalNaoConcluidas() {
    fetch('http://127.0.0.1:3000/occurrencesDistritoActive/', {
        headers: { 'Content-Type': 'application/json' },
        method: 'GET',
    })
        .then(res => res.json())
        .then((out) => {
            console.log(out);
            let mapa = out;
            let viana_castelo = 0;
            let braga = 0;
            let vila_real = 0;
            let braganca = 0;
            let porto = 0;
            let viseu = 0;
            let aveiro = 0;
            let guarda = 0;
            let coimbra = 0;
            let castelo_branco = 0;
            let leiria = 0;
            let santarem = 0;
            let portalegre = 0;
            let lisboa = 0;
            let setubal = 0;
            let evora = 0;
            let beja = 0;
            let faro = 0;
            let madeira = 0;
            let acores = 0;

            let tamanho = mapa.length;
            for (let i = 0; i < tamanho; i++) {
                if (mapa[i].distrito == "Viana do Castelo") {
                    viana_castelo = mapa[i].nmr_ocor;
                }
                if (mapa[i].distrito == "Braga") {
                    braga = mapa[i].nmr_ocor;
                }
                if (mapa[i].distrito == "Vila Real") {
                    vila_real = mapa[i].nmr_ocor;
                }
                if (mapa[i].distrito == "Bragança") {
                    braganca = mapa[i].nmr_ocor;
                }
                if (mapa[i].distrito == "Porto") {
                    porto = mapa[i].nmr_ocor;
                }
                if (mapa[i].distrito == "Viseu") {
                    viseu = mapa[i].nmr_ocor;
                }
                if (mapa[i].distrito == "Aveiro") {
                    aveiro = mapa[i].nmr_ocor;
                }
                if (mapa[i].distrito == "Guarda") {
                    guarda = mapa[i].nmr_ocor;
                }
                if (mapa[i].distrito == "Coimbra") {
                    coimbra = mapa[i].nmr_ocor;
                }
                if (mapa[i].distrito == "Castelo Branco") {
                    castelo_branco = mapa[i].nmr_ocor;
                }
                if (mapa[i].distrito == "Leiria") {
                    leiria = mapa[i].nmr_ocor;
                }
                if (mapa[i].distrito == "Santarém") {
                    santarem = mapa[i].nmr_ocor;
                }
                if (mapa[i].distrito == "Portalegre") {
                    portalegre = mapa[i].nmr_ocor;
                }
                if (mapa[i].distrito == "Lisboa") {
                    lisboa = mapa[i].nmr_ocor;
                }
                if (mapa[i].distrito == "Setúbal") {
                    setubal = mapa[i].nmr_ocor;
                }
                if (mapa[i].distrito == "Évora") {
                    evora = mapa[i].nmr_ocor;
                }
                if (mapa[i].distrito == "Beja") {
                    beja = mapa[i].nmr_ocor;
                }
                if (mapa[i].distrito == "Faro") {
                    faro = mapa[i].nmr_ocor;
                }
            }



            //Mapa Porugal
            // Prepare demo data
            // Data is joined to map using value of 'hc-key' property by default.
            // See API docs for 'joinBy' for more info on linking data and map.

            var data = [
                ['pt-fa', faro],
                ['pt-li', lisboa],
                ['pt-av', aveiro],
                ['pt-vc', viana_castelo],
                ['pt-be', beja],
                ['pt-ev', evora],
                ['pt-se', setubal],
                ['pt-pa', portalegre],
                ['pt-sa', santarem],
                ['pt-br', braga],
                ['pt-le', leiria],
                ['pt-ba', braganca],
                ['pt-cb', castelo_branco],
                ['pt-gu', guarda],
                ['pt-co', coimbra],
                ['pt-po', porto],
                ['pt-vi', viseu],
                ['pt-vr', vila_real],
                ['pt-ma', madeira],
                ['pt-ac', acores]
            ];

            // Create the chart
            Highcharts.mapChart('mapaPortugal', {
                chart: {
                    map: 'countries/pt/pt-all'
                },

                title: {
                    text: 'Ocorrências por Distrito'

                },

                subtitle: {
                    text: 'Mapa de: <a href="http://code.highcharts.com/mapdata/countries/pt/pt-all.js">Portugal</a>'
                },

                mapNavigation: {
                    enabled: true,
                    buttonOptions: {
                        verticalAlign: 'bottom'
                    }
                },

                colorAxis: {
                    min: 0
                },

                series: [{
                    data: data,
                    name: 'Ocorrências',
                    states: {
                        hover: {
                            color: '#BADA55'
                        }
                    },
                    dataLabels: {
                        enabled: true,
                        format: '{point.name}'
                    }
                }, {
                    name: 'Separators',
                    type: 'mapline',
                    data: Highcharts.geojson(Highcharts.maps['countries/pt/pt-all'], 'mapline'),
                    color: 'silver',
                    nullColor: 'silver',
                    showInLegend: false,
                    enableMouseTracking: false
                }]
            });

        })




}


//Concluídas
function MapaPortugalConcluidas() {
    fetch('http://127.0.0.1:3000/occurrencesDistritoFinished/', {
        headers: { 'Content-Type': 'application/json' },
        method: 'GET',
    })
        .then(res => res.json())
        .then((out) => {
            console.log(out);
            let mapa = out;
            let viana_castelo = 0;
            let braga = 0;
            let vila_real = 0;
            let braganca = 0;
            let porto = 0;
            let viseu = 0;
            let aveiro = 0;
            let guarda = 0;
            let coimbra = 0;
            let castelo_branco = 0;
            let leiria = 0;
            let santarem = 0;
            let portalegre = 0;
            let lisboa = 0;
            let setubal = 0;
            let evora = 0;
            let beja = 0;
            let faro = 0;
            let madeira = 0;
            let acores = 0;

            let tamanho = mapa.length;
            for (let i = 0; i < tamanho; i++) {
                if (mapa[i].distrito == "Viana do Castelo") {
                    viana_castelo = mapa[i].nmr_ocor;
                }
                if (mapa[i].distrito == "Braga") {
                    braga = mapa[i].nmr_ocor;
                }
                if (mapa[i].distrito == "Vila Real") {
                    vila_real = mapa[i].nmr_ocor;
                }
                if (mapa[i].distrito == "Bragança") {
                    braganca = mapa[i].nmr_ocor;
                }
                if (mapa[i].distrito == "Porto") {
                    porto = mapa[i].nmr_ocor;
                }
                if (mapa[i].distrito == "Viseu") {
                    viseu = mapa[i].nmr_ocor;
                }
                if (mapa[i].distrito == "Aveiro") {
                    aveiro = mapa[i].nmr_ocor;
                }
                if (mapa[i].distrito == "Guarda") {
                    guarda = mapa[i].nmr_ocor;
                }
                if (mapa[i].distrito == "Coimbra") {
                    coimbra = mapa[i].nmr_ocor;
                }
                if (mapa[i].distrito == "Castelo Branco") {
                    castelo_branco = mapa[i].nmr_ocor;
                }
                if (mapa[i].distrito == "Leiria") {
                    leiria = mapa[i].nmr_ocor;
                }
                if (mapa[i].distrito == "Santarém") {
                    santarem = mapa[i].nmr_ocor;
                }
                if (mapa[i].distrito == "Portalegre") {
                    portalegre = mapa[i].nmr_ocor;
                }
                if (mapa[i].distrito == "Lisboa") {
                    lisboa = mapa[i].nmr_ocor;
                }
                if (mapa[i].distrito == "Setúbal") {
                    setubal = mapa[i].nmr_ocor;
                }
                if (mapa[i].distrito == "Évora") {
                    evora = mapa[i].nmr_ocor;
                }
                if (mapa[i].distrito == "Beja") {
                    beja = mapa[i].nmr_ocor;
                }
                if (mapa[i].distrito == "Faro") {
                    faro = mapa[i].nmr_ocor;
                }
            }



            //Mapa Porugal
            // Prepare demo data
            // Data is joined to map using value of 'hc-key' property by default.
            // See API docs for 'joinBy' for more info on linking data and map.

            var data = [
                ['pt-fa', faro],
                ['pt-li', lisboa],
                ['pt-av', aveiro],
                ['pt-vc', viana_castelo],
                ['pt-be', beja],
                ['pt-ev', evora],
                ['pt-se', setubal],
                ['pt-pa', portalegre],
                ['pt-sa', santarem],
                ['pt-br', braga],
                ['pt-le', leiria],
                ['pt-ba', braganca],
                ['pt-cb', castelo_branco],
                ['pt-gu', guarda],
                ['pt-co', coimbra],
                ['pt-po', porto],
                ['pt-vi', viseu],
                ['pt-vr', vila_real],
                ['pt-ma', madeira],
                ['pt-ac', acores]
            ];

            // Create the chart
            Highcharts.mapChart('mapaPortugal', {
                chart: {
                    map: 'countries/pt/pt-all'
                },

                title: {
                    text: 'Ocorrências por Distrito'

                },

                subtitle: {
                    text: 'Mapa de: <a href="http://code.highcharts.com/mapdata/countries/pt/pt-all.js">Portugal</a>'
                },

                mapNavigation: {
                    enabled: true,
                    buttonOptions: {
                        verticalAlign: 'bottom'
                    }
                },

                colorAxis: {
                    min: 0
                },

                series: [{
                    data: data,
                    name: 'Ocorrências',
                    states: {
                        hover: {
                            color: '#BADA55'
                        }
                    },
                    dataLabels: {
                        enabled: true,
                        format: '{point.name}'
                    }
                }, {
                    name: 'Separators',
                    type: 'mapline',
                    data: Highcharts.geojson(Highcharts.maps['countries/pt/pt-all'], 'mapline'),
                    color: 'silver',
                    nullColor: 'silver',
                    showInLegend: false,
                    enableMouseTracking: false
                }]
            });

        })




}
}