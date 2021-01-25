//ligação ficheiro da base de dados
const bd = require("../config/bd");
//ligação ficheiro de mensagens json
const jsonMessagesPath = __dirname + "/../assets/";
const jsonMessages = require(jsonMessagesPath + "db");

//ver subtipo de pedidos existentes

function verSubtipoPedido(req, res){
    const query = bd.con.query('SELECT * FROM subtipo_pedido',
    function(err, rows, fields) {
        //se detetar erro, envia mensagem de erro
        if (err) {
            console.log(err);
            res.status(jsonMessages.db.dbError.status).send(jsonMessages.db.dbError);
        }
        else {
            //se a bd estiver vazia, notifica-nos
            if (rows.length == 0) {
                res.status(jsonMessages.db.noRecords.status).send(jsonMessages.db.noRecords);
            }
            else {
                //mostra o conteudo da bd
                res.send(rows);
            }
        }
    });
};

//Ver subtipos de pedidos pelo ID 
function verSubtipoPedidoId (req, res) {
    const id = req.params.id;

    const query = bd.con.query('SELECT * from subtipo_pedido where id_subtipo_pedido = ?', id, 
    function (err, rows, fields) {

        if (err) {
            console.log(err);
            res.status(jsonMessages.db.dbError.status).send(jsonMessages.db.dbError);
        }
        else {
            if (rows.length == 0) {
                res.status (jsonMessages.db.noRecords.status).send(jsonMessages.db.noRecords);
            }
            else {
                return res.json(rows[0]);
            }
        }
    });
};


module.exports = {
    verSubtipoPedido: verSubtipoPedido,
    verSubtipoPedidoId: verSubtipoPedidoId,
}