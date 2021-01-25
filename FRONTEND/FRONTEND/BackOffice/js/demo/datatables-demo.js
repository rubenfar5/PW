fetch('http://127.0.0.1:3000/solicitationsTabel/', {
    headers: { 'Content-Type': 'application/json' },
    method: 'GET',
})
    .then(res => res.json())
    .then((out) => {
        let pedidos = out;
        let total = pedidos.length;
        let ultimo = total - 1;
        let penultimo = total - 2;
        let antepenultimo = total - 3;
        let array = [pedidos[ultimo], pedidos[penultimo], pedidos[antepenultimo]];
        // Call the dataTables jQuery plugin

        $(document).ready(function () {
            $('#dataTable').DataTable({
                paging: false,
                searching: false,
                info: false,
                data: array,
                columns: [
                    { data: 'id_pedido', title: 'ID' },
                    { data: 'nome', title: 'Autor' },
                    { data: 'entidade', title: 'Contacto' },
                    { data: 'distrito', title: 'Distrito' },

                ],
            });

        });
    })
    .catch(err => console.error(err));
