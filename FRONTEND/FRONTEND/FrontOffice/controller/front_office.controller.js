let utilizador;

window.onload = function () {
  cbmBoxEntidades();
  criarGrafico();

  const btnLogin = document.getElementById("btnLogin");

  const btnRecuperarSenha = document.getElementById("recuperarSenha");

  // Autenticar administrador na área privada
  btnLogin.addEventListener("click", function () {
    utilizador = document.getElementById('username').value;
    //data
    var data = {};
    data.username = document.getElementById('username').value;
    data.password = document.getElementById('password').value;
    fetch('http://127.0.0.1:3000/signin/', {
      headers: { 'Content-Type': 'application/json' },
      method: "POST",
      body: JSON.stringify(data)
    })
      .then(res => res.json())
      .then((out) => {
         if (out.msg == "Invalid") {
          swal.fire({
            icon: "error",
            title: "Erro!",
            title: "Username ou password inválidos"
          })
        }
        else {
          fetch('http://127.0.0.1:3000/users/' + utilizador, {
            headers: { 'Content-Type': 'application/json' },
            method: "GET",
          })
            .then(res => res.json())
            .then((out) => {
              localStorage.setItem("User", out.username);
              swal.fire({
                icon: "success",
                title: "Êxito!",
                title: "Autenticação feita com sucesso!"
              }).then(function () {
                window.location.replace("../BackOffice/index.html");
              })
            })
            .catch(error => {
              console.log(error);
            })
        }
      })
      .catch(error => {
        console.log(error);
      })
  });

  btnRecuperarSenha.addEventListener("click", function () {
    let username = document.getElementById('usernameRecuperar').value;
    let email_utilizador = document.getElementById('emailRecuperar').value;
    //verificação 
    fetch('http://127.0.0.1:3000/users/' + username, {
      headers: { 'Content-Type': 'application/json' },
      method: "Get",
    }).then(res => res.json())
      .then((out) => {
        console.log(out);
        if(out.id_cargo != 3) {
          swal.fire({
            icon: "error",
            title: "Erro!",
            title: "Utilizador sem acesso à Área Reservada"
          })
        } 
        else if (out.email_utilizador == email_utilizador) {
          fetch('http://127.0.0.1:3000/usersNewPassword/' + email_utilizador, {
            headers: { 'Content-Type': 'application/json' },
            method: "PUT",
          })
            .then(res => res.json())
            .then((out) => {
              if (out.msg == "Invalid") {
                swal.fire({
                  icon: "error",
                  title: "Erro!",
                  title: "Email inválido"
                })
              }
              else {
                swal.fire({
                  icon: "success",
                  title: "SUCESSO!",
                  title: "Email de recuperação de password enviado!"
                })
              }
            })
            .catch(error => {
              console.log(error);
            })
        }
        else {
          swal.fire({
            icon: "error",
            title: "ERRO!",
            title: "Username e email inserido não coincidem!"
          })
        }
      })
      .catch(error => {
        console.log(error);
      })
  })

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

  $('#btnsubmeter').click(function () {
    let nome = document.getElementById("nome").value;
    let id_entidade = document.getElementById("id_entidade").value;
    let distrito = document.getElementById("district").value;
    let concelho = document.getElementById("locations").value;
    let morada = document.getElementById("morada").value;
    let email = document.getElementById("email").value;
    //  let telemovel = document.getElementById("telemovel").value;
    let lesados = document.getElementById("envolvidos").value;
    let descricao_pedido = document.getElementById("descricaoPedido").value;

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

    var filter = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
    if (!filter.test(email)) {
      swal.fire('Digite o email corretamente');
      document.getElementById("email").focus();
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
      data.via = "Email";
      data.nome = document.getElementById("nome").value;
      data.descricao_pedido = document.getElementById("descricaoPedido").value;
      data.id_subtipo_pedido = document.getElementById("id_subtipo_pedido").value;
      data.lesados = document.getElementById("envolvidos").value;
      data.id_entidade = document.getElementById("id_entidade").value;
      data.email = document.getElementById("email").value;
      data.morada = document.getElementById("morada").value;
      data.distrito = document.getElementById("district").value;
      data.concelho = document.getElementById("locations").value;
      //chamada fetch para envio dos dados para o servior via POST
      fetch('http://127.0.0.1:3000/solicitations/', {
        headers: { 'Content-Type': 'application/json' },
        method: 'POST',
        body: JSON.stringify(data)
      })
        .then(res => res.json())
        .then((out) => {
          //completar
          swal.fire({
            icon: "success",
            title: "Sucesso",
            text: "Pedido de ajuda submetido com sucesso!"
          }).then(function () {
            window.location.href = "./index.html";
          })

        })
        .catch(error => {
          console.log(error);
        })
    }
  });

  //Número de ocorrências nas últimas 24 horas
  fetch('http://127.0.0.1:3000/occurrencesLastDay/')
    .then(res => res.json())
    .then((out) => {
      ocorrenciasUltimas.innerText = out.nmr_ocor;

    })
    .catch(err => console.error(err));

  //Número de ocorrências ativas
  fetch('http://127.0.0.1:3000/occurrencesNumberRunning/')
    .then(res => res.json())
    .then((out) => {
      ocorrenciasAtivas.innerText = out.nmr_ocor;

    })
    .catch(err => console.error(err));

  //Número de ocorrências totais
  fetch('http://127.0.0.1:3000/occurrencesTotal/')
    .then(res => res.json())
    .then((out) => {
      ocorrenciasTotal.innerText = out.nmr_ocor;

    })
    .catch(err => console.error(err));

  //Número de ocorrências concluídas
  fetch('http://127.0.0.1:3000/occurrencesCompleted/')
    .then(res => res.json())
    .then((out) => {
      ocorrenciasCompletas.innerText = out.nmr_ocor;

    })
    .catch(err => console.error(err));


  //-----------------------------------------------------------------------------------------
  //Gráfico de barras
  //variável que carrega os dados da tabela

  let chartdateBar = [];


  //Número total de pedidos
  fetch('http://127.0.0.1:3000/solicitationsTotal/', {
    headers: { 'Content-Type': 'application/json' },
    method: 'GET',
  })
    .then(res => res.json())
    .then((out) => {
      chartdateBar.push(out.total);
      //Número de pedidos tratados
      fetch('http://127.0.0.1:3000/solicitationsTreated/', {
        headers: { 'Content-Type': 'application/json' },
        method: 'GET',
      })
        .then(res => res.json())
        .then((out) => {
          chartdateBar.push(out.tratados);
          //Número de pedidos pendentes
          fetch('http://127.0.0.1:3000/solicitationsWaiting/', {
            headers: { 'Content-Type': 'application/json' },
            method: 'GET',
          })
            .then(res => res.json())
            .then((out) => {
              chartdateBar.push(out.pendentes);
              //Número de pedidos falsos
              fetch('http://127.0.0.1:3000/solicitationsNumberFalse/', {
                headers: { 'Content-Type': 'application/json' },
                method: 'GET',
              })
                .then(res => res.json())
                .then((out) => {
                  chartdateBar.push(out.falsos);
                  //Número de pedidos urgentes
                  fetch('http://127.0.0.1:3000/solicitationsUrgency/', {
                    headers: { 'Content-Type': 'application/json' },
                    method: 'GET',
                  })
                    .then(res => res.json())
                    .then((out) => {
                      let total = out;
                      pedidos_urgentes = total.urgentes;
                      chartdateBar.push(pedidos_urgentes);
                      let maximo = chartdateBar[0];
                      // Set new default font family and font color to mimic Bootstrap's default styling
                      Chart.defaults.global.defaultFontFamily = '-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif';
                      Chart.defaults.global.defaultFontColor = '#292b2c';

                      // Bar Chart Example
                      var ctx = document.getElementById("myBarChart");
                      var myLineChart = new Chart(ctx, {
                        type: 'bar',
                        data: {
                          labels: [" Total", " Tratados", "Pendentes", "Falsos", "Urgentes"],
                          datasets: [{
                            label: "Pedidos",
                            backgroundColor: ["#015FA2", "#3596C0", "#3aa2cf", "#A3CFE1", "#D1EAF0"],
                            borderColor: "rgba(2,117,216,1)",
                            data: chartdateBar,
                          }],
                        },
                        options: {
                          scales: {
                            xAxes: [{
                              time: {
                                unit: 'month'
                              },
                              gridLines: {
                                display: false
                              },
                              ticks: {
                                maxTicksLimit: 6
                              }
                            }],
                            yAxes: [{
                              ticks: {
                                min: 0,
                                max: maximo + 10,
                                maxTicksLimit: 8
                              },
                              gridLines: {
                                display: true
                              }
                            }],
                          },
                          legend: {
                            display: false
                          }
                        }
                      });
                    })
                    .catch(err => console.error(err));
                })
                .catch(err => console.error(err));
            })
            .catch(err => console.error(err));
        })
        .catch(err => console.error(err));
    })
    .catch(err => console.error(err));


}

function criarGrafico() {
  let today = new Date();
  let diaSemana = [];
  switch (today.getDay()) {
    case 1: diaSemana.push("Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado", "Domingo");
      break;
    case 2: diaSemana.push("Terça", "Quarta", "Quinta", "Sexta", "Sábado", "Domingo", "Segunda");
      break;
    case 3: diaSemana.push("Quarta", "Quinta", "Sexta", "Sábado", "Domingo", "Segunda", "Terça");
      break;
    case 4: diaSemana.push("Quinta", "Sexta", "Sábado", "Domingo", "Segunda", "Terça", "Quarta");
      break;
    case 5: diaSemana.push("Sexta", "Sábado", "Domingo", "Segunda", "Terça", "Quarta", "Quinta");
      break;
    case 6: diaSemana.push("Sábado", "Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta");
      break;
    case 0: diaSemana.push("Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado");
      break;
  }

  let chartdate = [];


  fetch('http://127.0.0.1:3000/occurrencesweek/', {
    headers: { 'Content-Type': 'application/json' },
    method: 'GET',
  })
    .then(res => res.json())
    .then((out) => {
      let semana = out;
      let domingo = 0;
      let segunda = 0;
      let terça = 0;
      let quarta = 0;
      let quinta = 0;
      let sexta = 0;
      let sabado = 0;

      let tamanho = semana.length;
      for (let i = 0; i < tamanho; i++) {
        if (semana[i].dias_semana == "0") {
          domingo = semana[i].conta_dias_semana;
        }
        if (semana[i].dias_semana == "1") {
          segunda = semana[i].conta_dias_semana;
        }
        if (semana[i].dias_semana == "2") {
          terça = semana[i].conta_dias_semana;
        }
        if (semana[i].dias_semana == "3") {
          quarta = semana[i].conta_dias_semana;
        }
        if (semana[i].dias_semana == "4") {
          quinta = semana[i].conta_dias_semana;
        }
        if (semana[i].dias_semana == "5") {
          sexta = semana[i].conta_dias_semana;
        }
        if (semana[i].dias_semana == "6") {
          sabado = semana[i].conta_dias_semana;
        }
      }

      switch (today.getDay()) {
        case 1: chartdate.push(segunda, terça, quarta, quinta, sexta, sabado, domingo);
          break;
        case 2: chartdate.push(terça, quarta, quinta, sexta, sabado, domingo, segunda);
          break;
        case 3: chartdate.push(quarta, quinta, sexta, sabado, domingo, segunda, terça);
          break;
        case 4: chartdate.push(quinta, sexta, sabado, domingo, segunda, terça, quarta);
          break;
        case 5: chartdate.push(sexta, sabado, domingo, segunda, terça, quarta, quinta);
          break;
        case 6: chartdate.push(sabado, domingo, segunda, terça, quarta, quinta, sexta);
          break;
        case 0: chartdate.push(domingo, segunda, terça, quarta, quinta, sexta, sabado);
          break;
      }

      // Set new default font family and font color to mimic Bootstrap's default styling
      Chart.defaults.global.defaultFontFamily = 'Nunito', '-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif';
      Chart.defaults.global.defaultFontColor = '#a4a9ad';

      function number_format(number, decimals, dec_point, thousands_sep) {
        // *     example: number_format(1234.56, 2, ',', ' ');
        // *     return: '1 234,56'
        number = (number + '').replace(',', '').replace(' ', '');
        var n = !isFinite(+number) ? 0 : +number,
          prec = !isFinite(+decimals) ? 0 : Math.abs(decimals),
          sep = (typeof thousands_sep === 'undefined') ? ',' : thousands_sep,
          dec = (typeof dec_point === 'undefined') ? '.' : dec_point,
          s = '',
          toFixedFix = function (n, prec) {
            var k = Math.pow(10, prec);
            return '' + Math.round(n * k) / k;
          };
        // Fix for IE parseFloat(0.55).toFixed(0) = 0;
        s = (prec ? toFixedFix(n, prec) : '' + Math.round(n)).split('.');
        if (s[0].length > 3) {
          s[0] = s[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, sep);
        }
        if ((s[1] || '').length < prec) {
          s[1] = s[1] || '';
          s[1] += new Array(prec - s[1].length + 1).join('0');
        }
        return s.join(dec);
      }

      // Area Chart Example
      var ctx = document.getElementById("myAreaChart");
      var myLineChart = new Chart(ctx, {
        type: 'line',
        data: {
          labels: diaSemana,
          datasets: [{
            label: "Ocorrências",
            lineTension: 0.3,
            backgroundColor: "#F4EBFF",
            borderColor: "#C799FF",
            pointRadius: 3,
            pointBackgroundColor: "#F4EBFF",
            pointBorderColor: "#C799FF",
            pointHoverRadius: 3,
            pointHoverBackgroundColor: "#F4EBFF",
            pointHoverBorderColor: "#C799FF",
            pointHitRadius: 10,
            pointBorderWidth: 2,
            data: chartdate,
          }],
        },
        options: {
          maintainAspectRatio: false,
          layout: {
            padding: {
              left: 10,
              right: 25,
              top: 25,
              bottom: 0
            }
          },
          scales: {
            xAxes: [{
              time: {
                unit: 'date'
              },
              gridLines: {
                display: false,
                drawBorder: false
              },
              ticks: {
                maxTicksLimit: 7
              }
            }],
            yAxes: [{
              ticks: {
                maxTicksLimit: 5,
                padding: 10,
                // Include a dollar sign in the ticks
                callback: function (value, index, values) {
                  return '' + number_format(value);
                }
              },
              gridLines: {
                color: "rgb(234, 236, 244)",
                zeroLineColor: "rgb(234, 236, 244)",
                drawBorder: false,
                borderDash: [2],
                zeroLineBorderDash: [2]
              }
            }],
          },
          legend: {
            display: false
          },
          tooltips: {
            backgroundColor: "rgb(255,255,255)",
            bodyFontColor: "#a4a9ad",
            titleMarginBottom: 10,
            titleFontColor: '#6e707e',
            titleFontSize: 14,
            borderColor: '#dddfeb',
            borderWidth: 1,
            xPadding: 15,
            yPadding: 15,
            displayColors: false,
            intersect: false,
            mode: 'index',
            caretPadding: 10,
            callbacks: {
              label: function (tooltipItem, chart) {
                var datasetLabel = chart.datasets[tooltipItem.datasetIndex].label || '';
                return datasetLabel + ':' + number_format(tooltipItem.yLabel);
              }
            }
          }
        }
      });


    })
    .catch(err => console.error(err));
}
