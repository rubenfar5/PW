//ligação ficheiro da base de dados
const bd = require("../config/bd");
//ligação ficheiro de mensagens json
const jsonMessagesPath = __dirname + "/../assets/";
const jsonMessages = require(jsonMessagesPath + "db");

//--------------------------------------
//Selecionar todos os Operacionais! 

function verOperacionais(req, res) {

    bd.con.query('SELECT id_operacional, username, disponibilidade, horario, pontos_gamificacao, id_equipa, id_cargo from operacional',
        function (err, rows, fields) {
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
//Selecionar Operacional pelo ID ! 

function verOperacionalID(req, res) {
    const id = req.params.id;
    const post = {
        id_operacional: id
    };

    const query = 'SELECT * FROM operacional WHERE ?'
    bd.con.query(query, post,
        function (err, rows, fields) {
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

//Tabela front de operacionais
function verOperacionaisTabela (req, res) {

    bd.con.query('SELECT O.id_operacional, O.username, U.nome, U.email_utilizador, O.disponibilidade, O.horario FROM operacional O, utilizador U WHERE O.username = U.username', 
    function (err, rows, fields) {
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
                return res.json(rows);
            }
        }
    });
}



//Funcao de alterar Operacionais 
function alterarOperacional(req, res) {

    const id = req.params.id;
    let disponibilidade = req.body.disponibilidade;
    //let horario = req.body.horario;

    let alterar = [     
       disponibilidade,
       id
    ];

    var query = "UPDATE operacional SET disponibilidade = ? WHERE id_operacional = ?";
    bd.con.query(query, alterar, 
        function(err, rows, fields) {
        if (!err) {
            console.log("Number of records updated: " + rows.affectedRows);
            res.status(200).send({"msg": "update with success"});
        } else {
            res.status(400).send({"msg": err.code});
            console.log('Error while performing Query.', err);
        }
    });
}

function dadosAlterar(req, res) {
    const id = req.params.id;
    let alterar = [     
        id
     ];

    let query = "SELECT U.nome, U.username, O.disponibilidade FROM operacional O, utilizador U WHERE U.username = O.username AND U.username = ?";

    bd.con.query(query, alterar, 
        function(err, rows, fields) {
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
                    return res.json(rows[0]);
                }
            }   
        });
}



module.exports = {
    verOperacionais: verOperacionais,
    //registarOperacionais: registarOperacionais,
    verOperacionalID: verOperacionalID,
    alterarOperacional: alterarOperacional,
    verOperacionaisTabela: verOperacionaisTabela,
    dadosAlterar: dadosAlterar,
}