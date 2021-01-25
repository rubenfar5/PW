//ligação ficheiro da base de dados
const bd = require("../config/bd");
//ligação ficheiro de mensagens json
const jsonMessagesPath = __dirname + "/../assets/";
const jsonMessages = require(jsonMessagesPath + "db");

//--------------------------------------
//Ver todas as localizacoes  

function verLocalizacao(req, res) {

    bd.con.query('SELECT id_local, morada, freguesia, distrito, concelho FROM localizacao WHERE eliminado = 0',
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
//Ver a localizaçao pelo ID

function verLocalizacaoID(req, res) {
    const id = req.params.id;

    const query = bd.con.query('SELECT id_local, morada, freguesia, distrito, concelho FROM localizacao WHERE id_local = ? AND eliminado = 0', id,
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
//--------------------------------------
//Criar uma nova localizaçao  
function registarLocalizacao(req, res) {

    //receber os dados do formulario que sao enviados por post
    let morada = req.body.morada;
    let freguesia = req.body.freguesia;
    let distrito = req.body.distrito;
    let concelho = req.body.concelho;


    var query = "";

    var post = {
        morada: morada,
        freguesia: freguesia,
        distrito: distrito,
        concelho: concelho,

    }
    var query = bd.con.query("INSERT INTO localizacao SET ?", post, function (err, rows, fields) {
        if (!err) {
            res.status(200).location(rows.insertId).send({
                "msg": "inserted with success"
            });
            console.log("Number of records inserted: " + rows.affectedRows);
        } else {
            if (err.code == "ER_DUP_ENTRY") {
                res.status(409).send({ "msg": err.code });
                console.log('Error while performing Query.', err);
            } else res.status(400).send({ "msg": err.code });
        }


    });
}
//--------------------------------------
//alterar localizacao por id
function alterarLocalizacaoID(req, res) {
    //receber os dados do formulario que sao enviados por post
    let id = req.params.id;
    let morada = req.body.morada;
    let freguesia = req.body.freguesia;
    let distrito = req.body.distrito;
    let concelho = req.body.concelho;
    var query = "";

    var update = [
        morada,
        freguesia,
        distrito,
        concelho,
        id,
    ];

    query = bd.con.query('UPDATE localizacao SET morada = ?, freguesia =?, distrito=?, concelho=? where id_local=?', update,
        function (err, rows,
            fields) {
            if (!err) {
                console.log("Number of records updated: " + rows.affectedRows);
                res.status(200).send({ "msg": "update with success" });
            } else {
                res.status(400).send({ "msg": err.code });
                console.log('Error while performing Query.', err);
            }



        });
}

function regiaoNorte(req, res) {

    let numero;

    let regiao = [
        'Braga',
        'Viana do Castelo',
        'Porto',
        'Bragança',
        'Vila Real',
    ];
    const query = bd.con.query('SELECT COUNT(id_local) as Local FROM localizacao WHERE (distrito = ? or distrito = ? or distrito =? or distrito =? or distrito =?) AND eliminado = 0', regiao,
        function (err, rows, fields) {
            if (!err) {
                numero = rows[0].Local;
                return res.json(numero);
            } else {
                if (err) {
                    console.log(err);
                    res.status(jsonMessages.db.dbError.status).send(jsonMessages.db.dbError);
                }
                else {

                    if (rows.length == 0) {

                        res.status(jsonMessages.db.noRecords.status).send(jsonMessages.db.noRecords);
                    }
                }
            }
        });
}
function regiaoCentro(req, res) {

    let numero;

    let regiao = [
        'Coimbra',
        'Viseu',
        'Aveiro',
        'Covilhã',
        'Castelo Branco',
        'Caldas da Rainha',
        'Guarda',
        'Figueira da Foz',
        'Torres Vedras'
    ];
    const query = bd.con.query('SELECT COUNT(id_local) as Local FROM localizacao WHERE (distrito = ? or distrito = ? or distrito =? or distrito =? or distrito =? or distrito = ? or distrito =? or distrito =? or distrito=?) AND eliminado = 0', regiao,
        function (err, rows, fields) {
            if (!err) {
                numero = rows[0].Local;
                return res.json(numero);
            } else {
                if (err) {
                    console.log(err);
                    res.status(jsonMessages.db.dbError.status).send(jsonMessages.db.dbError);
                }
                else {

                    if (rows.length == 0) {

                        res.status(jsonMessages.db.noRecords.status).send(jsonMessages.db.noRecords);
                    }
                }
            }
        });
    }
        function regiaoLisboa(req, res) {

            let numero;
        
            let regiao = [
                'Lisboa',
                'Santarém',
                'Setúbal',
                'Leiria',
            ];
            const query = bd.con.query('SELECT COUNT(id_local) as Local FROM localizacao WHERE (distrito =? or distrito =? or distrito =?) AND eliminado = 0', regiao,
                function (err, rows, fields) {
                    if (!err) {
                        numero = rows[0].Local;
                        return res.json(numero);
                    } else {
                        if (err) {
                            console.log(err);
                            res.status(jsonMessages.db.dbError.status).send(jsonMessages.db.dbError);
                        }
                        else {
        
                            if (rows.length == 0) {
        
                                res.status(jsonMessages.db.noRecords.status).send(jsonMessages.db.noRecords);
                            }
                        }
                    }
                });
        
        
        }

function regiaoAlentejo(req, res) {

    let numero;

    let regiao = [
        'Portalegre',
        'Évora',
        'Beja',
        
    ];
    const query = bd.con.query('SELECT COUNT(id_local) as Local FROM localizacao WHERE (distrito =? or distrito =? or distrito =?) AND eliminado = 0', regiao,
        function (err, rows, fields) {
            if (!err) {
                numero = rows[0].Local;
                return res.json(numero);
            } else {
                if (err) {
                    console.log(err);
                    res.status(jsonMessages.db.dbError.status).send(jsonMessages.db.dbError);
                }
                else {

                    if (rows.length == 0) {

                        res.status(jsonMessages.db.noRecords.status).send(jsonMessages.db.noRecords);
                    }
                }
            }
        });


}
function regiaoAlgarve(req, res) {

    let numero;
    let regiao = [
        'Faro',
        
    ];
    const query = bd.con.query('SELECT COUNT(id_local) as Local FROM localizacao WHERE (distrito =?) AND eliminado = 0', regiao,
        function (err, rows, fields) {
            if (!err) {
                numero = rows[0].Local;
                return res.json(numero);
            } else {
                if (err) {
                    console.log(err);
                    res.status(jsonMessages.db.dbError.status).send(jsonMessages.db.dbError);
                }
                else {

                    if (rows.length == 0) {

                        res.status(jsonMessages.db.noRecords.status).send(jsonMessages.db.noRecords);
                    }
                }
            }
        }); 

    }

    
module.exports = {
    verLocalizacao: verLocalizacao,
    verLocalizacaoID: verLocalizacaoID,
    registarLocalizacao: registarLocalizacao,
    alterarLocalizacaoID: alterarLocalizacaoID,
    regiaoNorte: regiaoNorte,
    regiaoCentro: regiaoCentro,
    regiaoLisboa: regiaoLisboa,
    regiaoAlentejo: regiaoAlentejo,
    regiaoAlgarve: regiaoAlgarve, 
    

    
}
