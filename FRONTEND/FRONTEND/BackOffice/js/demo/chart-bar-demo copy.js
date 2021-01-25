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










