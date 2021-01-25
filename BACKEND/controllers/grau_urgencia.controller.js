//ligação ficheiro da base de dados
const bd = require("../config/bd");
//ligação ficheiro de mensagens json
const jsonMessagesPath = __dirname + "/../assets/";
const jsonMessages = require(jsonMessagesPath + "db");

//Ver todos os graus de urgencia

function verGrauUrgencia(req, res) {

    bd.con.query('SELECT * from grau_urgencia', 
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
}
//--------------------------------------
//Ver o grau de urgencia pelo ID

function verGrauUrgenciaID(req, res) {
    const id = req.params.id;

    const query = bd.con.query('SELECT * FROM grau_urgencia WHERE id_nivel = ?', id,
        function(err, rows, fields) {
        if (err) {
            console.log(err);
            res.status(jsonMessages.db.dbError.status).send(jsonMessages.db.dbError);
        }
        else {
            if (rows.length == 0) {
                res.status(jsonMessages.db.noRecords.status).send(jsonMessages.db.noRecords);
            }
            else {
                return res.json(rows[0]);
            }
        }
    });
}

module.exports = {
    verGrauUrgencia: verGrauUrgencia,
    verGrauUrgenciaID: verGrauUrgenciaID,
}