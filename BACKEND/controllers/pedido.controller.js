//ligação ficheiro da base de dados
const bd = require("../config/bd");
//ligação ficheiro de mensagens json
const jsonMessagesPath = __dirname + "/../assets/";
const jsonMessages = require(jsonMessagesPath + "db");

//Ver todos os pedidos
function verPedidos(req, res) {

    bd.con.query('SELECT id_pedido, via, id_tipologia_pedido, nome, id_local, descricao_pedido, id_tipo_pedido, id_subtipo_pedido, lesados, data, id_entidade, email FROM pedido WHERE eliminado = 0',
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

//Selecionar Entidade pelo ID ! 
function verPedidosID(req, res) {
    const id = req.params.id;
    const post = {
        id_pedido: id
    };

    var query = "SELECT id_pedido, via, id_tipologia_pedido, nome, id_local, descricao_pedido, id_tipo_pedido, id_subtipo_pedido, lesados, data, id_entidade, email FROM pedido WHERE ? AND eliminado = 0";

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

function verPedidosTabela(req, res) {

    bd.con.query('SELECT P.id_pedido, P.nome, E.entidade, L.distrito, P.via, P.email, P.lesados, T.descricao_tipo_pedido, S.descricao_subtipo, TP.descricao_tipologia_pedido, P.descricao_pedido, date_format(P.data, "%d/%m/%Y %H:%i ") as dataFormatada FROM pedido P, entidade E, localizacao L, subtipo_pedido S, tipo_pedido T, tipologia_pedido TP WHERE P.eliminado = 0 AND E.id_entidade = P.id_entidade AND L.id_local = P.id_local AND S.id_subtipo_pedido = P.id_subtipo_pedido AND T.id_tipo_pedido = P.id_tipo_pedido AND TP.id_tipologia_pedido = P.id_tipologia_pedido',
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


function selecionarIdLocal(req, res) {
    const id = req.params.id;
    const post = {
        id_pedido: id
    };
    
    let query = "SELECT L.distrito, L.concelho, L.morada FROM pedido P, localizacao L WHERE  P.id_local = L.id_local AND ?";

    

    bd.con.query(query, post,
        function(err, rows, filds){
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
        })
}
//Funcao de criar Pedido
function registarPedido(req, res) {

    let via = req.body.via;
    let nome = req.body.nome;
    let id_local;
    let morada = req.body.morada;
    let distrito = req.body.distrito;
    let concelho = req.body.concelho;
    let descricao_pedido = req.body.descricao_pedido;
    let id_tipo_pedido = "3";
    let id_subtipo_pedido = req.body.id_subtipo_pedido;
    let lesados = req.body.lesados;
    let id_entidade = req.body.id_entidade;
    let email = req.body.email;


    let inserir_local = [
        morada,
        distrito,
        concelho
    ]

    console.log(inserir_local);

    let novo_local = "INSERT INTO localizacao SET morada=?, distrito=?, concelho=?";

    bd.con.query(novo_local, inserir_local,
        function (err, rows, fields) {
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

    bd.con.query(local, inserir_local, function (err, rows, fields) {
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

                let query = "INSERT INTO pedido SET via=?, nome=?, id_local=?, descricao_pedido=?, id_tipo_pedido=?,id_subtipo_pedido=?, lesados=?, id_entidade=?, email=?";

                let inserir = [
                    via,
                    nome,
                    id_local,
                    descricao_pedido,
                    id_tipo_pedido,
                    id_subtipo_pedido,
                    lesados,
                    id_entidade,
                    email,
                ];

                console.log(inserir);

                bd.con.query(query, inserir,
                    function (err, rows, fields) {
                        if (!err) {
                            res.status(jsonMessages.db.successInsert.status).send(jsonMessages.db.successInsert);
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


//Funcao de alterar pedidos ! 
function alterarPedidoID(req, res) {
    //id do pedido a mudar
    let id = req.params.id;
    //campos a alterar
    let nome = req.body.nome;
    let id_subtipo_pedido = req.body.id_subtipo_pedido;
    let lesados = req.body.lesados;

    let alterar = [
        nome,
        id_subtipo_pedido,
        lesados,
        id
    ];

    console.log(alterar);

    var query = "UPDATE pedido SET nome=?, id_subtipo_pedido=?, lesados=? WHERE id_pedido = ?";
    bd.con.query(query, alterar,
        function (err, rows, fields) {

            if (!err) {
                res.status(jsonMessages.db.successUpdate.status).send(jsonMessages.db.successUpdate);
            } else {
                console.log(err);
                            res.status(jsonMessages.db.dbError.status).send(jsonMessages.db.dbError);
            }
        });
}

//Remover pedido selecionado pelo ID!
function removerPedidoID(req, res) {
    let id = req.params.id;

    const remover = [
        1,
        id
    ];


    var query = "UPDATE pedido SET eliminado = ? WHERE id_pedido = ?";

    bd.con.query(query, remover,
        function (err, rows, fields) {
            if (!err) {
                res.status(jsonMessages.db.successDeleteU.status).send(jsonMessages.db.successDeleteU);
            }
            else {
                console.log(err);
                res.status(jsonMessages.db.dbError.status).send(jsonMessages.db.dbError);
            }
        });
}

function converterPedidoID(req, res) {
    let id = req.params.id;
    let id_entidade = "";
    let id_local = "";
    let grauocorrencia = req.body.id_nivel;
    let id_servico = req.body.id_servico;

    const converter = [
        id_servico,
        id
    ];

    let query = "UPDATE pedido SET id_tipo_pedido = 1, id_servico = ?, eliminado = 1 WHERE id_pedido = ? AND eliminado = 0";

    bd.con.query(query, converter,
        function (err, rows, fields) {
            if (!err) {
                //console.log("Number of records updated: " + rows.affectedRows);
                // res.status(200).send({ "msg": "Pedido convertido com sucesso" });
                let query_dois = "SELECT id_entidade, id_local FROM pedido WHERE id_pedido = ?"
                bd.con.query(query_dois, id,
                    function (err, rows, fields) {
                        if (err) {
                            console.log(err);
                            res.status(jsonMessages.db.dbError.status).send(jsonMessages.db.dbError);
                        }
                        else {

                            id_entidade = rows[0].id_entidade;
                            id_local = rows[0].id_local;

                            let inserir = [
                                id,
                                id_entidade,
                                id_local,
                                grauocorrencia
                            ]
                            let query_tres = "INSERT INTO ocorrencia SET id_pedido = ?, id_entidade = ?, id_local=?, id_nivel= ?, id_estado = 3"

                            bd.con.query(query_tres, inserir,
                                function (err, rows, fields) {
                                    if (!err) {
                                        res.status(jsonMessages.db.successInsert.status).location(rows.insertId).send(jsonMessages.db.successInsert);
                                    }
                                    else {
                                        console.log(err);
                                        res.status(jsonMessages.db.dbError.status).send(jsonMessages.db.dbError);
                                    }
                                });
                        }

                    });
            } else {
                res.status(400).send({ "msg": err.code });
                console.log('Error while performing Query.', err);
            }
        });

}



function validarPedidoID(req, res) {
    let id = req.params.id;
    var id_tipologia_pedido = req.body.id_tipologia_pedido;

    const validar = [
        id_tipologia_pedido,
        id
    ];

    var query = "UPDATE pedido SET id_tipologia_pedido = ?, id_tipo_pedido = 2 WHERE id_pedido = ? AND eliminado = 0";

    bd.con.query(query, validar,
        function (err, rows, fields) {
            if (!err) {
                res.status(jsonMessages.db.successUpdate.status).send(jsonMessages.db.successUpdate);
            } else {
                console.log(err);
                res.status(jsonMessages.db.dbError.status).send(jsonMessages.db.dbError);
            }
        });
}



function numeroPedidosTratados(req, res) {

    const query = bd.con.query('SELECT COUNT(id_pedido) as tratados FROM pedido WHERE id_tipo_pedido = 1', function (err, rows, fields) {

        if (!err) {
            return res.json(rows[0]);
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

function percentagemPedidosFalsos(req, res) {

    let totalFalsos;
    let total;
    let percentagem;
    const query1 = bd.con.query('SELECT COUNT(id_pedido) as PedidosFalsos FROM pedido WHERE id_tipologia_pedido = 1', function (err, rows, fields) {

        if (!err) {

            totalFalsos = rows[0].PedidosFalsos;
            console.log(totalFalsos);

            const query2 = bd.con.query('SELECT COUNT(id_pedido) as Pedidos FROM pedido', function (err, rows, fields) {

                if (!err) {
                    total = rows[0].Pedidos;
                    //console.log(total);
                    percentagem = totalFalsos * 100 / total;
                    //console.log(percentagem);
                    return res.json(percentagem.toFixed() + '%');
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



function numeroPedidosFalsos(req, res) {

    const query = bd.con.query('SELECT COUNT(id_pedido) as falsos FROM pedido WHERE id_tipologia_pedido = 1', function (err, rows, fields) {

        if (!err) {
            return res.json(rows[0]);
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



function numeroTotalPedidos(req, res) {

    const query = bd.con.query('SELECT COUNT(id_pedido) as total FROM pedido', function (err, rows, fields) {

        if (!err) {
            return res.json(rows[0]);
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



function numeroPedidosPendentes(req, res) {

    const query = bd.con.query('SELECT COUNT(id_pedido) as pendentes FROM pedido WHERE id_tipo_pedido = 3', function (err, rows, fields) {

        if (!err) {
            return res.json(rows[0]);
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

function numeroPedidosUrgentes(req, res) {

    const query = bd.con.query('SELECT COUNT(id_pedido) as urgentes FROM pedido WHERE id_tipologia_pedido = 2', function (err, rows, fields) {

        if (!err) {
            return res.json(rows[0]);
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

    verPedidos: verPedidos,
    verPedidosID: verPedidosID,
    registarPedido: registarPedido,
    alterarPedidoID: alterarPedidoID,
    removerPedidoID: removerPedidoID,
    converterPedidoID: converterPedidoID,
    validarPedidoID: validarPedidoID,
    numeroPedidosTratados: numeroPedidosTratados,
    percentagemPedidosFalsos: percentagemPedidosFalsos,
    numeroPedidosFalsos: numeroPedidosFalsos,
    numeroTotalPedidos: numeroTotalPedidos,
    numeroPedidosPendentes: numeroPedidosPendentes,
    verPedidosTabela: verPedidosTabela,
    selecionarIdLocal: selecionarIdLocal,
    numeroPedidosUrgentes: numeroPedidosUrgentes,

}


