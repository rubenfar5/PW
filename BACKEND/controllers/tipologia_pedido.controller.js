//ligação ficheiro da base de dados
const bd = require("../config/bd");
//ligação ficheiro de mensagens json
const jsonMessagesPath = __dirname + "/../assets/";
const jsonMessages = require(jsonMessagesPath + "db");

//Ver tipologias de pedido
function VerTipologiaPedidos(req, res){
    const query = bd.con.query('SELECT * FROM tipologia_pedido',
    function(err, rows, fields) {
        if (err) {
            console.log(err);
            res.status(jsonMessages.db.dbError.status).send(jsonMessages.db.dbError);
        }
        else {
            if (rows.length == 0) {
                res.status (jsonMessages.db.noRecords.status).send(jsonMessages.db.noRecords);
            }
            else {
                res.send(rows);
            }
        }
    });
};

// ver tipologias de pedido por Id
function verTipologiaPedidosId (req, res) {
    const id = req.params.id;
   
    const query = bd.con.query('SELECT * FROM tipologia_pedido WHERE id_tipologia_pedido = ?', id,
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
    VerTipologiaPedidos: VerTipologiaPedidos,
    verTipologiaPedidosId: verTipologiaPedidosId,
}