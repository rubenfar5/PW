//ligação ficheiro da base de dados
const bd = require("../config/bd");
//ligação ficheiro de mensagens json
const jsonMessagesPath = __dirname + "/../assets/";
const jsonMessages = require(jsonMessagesPath + "db");

//ver todos os servicos

function verServicos(req, res) {

    const query = bd.con.query('SELECT id_servico, id_dificuldade, id_tipo_servico FROM servico',
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
                    res.send(rows);
                }
            }
        });
};


//Selecionar servicos pelo ID ! 
function verServicoId(req, res) {
    const id = req.params.id;
    const post = {
        id_servico: id
    };

    var query = "SELECT id_servico, id_dificuldade, id_tipo_servico FROM servico WHERE ?";

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

function verServiçosComboBox(req, res) {
    query = "SELECT S.id_servico, TS.descricao_tipo_servico FROM tipo_servico TS, servico S WHERE TS.id_tipo_servico = S.id_tipo_servico";
    bd.con.query(query,
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

function descobrirServiço(req, res) {
    const id = req.params.id;
    const post = [
        id
    ];
    query="SELECT TS.descricao_tipo_servico FROM tipo_servico TS, servico S, ocorrencia O, pedido P WHERE O.id_ocorrencia = ? AND O.id_pedido = P.id_pedido AND P.id_servico = S.id_servico AND  S.id_tipo_servico = TS.id_tipo_servico";
    bd.con.query(query, post,
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
                    return res.json(rows[0]);
                }
            }
        });
}

function adicionarServico(req, res) {

    let id_dificuldade = req.body.id_dificuldade;
    let id_tipo_servico = req.body.id_tipo_servico;
    let descricao_tipo_servico = req.body.descricao_tipo_servico;

    let inserir_tipo_servico = [
        descricao_tipo_servico
    ]

    if (id_dificuldade == 1 || id_dificuldade == 2 || id_dificuldade == 3 || id_dificuldade == 4 || id_dificuldade == 5) {
    console.log(inserir_tipo_servico);

    let novo_tipo_servico = "INSERT INTO tipo_servico SET descricao_tipo_servico = ?";

    bd.con.query(novo_tipo_servico, inserir_tipo_servico, 
        function(err, rows, fields) {
        if (err) {
            res.status(jsonMessages.db.dbError.status).send(jsonMessages.db.dbError);
        }
        else {
            let tipo_servico = "SELECT id_tipo_servico FROM tipo_servico WHERE (descricao_tipo_servico = ?)";

            bd.con.query(tipo_servico, inserir_tipo_servico, function(err, rows, fields){
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
                        id_tipo_servico = rows[0].id_tipo_servico;
                        console.log(id_tipo_servico);
        
                        let query = "INSERT INTO servico SET id_dificuldade = ?, id_tipo_servico = ?"; 
        
                        let inserir = [
                            id_dificuldade,
                            id_tipo_servico
                        ];
                    
                        console.log(inserir);
                    
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
    });
} else {
    res.status(jsonMessages.db.dbError.status).send(jsonMessages.db.dbError);
} 
}





















//Funcao de alterar servico 
function alterarServicoID(req, res) {

    let id = req.params.id;
    let id_dificuldade = req.body.id_dificuldade;
    let id_tipo_servico = req.body.id_tipo_servico;

    let alterar = [
        id_dificuldade,
        id_tipo_servico,
        id,
    ];

    let query = "UPDATE servico SET id_dificuldade = ?, id_tipo_servico = ? WHERE id_servico = ?";
    bd.con.query(query, alterar,
        function (err, rows, fields) {
            if (!err) {
                console.log("Number of records updated: " + rows.affectedRows);
                res.status(200).send({ "msg": "update with success" });
            } else {
                res.status(400).send({ "msg": err.code });
                console.log('Error while performing Query.', err);
            }
        });
}


//delete logico
function apagarServico(req, res) {
    const update = [1,
        req.params.id
    ];
    const query = bd.con.query('UPDATE servico SET eliminado = ? WHERE id_servico=?', update, function (err, rows, fields) {
        if (!err) {
            res.status(jsonMessages.db.successDelete.status).send(jsonMessages.db.successDelete);
        }
        else {
            console.log(err);
            res.status(jsonMessages.db.dbError.status).send(jsonMessages.dbError);
        }
    });
}

module.exports = {
    verServicos: verServicos,
    verServicoId: verServicoId,
    adicionarServico: adicionarServico,
    alterarServicoID: alterarServicoID,
    apagarServico: apagarServico,
    verServiçosComboBox: verServiçosComboBox,
    descobrirServiço: descobrirServiço,
}