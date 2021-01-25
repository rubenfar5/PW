//-----------------------------------------------------------------------------------------
//Gráfico de circular
//variável que carrega os dados da tabela
let chartDatePie = [];

//Número de ocorrências na região norte
fetch('http://127.0.0.1:3000/locationsNorth/', {
  headers: { 'Content-Type': 'application/json' },
  method: 'GET',
})
  .then(res => res.json())
  .then((out) => {
    chartDatePie.push(out);
    //Número de ocorrências na região centro
    fetch('http://127.0.0.1:3000/locationsCenter/', {
      headers: { 'Content-Type': 'application/json' },
      method: 'GET',
    })
      .then(res => res.json())
      .then((out) => {
        chartDatePie.push(out);
        //Número de ocorrências na região lisboa
        fetch('http://127.0.0.1:3000/locationsLisbon/', {
          headers: { 'Content-Type': 'application/json' },
          method: 'GET',
        })
          .then(res => res.json())
          .then((out) => {
            chartDatePie.push(out);
            //Número de ocorrências na região alentejo
            fetch('http://127.0.0.1:3000/locationsAlentejo/', {
              headers: { 'Content-Type': 'application/json' },
              method: 'GET',
            })
              .then(res => res.json())
              .then((out) => {
                chartDatePie.push(out);
                //Número de ocorrências na região algarve
                fetch('http://127.0.0.1:3000/locationsAlgarve/', {
                  headers: { 'Content-Type': 'application/json' },
                  method: 'GET',
                })
                  .then(res => res.json())
                  .then((out) => {
                    chartDatePie.push(out);
                    // Set new default font family and font color to mimic Bootstrap's default styling
                    Chart.defaults.global.defaultFontFamily = 'Nunito', '-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif';
                    Chart.defaults.global.defaultFontColor = '#a4a9ad';

                    // Pie Chart Example
                    var ctx = document.getElementById("myPieChart");
                    var myPieChart = new Chart(ctx, {
                      type: 'doughnut',
                      data: {
                        labels: ["Norte", "Centro", "Lisboa", "Alentejo", "Algarve"],
                        datasets: [{
                          data: chartDatePie,
                          backgroundColor: ["rgb(247, 186, 0)", 'rgb(255, 205, 112)', 'rgb(255, 214, 151)', 'rgb(242, 161, 106)', "rgb(237, 125, 49)", 'rgb(232, 91, 0)'],
                          hoverBackgroundColor: ["rgb(247, 186, 0)", 'rgb(255, 205, 112)', 'rgb(255, 214, 151)', 'rgb(242, 161, 106)', "rgb(237, 125, 49)", 'rgb(232, 91, 0)'],
                          hoverBorderColor: "rgb(247, 186, 0)",
                        }],
                      },
                      options: {
                        maintainAspectRatio: false,
                        tooltips: {
                          backgroundColor: "rgb(255,255,255)",
                          bodyFontColor: "#a4a9ad",
                          borderColor: '#dddfeb',
                          borderWidth: 1,
                          xPadding: 15,
                          yPadding: 15,
                          displayColors: false,
                          caretPadding: 10,
                        },
                        legend: {
                          display: false
                        },
                        cutoutPercentage: 80,
                      },
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











