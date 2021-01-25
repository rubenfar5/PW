// Set new default font family and font color to mimic Bootstrap's default styling
Chart.defaults.global.defaultFontFamily = '-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif';
Chart.defaults.global.defaultFontColor = '#292b2c';

let chardate;
// Bar Chart Example
let ctx = document.getElementById("myBarChart");
var myLineChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: [" Total", " Tratados", "Pendentes", "Falsos", "Urgentes"],
        datasets: [{
            label: "Pedidos",
            backgroundColor: ["#015FA2", "#3596C0", "#3aa2cf", "#A3CFE1", "#D1EAF0"],
            borderColor: "rgba(2,117,216,1)",
            data: chardate,
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
                    max: 200,
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