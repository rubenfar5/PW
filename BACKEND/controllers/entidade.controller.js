//ligação ficheiro da base de dados
const bd = require("../config/bd");

//ligação ficheiro de mensagens json
const jsonMessagesPath = __dirname + "/../assets/";
const jsonMessages = require(jsonMessagesPath + "db");


//Ver todos as Entidades
function verEntidades(req, res) {

    bd.con.query('SELECT id_entidade, id_local, tipo, entidade FROM entidade WHERE eliminado = 0', 
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

//Selecionar Entidade pelo ID ! 
function verEntidadeID(req, res) {
    const id = req.params.id;
    const post = {
        id_entidade: id
    };

    var query = "SELECT id_entidade, id_local, tipo, entidade FROM entidade WHERE ? and eliminado = 0";

    bd.con.query(query, post,
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


function verEntidadesTabela(req, res) {

    bd.con.query('SELECT E.id_entidade, E.entidade, L.distrito, L.concelho, L.morada, E.tipo FROM entidade E, localizacao L WHERE E.eliminado = 0 and E.id_local = L.id_local',
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


//Funcao de criar Entidades 
function registarEntidade(req, res) {

    let id_local; 
    let morada = req.body.morada;
    let distrito = req.body.distrito;
    let concelho = req.body.concelho;
    let tipo = req.body.tipo;
    let entidade = req.body.entidade;
   
    let inserir_local = [
        morada, 
        distrito, 
        concelho
    ]

    console.log(inserir_local);

    let novo_local = "INSERT INTO localizacao SET morada=?, distrito=?, concelho=?";

    bd.con.query(novo_local, inserir_local, 
        function(err, rows, fields) {
        if (err) {
            console.log(err);
            res.status(jsonMessages.db.dbError.status).send(jsonMessages.db.dbError);
        }
        else {
            //id_local=rows[0].id_local;
            //console.log(rows);
            //id_local = novo_local.rows[0];
        }
    });


    let local = "SELECT id_local FROM localizacao WHERE (morada = ? and distrito = ? and concelho = ?)";

    bd.con.query(local, inserir_local, function(err, rows, fields){
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
                id_local = rows[0].id_local;
                console.log(id_local);

                let query = "INSERT INTO entidade SET tipo=?, entidade=?, id_local=?";

                let inserir = [
                    tipo,
                    entidade,
                    id_local,
                ];
            
                //console.log(inserir);
            
                bd.con.query(query, inserir, 
                    function(err, rows, fields) {
                    if (!err) {
                        res.status(jsonMessages.db.successInsert.status).location(rows.insertId).send(jsonMessages.db.successInsert);
                    }
                    else {
                        console.log(err);
                        res.status(jsonMessages.db.dbError.status).send(jsonMessages.db.dbError);
                    }
                });

            }
        }
    });
}

//Funcao de alterar Entidades ! 
function alterarEntidade(req, res) {

    const id = req.params.id;
    let tipo = req.body.tipo;
    let entidade = req.body.entidade;

    let alterar = [     
        tipo,
        entidade,
        id
    ];

    var query = "UPDATE entidade SET tipo = ?, entidade = ? WHERE id_entidade = ?";
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


//Remover entidade selecionada pelo ID!
function removerEntidade(req, res) {
    const id = req.params.id;
    
    const remover = [
        1, 
        id
    ];
       

    var query = "UPDATE entidade SET eliminado = ? WHERE id_entidade = ?";

    bd.con.query(query, remover,
        function(err, rows, fields) {
        if (!err) {
            res.status(jsonMessages.db.successDeleteU.status).send(jsonMessages.db.successDeleteU);
        }
        else {
            console.log(err);
            res.status(jsonMessages.db.dbError.status).send(jsonMessages.db.dbError);
        }
    });
}

module.exports = {
    verEntidades: verEntidades,
    verEntidadeID: verEntidadeID,
    registarEntidade: registarEntidade,
    alterarEntidade: alterarEntidade,
    removerEntidade: removerEntidade,
    verEntidadesTabela: verEntidadesTabela,
}

