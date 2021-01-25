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
