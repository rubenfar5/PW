//ligação ficheiro da base de dados
const bd = require("../config/bd");
//ligação ficheiro de mensagens json
const jsonMessagesPath = __dirname + "/../assets/";
const jsonMessages = require(jsonMessagesPath + "db");
//const nodemailer = require('../node_modules/nodemailer');
const nodemailer = require('nodemailer');
//const SMTPTransport = require("nodemailer/lib/smtp-transport");
const { con } = require("../config/bd");
const SMTPTransport = require('nodemailer-smtp-transport');


//ver todas as ocorrencias
function verOcorrencias(req, res) {

    bd.con.query('SELECT id_ocorrencia, id_pedido, id_entidade, id_nivel, id_estado, id_local, id_equipa, id_gestor FROM ocorrencia WHERE eliminado = 0',
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
}


// ver ocorrencia por id 
function verOcorrenciasId(req, res) {
    const id = req.params.id;
    const post = {
        id_ocorrencia: id
    };

    let query = 'SELECT id_ocorrencia, id_pedido, id_entidade, id_nivel, id_estado, id_local, id_equipa, id_gestor from ocorrencia where ? AND eliminado = 0';

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

function verOcorrenciasTabela(req, res) {

    bd.con.query('SELECT O.id_ocorrencia, P.descricao_pedido, GO.username, date_format(O.data_ocorrencia, "%d/%m/%Y %H:%i ") as dataFormatada, E.entidade, G.descricao_urgencia, ES.descricao_estado, L.distrito FROM ocorrencia O, pedido P, entidade E, localizacao L, grau_urgencia G, estado ES, gestor_operacoes GO WHERE O.id_pedido = P.id_pedido AND O.id_entidade = E.id_entidade AND O.id_local = L.id_local AND O.id_nivel = G.id_nivel AND O.id_estado = ES.id_estado AND O.id_gestor = GO.id_gestor AND O.eliminado = 0',
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


function verOcorrenciasNaoConcluidas(req, res) {

    bd.con.query('SELECT O.id_ocorrencia, P.descricao_pedido, GO.username, date_format(O.data_ocorrencia, "%d/%m/%Y %H:%i ") as dataFormatada, E.entidade, G.descricao_urgencia, ES.descricao_estado, L.distrito FROM ocorrencia O, pedido P, entidade E, localizacao L, grau_urgencia G, estado ES, gestor_operacoes GO WHERE O.id_pedido = P.id_pedido AND O.id_entidade = E.id_entidade AND O.id_local = L.id_local AND O.id_nivel = G.id_nivel AND O.id_estado = ES.id_estado AND O.id_gestor = GO.id_gestor AND O.eliminado = 0 AND O.id_estado != 2',
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

function verLocalOcorrencia(req, res) {
    const id = req.params.id;
    const post = [
        id
    ];
    query = "SELECT L.distrito, L.concelho, L.morada FROM localizacao L, ocorrencia O WHERE O.id_local = L.id_local AND O.id_ocorrencia = ?";
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


function cbmBoxGestores(req, res) {
    query = "SELECT username, id_gestor FROM gestor_operacoes ";
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

function cbmBoxMateriais(req, res) {
    query = "SELECT id_material, nome_material FROM material ";
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

//Funcao de alterar ocorrencias 
function alterarOcorrencia(req, res) {

    let id = req.params.id;
    //let id_pedido = req.sanitize('id_pedido').escape();
    //let id_entidade = req.body.id_entidade;
    let id_nivel = req.body.id_nivel;
    //let id_estado = req.body.id_estado;
    //let id_local = req.sanitize('id_local').escape();

    let alterar = [

        id_nivel,
        //id_estado,
        id,
    ];

    if (id_nivel == 1 || id_nivel == 2 || id_nivel == 3 || id_nivel == 4 || id_nivel == 5) {
        //if (id_estado == 1 || id_estado == 2 || id_estado == 3) {
        let query = "UPDATE ocorrencia SET id_nivel = ? WHERE id_ocorrencia = ? AND eliminado = 0";

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
        // } else {
        //res.status(400).send({ "msg": 'Estado inserido inválido' });

        //  }
    } else {
        res.status(400).send({ "msg": 'Nivel inserido inválido' });

    }
}
/*
 function finalizarOcorrencia(req, res) {

    let id = req.params.id;
    //let id_estado = req.body.id_estado;
    let estado;

    let alterar = [
        id
    ]

    let ocorr = "SELECT id_estado FROM ocorrencia WHERE id_ocorrencia=?";

    bd.con.query(ocorr, alterar,
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
                    estado=rows[0].id_estado;
                    if (estado != 2) {
                        let query = "UPDATE ocorrencia SET id_estado=2 WHERE id_ocorrencia=?";
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
                    } else {
                        return res.json("Esta ocorrência já está finalizada");
                    }
                }
            }
        });
} */

function verNivel(req, res) {

    let id = req.params.id;

    query = "SELECT GU.id_nivel, GU.descricao_urgencia FROM ocorrencia O, grau_urgencia GU WHERE O.id_ocorrencia = ? AND O.id_nivel = GU.id_nivel "
    bd.con.query(query, id,
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
};

//delete logico
function apagarOcorrencia(req, res) {
    const update = [1,
        req.params.id
    ];
    const query = bd.con.query('UPDATE ocorrencia SET eliminado = ? WHERE id_ocorrencia=?', update, function (err, rows, fields) {
        if (!err) {
            res.status(jsonMessages.db.successDelete.status).send(jsonMessages.db.successDelete);
        }
        else {
            console.log(err);
            res.status(jsonMessages.db.dbError.status).send(jsonMessages.dbError);
        }
    });
}

function listarOcorrenciaLocal(req, res) {
    let query = "SELECT O.id_ocorrencia, E.descricao_estado, L.distrito, L.concelho, L.morada FROM ocorrencia O, localizacao L, estado E WHERE L.id_local = O.id_local AND E.id_estado = O.id_estado AND O.eliminado=0";

    bd.con.query(query,
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
}

function listarOcorrenciaAtivasLocal(req, res) {
    let query = "SELECT O.id_ocorrencia, E.descricao_estado, L.distrito, L.concelho, L.morada FROM ocorrencia O, localizacao L, estado E WHERE L.id_local = O.id_local AND E.id_estado = O.id_estado AND O.id_estado != 2 AND O.eliminado=0";

    bd.con.query(query,
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
}

function listarOcorrenciaConcluidasLocal(req, res) {
    let query = "SELECT O.id_ocorrencia, E.descricao_estado, L.distrito, L.concelho, L.morada FROM ocorrencia O, localizacao L, estado E WHERE L.id_local = O.id_local AND E.id_estado = O.id_estado AND O.id_estado = 2 AND O.eliminado=0";

    bd.con.query(query,
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
}

function ocorrenciasConcluidas(req, res) {
    //const query = 'SELECT COUNT(id_ocorrencia) FROM ocorrencia WHERE id_estado = 1';

    const query = bd.con.query('SELECT COUNT(id_ocorrencia) AS nmr_ocor FROM ocorrencia WHERE id_estado = 2', function (err, rows, fields) {
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

function ocorrenciasAtivas(req, res) {

    const query = bd.con.query('SELECT COUNT(id_ocorrencia) AS nmr_ocor FROM ocorrencia WHERE id_estado = 1', function (err, rows, fields) {
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


function percOcorrAtivas(req, res) {
    let totalAtivas;
    let total;
    let percentagem;
    const query1 = bd.con.query('SELECT COUNT(id_ocorrencia) as OcorrenciasAtivas FROM ocorrencia WHERE id_estado = 1',

        function (err, rows, fields) {
            if (!err) {
                totalAtivas = rows[0].OcorrenciasAtivas;

                const query2 = bd.con.query('SELECT COUNT(id_ocorrencia) as Ocorrencias FROM ocorrencia',
                    function (err, rows, fields) {

                        if (!err) {
                            total = rows[0].Ocorrencias;
                            percentagem = totalAtivas * 100 / total;
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




function percOcorrConcluidas(req, res) {
    let totalConcluidas;
    let total;
    let percentagem;
    const query1 = bd.con.query('SELECT COUNT(id_ocorrencia) as OcorrenciasConcluidas FROM ocorrencia WHERE id_estado = 2',

        function (err, rows, fields) {
            if (!err) {
                totalConcluidas = rows[0].OcorrenciasConcluidas;
                const query2 = bd.con.query('SELECT COUNT(id_ocorrencia) as Ocorrencias FROM ocorrencia',
                    function (err, rows, fields) {

                        if (!err) {
                            total = rows[0].Ocorrencias;
                            percentagem = totalConcluidas * 100 / total;
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



function ocorrenciasEspera(req, res) {

    const query = bd.con.query('SELECT COUNT(id_ocorrencia) FROM ocorrencia WHERE id_estado = 3', function (err, rows, fields) {
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

function ocorrenciasSemana(req, res) {

    //domingo = 0 --- sabado =6
    let query = 'SELECT COUNT(id_ocorrencia) as conta_dias_semana, date_format(data_ocorrencia, "%w") as dias_semana from ocorrencia WHERE eliminado = 0 AND data_ocorrencia < NOW() - interval 1 DAY AND data_ocorrencia > NOW() - interval 7 DAY GROUP BY date_format(data_ocorrencia, "%w")';
    bd.con.query(query,
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
}




function ultimasOcorrencias(req, res) {
    // const query = bd.con.query ("SELECT COUNT(id_ocorrencia) FROM ocorrencia WHERE data_ocorrencia BETWEEN '.$today.' and '.$today.'", function (err,rows,fiels) {
    const query = bd.con.query("SELECT COUNT(id_ocorrencia) as nmr_ocor FROM ocorrencia WHERE data_ocorrencia >= NOW() - interval 1 DAY", function (err, rows, fiels) {

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


function totalOcorrencias(req, res) {
    const query = bd.con.query("SELECT COUNT(id_ocorrencia) AS nmr_ocor FROM ocorrencia", function (err, rows, fiels) {

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

//ver todas as ocorrencias
function verOcorrenciasAtivas(req, res) {

    bd.con.query('SELECT id_ocorrencia, id_pedido, id_entidade, id_nivel, id_estado, id_local, id_equipa FROM ocorrencia WHERE eliminado = 0 and id_estado = 1',
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
}

function atribuirGestor(req, res) {
    let id = req.params.id;
    let id_gestor = req.body.id_gestor;


    let alterar = [
        id_gestor,
        1,
        id,
    ];

    let query2 = "UPDATE ocorrencia SET id_gestor = ?, id_estado = ? WHERE id_ocorrencia = ? AND eliminado = 0";

    bd.con.query(query2, alterar,
        function (err, rows, fields) {

            if (!err) {
                console.log("Number of records updated: " + rows.affectedRows);
                res.status(200).send({ "msg": "update with success" });
            } else {
                res.status(400).send({ "msg": err.code });
                console.log('Error while performing Query.', err);
            }
        });

};

function numberLocalDistrito(req, res) {

    let contarDistrito = "SELECT distrito, COUNT(id_ocorrencia) as nmr_ocor FROM localizacao L, ocorrencia O WHERE L.id_local = O.id_local AND O.eliminado=0 GROUP BY distrito";
    const query = bd.con.query(contarDistrito,
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
                    return res.json(rows);
                }
            }
        });
}

function numberLocalDistritoAtivas(req, res) {

    let contarDistrito = "SELECT distrito, COUNT(id_ocorrencia) as nmr_ocor FROM localizacao L, ocorrencia O WHERE L.id_local = O.id_local AND O.id_estado != 2 AND O.eliminado=0 GROUP BY distrito";
    const query = bd.con.query(contarDistrito,
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
                    return res.json(rows);
                }
            }
        });
}

function numberLocalDistritoConcluidas(req, res) {

    let contarDistrito = "SELECT distrito, COUNT(id_ocorrencia) as nmr_ocor FROM localizacao L, ocorrencia O WHERE L.id_local = O.id_local AND O.id_estado = 2 AND O.eliminado=0 GROUP BY distrito";
    const query = bd.con.query(contarDistrito,
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
                    return res.json(rows);
                }
            }
        });
}

let custoTotal;
let distancia;
let tempoMinimo;
function custoOperacao(req, res) {
    let id = req.params.id;
    //  let custoTotal;
    let custoKM = 0.88;
    //let distancia;
    //let tempoMinimo;
    let concelho_ocorrencia;
    let procurar = [
        id
    ]
    let query = ('SELECT l.concelho FROM localizacao l, ocorrencia o WHERE l.id_local = o.id_local and o.id_ocorrencia = ?');
    bd.con.query(query, procurar, function (err, rows, fields) {

        if (!err) {
            //ver se é preciso ver se o id_ocorrencia existe
            concelho_ocorrencia = rows[0].concelho;
            switch (concelho_ocorrencia) {

                //Viana dos castelo
                case 'Melgaço':
                    distancia = 105;
                    tempoMinimo = 82;
                    break;
                case 'Valença':
                    distancia = 65.3;
                    tempoMinimo = 45;
                    break;
                case 'Viana do Castelo':
                    distancia = 0;
                    tempoMinimo = 0;
                    break;
                case 'Monçao':
                    distancia = 82.7;
                    tempoMinimo = 64;
                    break;
                case 'Ponte de Lima':
                    distancia = 31.3;
                    tempoMinimo = 30;
                    break;
                case 'Caminha':
                    distancia = 25.2;
                    tempoMinimo = 30;
                    break;
                case 'Ponte da Barca':
                    distancia = 47, 8;
                    tempoMinimo = 38;
                    break;
                case 'Arcos de Valdevez':
                    distancia = 47.6;
                    tempoMinimo = 39;
                    break;
                case 'Paredes de Coura':
                    distancia = 50;
                    tempoMinimo = 50;
                    break;
                case 'Vila Nova de Cerveira':
                    distancia = 37.1;
                    tempoMinimo = 33;
                    break;

                //Braga
                case 'Amares':
                    distancia = 77.4;
                    tempoMinimo = 61;
                    break;
                case 'Barcelos':
                    distancia = 34.6;
                    tempoMinimo = 37;
                    break;
                case 'Braga':
                    distancia = 61.8;
                    tempoMinimo = 46;
                    break;
                case 'Cabeceiras de Basto':
                    distancia = 123;
                    tempoMinimo = 81;
                    break;
                case 'Celorico de Basto':
                    distancia = 120;
                    tempoMinimo = 93;
                    break;
                case 'Esposende':
                    distancia = 30;
                    tempoMinimo = 27;
                    break;
                case 'Fafe':
                    distancia = 98;
                    tempoMinimo = 67;
                    break;
                case 'Guimarães':
                    distancia = 81.1;
                    tempoMinimo = 62;
                    break;
                case 'Póvoa de Lanhoso':
                    distancia = 80.2;
                    tempoMinimo = 63;
                    break;
                case 'Terras de Bouro':
                    distancia = 75.6;
                    tempoMinimo = 73;
                    break;
                case 'Vieira do Minho':
                    distancia = 77;
                    tempoMinimo = 94;
                    break;
                case 'Vila Nova de Famalicão':
                    distancia = 75;
                    tempoMinimo = 54;
                    break;
                case 'Vila Verde':
                    distancia = 57.7;
                    tempoMinimo = 50;
                    break;
                case 'Vizela':
                    distancia = 87.7;
                    tempoMinimo = 64;
                    break;


                //Porto
                case 'Amarante':
                    distancia = 126;
                    tempoMinimo = 82;
                    break;
                case 'Baião':
                    distancia = 136;
                    tempoMinimo = 91;
                    break;
                case 'Felgueiras':
                    distancia = 104;
                    tempoMinimo = 69;
                    break;
                case 'Gondomar':
                    distancia = 86.9;
                    tempoMinimo = 70;
                    break;
                case 'Lousada':
                    distancia = 106;
                    tempoMinimo = 70;
                    break;
                case 'Maia':
                    distancia = 73;
                    tempoMinimo = 51;
                    break;
                case 'Marco de Canaveses':
                    distancia = 120;
                    tempoMinimo = 80;
                    break;
                case 'Matosinhos':
                    distancia = 70;
                    tempoMinimo = 49;
                    break;
                case 'Paços de Ferreira':
                    distancia = 99.7;
                    tempoMinimo = 68;
                    break;
                case 'Paredes':
                    distancia = 100;
                    tempoMinimo = 69;
                    break;
                case 'Penafiel':
                    distancia = 106;
                    tempoMinimo = 73;
                    break;
                case 'Porto':
                    distancia = 73.9;
                    tempoMinimo = 57;
                    break;
                case 'Póvoa de Varzim':
                    distancia = 45.3;
                    tempoMinimo = 38;
                    break;
                case 'Santo Tirso':
                    distancia = 77.8;
                    tempoMinimo = 56;
                    break;
                case 'Trofa':
                    distancia = 75.4;
                    tempoMinimo = 58;
                    break;
                case 'Valongo':
                    distancia = 83.1;
                    tempoMinimo = 61;
                    break;
                case 'Vila do Conde':
                    distancia = 49.7;
                    tempoMinimo = 41;
                    break;
                case 'Vila Nova de Gaia':
                    distancia = 81.9;
                    tempoMinimo = 64;
                    break;

                //Aveiro
                case 'Águeda':
                    distancia = 150;
                    tempoMinimo = 107;
                    break;
                case 'Albergaria-a-Velha':
                    distancia = 139;
                    tempoMinimo = 97;
                    break;
                case 'Anadia':
                    distancia = 166;
                    tempoMinimo = 115;
                    break;
                case 'Arouca':
                    distancia = 132;
                    tempoMinimo = 107;
                    break;
                case 'Aveiro':
                    distancia = 148;
                    tempoMinimo = 99;
                    break;
                case 'Castelo de Paiva':
                    distancia = 123;
                    tempoMinimo = 101;
                    break;
                case 'Espinho':
                    distancia = 93;
                    tempoMinimo = 76;
                    break;
                case 'Estarreja':
                    distancia = 124;
                    tempoMinimo = 87;
                    break;
                case 'Ílhavo':
                    distancia = 154;
                    tempoMinimo = 104;
                    break;
                case 'Mealhada':
                    distancia = 173;
                    tempoMinimo = 111;
                    break;
                case 'Murtosa':
                    distancia = 131;
                    tempoMinimo = 95;
                    break;
                case 'Oliveira de Azeméis':
                    distancia = 124;
                    tempoMinimo = 88;
                    break;
                case 'Oliveira do Bairro':
                    distancia = 155;
                    tempoMinimo = 104;
                    break;
                case 'Ovar':
                    distancia = 111;
                    tempoMinimo = 83;
                    break;
                case 'Santa Maria da Feira':
                    distancia = 105;
                    tempoMinimo = 76;
                    break;
                case 'São João da Madeira':
                    distancia = 116;
                    tempoMinimo = 84;
                    break;
                case 'Sever do Vouga':
                    distancia = 143;
                    tempoMinimo = 109;
                    break;
                case 'Vagos':
                    distancia = 159;
                    tempoMinimo = 106;
                    break;
                case 'Vale de Cambra':
                    distancia = 126;
                    tempoMinimo = 90;
                    break;

                //Coimbra
                case 'Arganil':
                    distancia = 233;
                    tempoMinimo = 152;
                    break;
                case 'Cantanhede':
                    distancia = 180;
                    tempoMinimo = 118;
                    break;
                case 'Coimbra':
                    distancia = 195;
                    tempoMinimo = 128;
                    break;
                case 'Condeixa-a-Nova':
                    distancia = 200;
                    tempoMinimo = 125;
                    break;
                case 'Figueira da Foz':
                    distancia = 212;
                    tempoMinimo = 135;
                    break;
                case 'Góis':
                    distancia = 233;
                    tempoMinimo = 164;
                    break;
                case 'Lousã':
                    distancia = 231;
                    tempoMinimo = 148;
                    break;
                case 'Mira':
                    distancia = 170;
                    tempoMinimo = 113;
                    break;
                case 'Miranda do Corvo':
                    distancia = 218;
                    tempoMinimo = 137;
                    break;
                case 'Montemor-o-Velho':
                    distancia = 206;
                    tempoMinimo = 128;
                    break;
                case 'Oliveira do Hospital':
                    distancia = 253;
                    tempoMinimo = 169;
                    break;
                case 'Pampilhosa da Serra':
                    distancia = 286;
                    tempoMinimo = 192;
                    break;
                case 'Penacova':
                    distancia = 203;
                    tempoMinimo = 130;
                    break;
                case 'Penela':
                    distancia = 221;
                    tempoMinimo = 138;
                    break;
                case 'Soure':
                    distancia = 212;
                    tempoMinimo = 137;
                    break;
                case 'Tábua':
                    distancia = 235;
                    tempoMinimo = 154;
                    break;
                case 'Vila Nova de Poiares':
                    distancia = 213;
                    tempoMinimo = 142;
                    break;

                //Leiria
                case 'Alcobaça':
                    distancia = 284;
                    tempoMinimo = 173;
                    break;
                case 'Alvaiázere':
                    distancia = 244;
                    tempoMinimo = 150;
                    break;
                case 'Ansião':
                    distancia = 241;
                    tempoMinimo = 148;
                    break;
                case 'Batalha':
                    distancia = 268;
                    tempoMinimo = 160;
                    break;
                case 'Bombarral':
                    distancia = 321;
                    tempoMinimo = 190;
                    break;
                case 'Caldas da Rainha':
                    distancia = 302;
                    tempoMinimo = 181;
                    break;
                case 'Castanheira de Pera':
                    distancia = 250;
                    tempoMinimo = 158;
                    break;
                case 'Figueiró dos Vinhos':
                    distancia = 241;
                    tempoMinimo = 150;
                    break;
                case 'Leiria':
                    distancia = 256;
                    tempoMinimo = 155;
                    break;
                case 'Marinha Grande':
                    distancia = 267;
                    tempoMinimo = 162;
                    break;
                case 'Nazaré':
                    distancia = 286;
                    tempoMinimo = 175;
                    break;
                case 'Óbidos':
                    distancia = 312;
                    tempoMinimo = 190;
                    break;
                case 'Pedrógão Grande':
                    distancia = 249;
                    tempoMinimo = 155;
                    break;
                case 'Peniche':
                    distancia = 334;
                    tempoMinimo = 200;
                    break;
                case 'Pombal':
                    distancia = 231;
                    tempoMinimo = 139;
                    break;
                case 'Porto de Mós':
                    distancia = 276;
                    tempoMinimo = 166;
                    break;

                //Santarem 
                case 'Abrantes':
                    distancia = 308;
                    tempoMinimo = 182;
                    break;
                case 'Alcanena':
                    distancia = 291;
                    tempoMinimo = 168;
                    break;
                case 'Almeirim':
                    distancia = 331;
                    tempoMinimo = 192;
                    break;
                case 'Alpiarça':
                    distancia = 330;
                    tempoMinimo = 194;
                    break;
                case 'Benavente':
                    distancia = 366;
                    tempoMinimo = 209;
                    break;
                case 'Cartaxo':
                    distancia = 325;
                    tempoMinimo = 189;
                    break;
                case 'Chamusca':
                    distancia = 301;
                    tempoMinimo = 180;
                    break;
                case 'Constância':
                    distancia = 293;
                    tempoMinimo = 170;
                    break;
                case 'Coruche':
                    distancia = 359;
                    tempoMinimo = 214;
                    break;
                case 'Entroncamento':
                    distancia = 288;
                    tempoMinimo = 168;
                    break;
                case 'Ferreira do Zêzere':
                    distancia = 258;
                    tempoMinimo = 153;
                    break;
                case 'Golegã':
                    distancia = 293;
                    tempoMinimo = 170;
                    break;
                case 'Mação':
                    distancia = 297;
                    tempoMinimo = 196;
                    break;
                case 'Ourém':
                    distancia = 277;
                    tempoMinimo = 169;
                    break;
                case 'Rio Maior':
                    distancia = 328;
                    tempoMinimo = 190;
                    break;
                case 'Salvaterra de Magos':
                    distancia = 362;
                    tempoMinimo = 214;
                    break;
                case 'Santarém':
                    distancia = 320;
                    tempoMinimo = 185;
                    break;
                case 'Sardoal':
                    distancia = 314;
                    tempoMinimo = 185;
                    break;
                case 'Tomar':
                    distancia = 271;
                    tempoMinimo = 160;
                    break;
                case 'Torres Novas':
                    distancia = 295;
                    tempoMinimo = 171;
                    break;
                case 'Vila Nova da Barquinha':
                    distancia = 288;
                    tempoMinimo = 170;
                    break;

                //Beja
                case 'Aljustrel':
                    distancia = 512;
                    tempoMinimo = 294;
                    break;
                case 'Almodôvar':
                    distancia = 563;
                    tempoMinimo = 324;
                    break;
                case 'Alvito':
                    distancia = 525;
                    tempoMinimo = 309;
                    break;
                case 'Barrancos':
                    distancia = 588;
                    tempoMinimo = 363;
                    break;
                case 'Beja':
                    distancia = 526;
                    tempoMinimo = 312;
                    break;
                case 'Castro Verde':
                    distancia = 539;
                    tempoMinimo = 307;
                    break;
                case 'Cuba':
                    distancia = 525;
                    tempoMinimo = 309;
                    break;
                case 'Ferreira do Alentejo':
                    distancia = 503;
                    tempoMinimo = 292;
                    break;
                case 'Mértola':
                    distancia = 583;
                    tempoMinimo = 341;
                    break;
                case 'Moura':
                    distancia = 572;
                    tempoMinimo = 349;
                    break;
                case 'Odemira':
                    distancia = 552;
                    tempoMinimo = 330;
                    break;
                case 'Ourique':
                    distancia = 540;
                    tempoMinimo = 309;
                    break;
                case 'Serpa':
                    distancia = 552;
                    tempoMinimo = 329;
                    break;
                case 'Vidigueira':
                    distancia = 536;
                    tempoMinimo = 317;
                    break;

                //Bragança
                case 'Alfandega da Fé':
                    distancia = 247;
                    tempoMinimo = 160;
                    break;
                case 'Bragança':
                    distancia = 274;
                    tempoMinimo = 169;
                    break;
                case 'Carrazeda de Ansiães':
                    distancia = 211;
                    tempoMinimo = 138;
                    break;
                case 'Freixo Espada à Cinta':
                    distancia = 302;
                    tempoMinimo = 198;
                    break;
                case 'Macedo de Cavaleiros':
                    distancia = 239;
                    tempoMinimo = 149;
                    break;
                case 'Miranda do Douro':
                    distancia = 325;
                    tempoMinimo = 206;
                    break;
                case 'Mirandela':
                    distancia = 215;
                    tempoMinimo = 137;
                    break;
                case 'Mogadouro':
                    distancia = 282;
                    tempoMinimo = 179;
                    break;
                case 'Torre de Moncorvo':
                    distancia = 252;
                    tempoMinimo = 167;
                    break;
                case 'Vila Flor':
                    distancia = 224;
                    tempoMinimo = 143;
                    break;
                case 'Vimioso':
                    distancia = 291;
                    tempoMinimo = 192;
                    break;
                case 'Vinhais':
                    distancia = 243;
                    tempoMinimo = 178;
                    break;

                //Castelo Branco
                case 'Belmonte':
                    distancia = 298;
                    tempoMinimo = 182;
                    break;
                case 'Castelo Branco':
                    distancia = 331;
                    tempoMinimo = 206;
                    break;
                case 'Covilhã':
                    distancia = 321;
                    tempoMinimo = 200;
                    break;
                case 'Fundão':
                    distancia = 331;
                    tempoMinimo = 203;
                    break;
                case 'Idanha-a-Nova':
                    distancia = 374;
                    tempoMinimo = 234;
                    break;
                case 'Oleiros':
                    distancia = 286;
                    tempoMinimo = 181;
                    break;
                case 'Penamacor':
                    distancia = 337;
                    tempoMinimo = 217;
                    break;
                case 'Penhas Saúde':
                    distancia = 272;
                    tempoMinimo = 207;
                    break;
                case 'Proença-a-Nova':
                    distancia = 282;
                    tempoMinimo = 177;
                    break;
                case 'Sertã':
                    distancia = 266;
                    tempoMinimo = 166;
                    break;
                case 'Vila de Rei':
                    distancia = 276;
                    tempoMinimo = 178;
                    break;
                case 'Vila Velha de Rodão':
                    distancia = 313;
                    tempoMinimo = 196;
                    break;

                //Évora
                case 'Alandroal':
                    distancia = 446;
                    tempoMinimo = 290;
                    break;
                case 'Arraiolos':
                    distancia = 413;
                    tempoMinimo = 268;
                    break;
                case 'Borba':
                    distancia = 432;
                    tempoMinimo = 279;
                    break;
                case 'Estremoz':
                    distancia = 420;
                    tempoMinimo = 272;
                    break;
                case 'Évora':
                    distancia = 482;
                    tempoMinimo = 292;
                    break;
                case 'Montemor-o-Novo':
                    distancia = 451;
                    tempoMinimo = 271;
                    break;
                case 'Mora':
                    distancia = 382;
                    tempoMinimo = 245;
                    break;
                case 'Mourão':
                    distancia = 541;
                    tempoMinimo = 333;
                    break;
                case 'Portel':
                    distancia = 521;
                    tempoMinimo = 317;
                    break;
                case 'Redondo':
                    distancia = 435;
                    tempoMinimo = 291;
                    break;
                case 'Reguengos de Monsaraz':
                    distancia = 519;
                    tempoMinimo = 317;
                    break;
                case 'Vendas Novas':
                    distancia = 416;
                    tempoMinimo = 254;
                    break;
                case 'Viana do Alentejo':
                    distancia = 494;
                    tempoMinimo = 306;
                    break;
                case 'Vila Viçosa':
                    distancia = 439;
                    tempoMinimo = 285;
                    break;

                //Faro
                case 'Albufeira':
                    distancia = 605;
                    tempoMinimo = 352;
                    break;
                case 'Alcoutim':
                    distancia = 617;
                    tempoMinimo = 381;
                    break;
                case 'Aljezur':
                    distancia = 593;
                    tempoMinimo = 379;
                    break;
                case 'Castro Marim':
                    distancia = 673;
                    tempoMinimo = 387;
                    break;
                case 'Faro':
                    distancia = 626;
                    tempoMinimo = 365;
                    break;
                case 'Lagoa':
                    distancia = 618;
                    tempoMinimo = 356;
                    break;
                case 'Lagos':
                    distancia = 649;
                    tempoMinimo = 376;
                    break;
                case 'Loulé':
                    distancia = 613;
                    tempoMinimo = 354;
                    break;
                case 'Monchique':
                    distancia = 606;
                    tempoMinimo = 371;
                    break;
                case 'Olhão':
                    distancia = 634;
                    tempoMinimo = 371;
                    break;
                case 'Portimão':
                    distancia = 630;
                    tempoMinimo = 367;
                    break;
                case 'Sagres':
                    distancia = 675;
                    tempoMinimo = 394;
                    break;
                case 'São Brás de Alportel':
                    distancia = 632;
                    tempoMinimo = 367;
                    break;
                case 'Silves':
                    distancia = 601;
                    tempoMinimo = 355;
                    break;
                case 'Tavira':
                    distancia = 651;
                    tempoMinimo = 374;
                    break;
                case 'Vila do Bispo':
                    distancia = 667;
                    tempoMinimo = 389;
                    break;
                case 'Vila Real de Santo António':
                    distancia = 675;
                    tempoMinimo = 387;
                    break;

                //Guarda
                case 'Aguiar da Beira':
                    distancia = 237;
                    tempoMinimo = 163;
                    break;
                case 'Almeida':
                    distancia = 308;
                    tempoMinimo = 121;
                    break;
                case 'Celorico da Beira':
                    distancia = 248;
                    tempoMinimo = 155;
                    break;
                case 'Figueira de Castelo Rodrigo':
                    distancia = 330;
                    tempoMinimo = 210;
                    break;
                case 'Fornos de Algodres':
                    distancia = 235;
                    tempoMinimo = 147;
                    break;
                case 'Gouveia':
                    distancia = 240;
                    tempoMinimo = 163;
                    break;
                case 'Guarda':
                    distancia = 273;
                    tempoMinimo = 172;
                    break;
                case 'Manteigas':
                    distancia = 268;
                    tempoMinimo = 200;
                    break;
                case 'Meda':
                    distancia = 297;
                    tempoMinimo = 183;
                    break;
                case 'Penhas Douradas':
                    distancia = 259;
                    tempoMinimo = 185;
                    break;
                case 'Pinhel':
                    distancia = 287;
                    tempoMinimo = 183;
                    break;
                case 'Sabugal':
                    distancia = 305;
                    tempoMinimo = 199;
                    break;
                case 'Seia':
                    distancia = 235;
                    tempoMinimo = 164;
                    break;
                case 'Trancoso':
                    distancia = 273;
                    tempoMinimo = 171;
                    break;
                case 'Vila Nova de Foz Coa':
                    distancia = 263;
                    tempoMinimo = 173;
                    break;

                //Lisboa
                case 'Alenquer':
                    distancia = 353;
                    tempoMinimo = 218;
                    break;
                case 'Amadora':
                    distancia = 390;
                    tempoMinimo = 231;
                    break;
                case 'Arruda dos Vinhos':
                    distancia = 362;
                    tempoMinimo = 221;
                    break;
                case 'Azambuja':
                    distancia = 343;
                    tempoMinimo = 215;
                    break;
                case 'Cadaval':
                    distancia = 328;
                    tempoMinimo = 198;
                    break;
                case 'Cascais':
                    distancia = 415;
                    tempoMinimo = 250;
                    break;
                case 'Lisboa':
                    distancia = 385;
                    tempoMinimo = 244;
                    break;
                case 'Loures':
                    distancia = 378;
                    tempoMinimo = 222;
                    break;
                case 'Lourinhã':
                    distancia = 338;
                    tempoMinimo = 205;
                    break;
                case 'Mafra':
                    distancia = 378;
                    tempoMinimo = 225;
                    break;
                case 'Odivelas':
                    distancia = 383;
                    tempoMinimo = 226;
                    break;
                case 'Oeiras':
                    distancia = 400;
                    tempoMinimo = 238;
                    break;
                case 'Sintra':
                    distancia = 402;
                    tempoMinimo = 238;
                    break;
                case 'Sobral de Monte Agraço':
                    distancia = 358;
                    tempoMinimo = 217;
                    break;
                case 'Torres Vedras':
                    distancia = 346;
                    tempoMinimo = 207;
                    break;
                case 'Vila Franca de Xira':
                    distancia = 355;
                    tempoMinimo = 216;
                    break;

                //Portalegre
                case 'Alter do Chão':
                    distancia = 369;
                    tempoMinimo = 234;
                    break;
                case 'Arronches':
                    distancia = 389;
                    tempoMinimo = 251;
                    break;
                case 'Avis':
                    distancia = 370;
                    tempoMinimo = 237;
                    break;
                case 'Campo Maior':
                    distancia = 412;
                    tempoMinimo = 268;
                    break;
                case 'Castelo de Vide':
                    distancia = 360;
                    tempoMinimo = 233;
                    break;
                case 'Crato':
                    distancia = 358;
                    tempoMinimo = 228;
                    break;
                case 'Elvas':
                    distancia = 421;
                    tempoMinimo = 282;
                    break;
                case 'Fronteira':
                    distancia = 386;
                    tempoMinimo = 251;
                    break;
                case 'Gavião':
                    distancia = 332;
                    tempoMinimo = 203;
                    break;
                case 'Marvão':
                    distancia = 369;
                    tempoMinimo = 246;
                    break;
                case 'Monforte':
                    distancia = 393;
                    tempoMinimo = 252;
                    break;
                case 'Nisa':
                    distancia = 334;
                    tempoMinimo = 214;
                    break;
                case 'Ponte de Sor':
                    distancia = 342;
                    tempoMinimo = 215;
                    break;
                case 'Portalegre':
                    distancia = 365;
                    tempoMinimo = 235;
                    break;
                case 'Sousel':
                    distancia = 395;
                    tempoMinimo = 258;
                    break;

                //setubal
                case 'Alcácer do Sal':
                    distancia = 441;
                    tempoMinimo = 259;
                    break;
                case 'Alcochete':
                    distancia = 402;
                    tempoMinimo = 244;
                    break;
                case 'Almada':
                    distancia = 397;
                    tempoMinimo = 242;
                    break;
                case 'Barreiro':
                    distancia = 418;
                    tempoMinimo = 256;
                    break;
                case 'Grândola':
                    distancia = 465;
                    tempoMinimo = 271;
                    break;
                case 'Moita':
                    distancia = 405;
                    tempoMinimo = 244;
                    break;
                case 'Palmela':
                    distancia = 419;
                    tempoMinimo = 253;
                    break;
                case 'Santiago do Cacém':
                    distancia = 494;
                    tempoMinimo = 291;
                    break;
                case 'Seixal':
                    distancia = 409;
                    tempoMinimo = 251;
                    break;
                case 'Sesimbra':
                    distancia = 424;
                    tempoMinimo = 265;
                    break;
                case 'Setúbal':
                    distancia = 421;
                    tempoMinimo = 253;
                    break;
                case 'Sines':
                    distancia = 508;
                    tempoMinimo = 296;
                    break;

                //Vila real
                case 'Alijó':
                    distancia = 197;
                    tempoMinimo = 124;
                    break;
                case 'Boticas':
                    distancia = 179;
                    tempoMinimo = 119;
                    break;
                case 'Chaves':
                    distancia = 182;
                    tempoMinimo = 111;
                    break;
                case 'Mesão Frio':
                    distancia = 149;
                    tempoMinimo = 106;
                    break;
                case 'Mondim de Basto':
                    distancia = 130;
                    tempoMinimo = 94;
                    break;
                case 'Montalegre':
                    distancia = 137;
                    tempoMinimo = 133;
                    break;
                case 'Murça':
                    distancia = 190;
                    tempoMinimo = 118;
                    break;
                case 'Peso da Régua':
                    distancia = 182;
                    tempoMinimo = 114;
                    break;
                case 'Ribeira de Pena':
                    distancia = 134;
                    tempoMinimo = 83;
                    break;
                case 'Sabrosa':
                    distancia = 177;
                    tempoMinimo = 114;
                    break;
                case 'Santa Marta de Penaguião':
                    distancia = 172;
                    tempoMinimo = 122;
                    break;
                case 'Valpaços':
                    distancia = 188;
                    tempoMinimo = 135;
                    break;
                case 'Vila Pouca de Aguiar':
                    distancia = 147;
                    tempoMinimo = 197;
                    break;
                case 'Vila Real':
                    distancia = 161;
                    tempoMinimo = 104;
                    break;

                //Viseu
                case 'Armamar':
                    distancia = 196;
                    tempoMinimo = 126;
                    break;
                case 'Carregal do Sal':
                    distancia = 226;
                    tempoMinimo = 146;
                    break;
                case 'Castro Daire':
                    distancia = 218;
                    tempoMinimo = 136;
                    break;
                case 'Cinfães':
                    distancia = 144;
                    tempoMinimo = 112;
                    break;
                case 'Lamego':
                    distancia = 195;
                    tempoMinimo = 125;
                    break;
                case 'Mangualde':
                    distancia = 214;
                    tempoMinimo = 132;
                    break;
                case 'Moimenta da Beira':
                    distancia = 221;
                    tempoMinimo = 152;
                    break;
                case 'Mortágua':
                    distancia = 196;
                    tempoMinimo = 129;
                    break;

                case 'Nelas':
                    distancia = 212;
                    tempoMinimo = 137;
                    break;
                case 'Oliveira de Frades':
                    distancia = 170;
                    tempoMinimo = 110;
                    break;
                case 'Penalva do Castelo':
                    distancia = 230;
                    tempoMinimo = 150;
                    break;
                case 'Penedono':
                    distancia = 239;
                    tempoMinimo = 175;
                    break;
                case 'Resende':
                    distancia = 158;
                    tempoMinimo = 117;
                    break;
                case 'Santa Comba Dão':
                    distancia = 205;
                    tempoMinimo = 138;
                    break;

                case 'São João da Pesqueira,':
                    distancia = 224;
                    tempoMinimo = 166;
                    break;
                case 'São Pedro do Sul':
                    distancia = 184;
                    tempoMinimo = 122;
                    break;
                case 'Sátão':
                    distancia = 218;
                    tempoMinimo = 145;
                    break;
                case 'Tabuaço':
                    distancia = 208;
                    tempoMinimo = 146;
                    break;
                case 'Tarouca':
                    distancia = 201;
                    tempoMinimo = 131;
                    break;
                case 'Tondela':
                    distancia = 199;
                    tempoMinimo = 130;
                    break;
                case 'Vila Nova de Paiva':
                    distancia = 229;
                    tempoMinimo = 153;
                    break;
                case 'Viseu':
                    distancia = 200;
                    tempoMinimo = 127;
                    break;
                case 'Vouzela':
                    distancia = 176;
                    tempoMinimo = 112;
                    break;


            }
            custoTotal = (custoKM * distancia).toFixed();
            return res.json([custoTotal + ' €', distancia + ' Km', tempoMinimo + ' minutos']);

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


    })


}


function notificarGestor(req, res) {

    let id = req.params.id;
    let alterar = [
        id
    ];

    let user;
    let gestor;
    let nome_gestor;
    let email_gestor;
    let estado_ocorrencia;
    let descricao_ocorrencia;
    let morada;
    let distrito;
    let concelho;

    let query_seis = "SELECT L.morada, L.distrito, L.concelho FROM localizacao L, ocorrencia O WHERE L.id_local=O.id_local AND O.id_ocorrencia=?";

    bd.con.query(query_seis, alterar,
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
                    morada = rows[0].morada;
                    distrito = rows[0].distrito;
                    concelho = rows[0].concelho;
                }
            }
        });




    let query = "SELECT id_gestor, id_estado FROM ocorrencia WHERE id_gestor IS NOT NULL and id_ocorrencia=?"

    bd.con.query(query, alterar,
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
                    // return res.json(rows);
                    gestor = rows[0].id_gestor;
                    estado_ocorrencia = rows[0].id_estado;


                    let query_quatro = "SELECT descricao_estado FROM estado WHERE id_estado=?"
                    bd.con.query(query_quatro, estado_ocorrencia,
                        function (err, rows, fields) {

                            if (!err) {
                                descricao_ocorrencia = rows[0].descricao_estado;
                            } else {
                                res.status(400).send({ "msg": err.code });
                                console.log('Error while performing Query.', err);
                            }
                        });


                    let query_dois = "SELECT username FROM gestor_operacoes WHERE id_gestor=?";
                    bd.con.query(query_dois, gestor,
                        function (err, rows, fields) {

                            if (!err) {
                                user = rows[0].username;
                                if (gestor != 0) {
                                    let query_tres = "SELECT nome, email_utilizador FROM users WHERE username=?";
                                    bd.con.query(query_tres, user,
                                        function (err, rows, fields) {

                                            if (!err) {
                                                nome_gestor = rows[0].nome;
                                                email_gestor = rows[0].email_utilizador;

                                                let transporter = nodemailer.createTransport(SMTPTransport({
                                                    service: 'Gmail',
                                                    auth: {
                                                        user: 'pw.policiamaritima@gmail.com',
                                                        pass: 'd311pw20'
                                                    }
                                                }));


                                                transporter.verify(function (error, success) {
                                                    if (error) {
                                                        console.log(error);
                                                    } else {
                                                        console.log('Email preparado');
                                                    }
                                                })


                                                let mailOptions = {
                                                    from: '<pw.policiamaritima@gmail.com>',
                                                    to: email_gestor,
                                                    cc: '<pw.policiamaritima@gmail.com>',
                                                    subject: 'Informação sobre a sua ocorrência',
                                                    text: "Vimos por este meio informá-lo acerca do estado da sua ocorrência: A ocorrência com id " + id + " que ocorreu no distrito de " + distrito + ", concelho de " + concelho + ", na morada " + morada + " encontra-se " + descricao_ocorrencia + '.' + ' \n\ ' + ' \n ' + "Cumprimentos, " + ' \n\ ' + "Polícia Marítima",
                                                };

                                                transporter.sendMail(mailOptions, function (error, info) {
                                                    if (error) {
                                                        console.log(error);
                                                        res.json({ yo: 'error' });
                                                    } else {
                                                        console.log('Message sent: ' + info.response);
                                                        res.json({ yo: info.response });
                                                    };
                                                });
                                            } else {
                                                res.status(400).send({ "msg": err.code });
                                                console.log('Error while performing Query.', err);
                                            }
                                        });
                                } else {
                                    res.send("Esta ocorrência não tem nenhum gestor associado.");
                                }
                            } else {
                                res.status(400).send({ "msg": err.code });
                                console.log('Error while performing Query.', err);
                            }
                        });
                }
            }
        });
}

function preverMaterial(req, res) {

    let id = req.params.id;
    let id_servico_ocorrencia;
    let descricao;
    let material_necessario;
    let procurar = [
        id,
    ]

    let query = "SELECT P.id_servico FROM pedido P, ocorrencia O WHERE P.id_pedido = O.id_pedido AND O.id_ocorrencia=? AND O.eliminado=0";
    bd.con.query(query, procurar,
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
                    id_servico_ocorrencia = rows[0].id_servico;
                    let servico = [
                        id_servico_ocorrencia,
                    ]

                    let query_dois = "SELECT T.descricao_tipo_servico FROM servico S, tipo_servico T WHERE S.id_tipo_servico = T.id_tipo_servico AND S.id_servico =?"
                    bd.con.query(query_dois, servico,
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
                                    descricao = rows[0].descricao_tipo_servico;

                                    switch (descricao) {
                                        case 'Afogamentos':
                                            material_necessario = ["Boia", "Colete salva-vidas", "Botija oxigênio", "Barbatanas"];
                                            break;
                                        case 'Apreensões':
                                            material_necessario = ["Binoculos", "Colete salva-vidas", "Algemas"];
                                            break;
                                        case 'Controlo e segurança costeira':
                                            material_necessario = ["Binoculos", "Colete salva-vidas"];
                                            break;
                                        case 'Proteção Ambiental':
                                            material_necessario = ["Binoculos", "Corda"];
                                            break;
                                        case 'Resgate de Animais':
                                            material_necessario = ["Barbatanas", "Boia", "Binoculos"];
                                            break;
                                        case 'Resgate de Pessoas':
                                            material_necessario = ["Barbatanas", "Colete salva-vidas", "Boia", "Binoculos"];
                                            break;
                                        default:
                                            material_necessario = "Nenhuma recomendação";
                                            break;
                                    }
                                    res.send(material_necessario);
                                }
                            }
                        })
                }
            }
        })

}

function finalizarOcorrencia(req, res) {

    let id = req.params.id;
    //let id_estado = req.body.id_estado;
    let estado;

    let alterar = [
        id
    ]

    let ocorr = "SELECT id_estado FROM ocorrencia WHERE id_ocorrencia=?";

    bd.con.query(ocorr, alterar,
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
                    estado = rows[0].id_estado;
                    if (estado != 2) {
                        let query = "UPDATE ocorrencia SET id_estado=2 WHERE id_ocorrencia=?";
                        bd.con.query(query, alterar,
                            function (err, rows, fields) {
                                if (!err) {
                                    let alterar = [
                                        id
                                    ];


                                    let morada;
                                    let distrito;
                                    let concelho;

                                    let query_seis = "SELECT L.morada, L.distrito, L.concelho FROM localizacao L, ocorrencia O WHERE L.id_local=O.id_local AND O.id_ocorrencia=?";

                                    bd.con.query(query_seis, alterar,
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
                                                    morada = rows[0].morada;
                                                    distrito = rows[0].distrito;
                                                    concelho = rows[0].concelho;
                                                }
                                            }
                                        });





                                    let user;
                                    let gestor;
                                    let nome_gestor;
                                    let email_gestor;
                                    let estado_ocorrencia;
                                    let descricao_ocorrencia;

                                    let query = "SELECT id_gestor, id_estado FROM ocorrencia WHERE id_gestor IS NOT NULL and id_ocorrencia=?"

                                    bd.con.query(query, alterar,
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
                                                    // return res.json(rows);
                                                    gestor = rows[0].id_gestor;
                                                    estado_ocorrencia = rows[0].id_estado;


                                                    let query_quatro = "SELECT descricao_estado FROM estado WHERE id_estado=?"
                                                    bd.con.query(query_quatro, estado_ocorrencia,
                                                        function (err, rows, fields) {

                                                            if (!err) {
                                                                descricao_ocorrencia = rows[0].descricao_estado;
                                                            } else {
                                                                res.status(400).send({ "msg": err.code });
                                                                console.log('Error while performing Query.', err);
                                                            }
                                                        });


                                                    let query_dois = "SELECT username FROM gestor_operacoes WHERE id_gestor=?";
                                                    bd.con.query(query_dois, gestor,
                                                        function (err, rows, fields) {

                                                            if (!err) {
                                                                user = rows[0].username;
                                                                if (gestor != 0) {
                                                                    let query_tres = "SELECT nome, email_utilizador FROM users WHERE username=?";
                                                                    bd.con.query(query_tres, user,
                                                                        function (err, rows, fields) {

                                                                            if (!err) {
                                                                                nome_gestor = rows[0].nome;
                                                                                email_gestor = rows[0].email_utilizador;

                                                                                let transporter = nodemailer.createTransport(SMTPTransport({
                                                                                    service: 'Gmail',
                                                                                    auth: {
                                                                                        user: 'pw.policiamaritima@gmail.com',
                                                                                        pass: 'd311pw20'
                                                                                    }
                                                                                }));

                                                                                transporter.verify(function (error, success) {
                                                                                    if (error) {
                                                                                        console.log(error);
                                                                                    } else {
                                                                                        console.log('Email preparado');
                                                                                    }
                                                                                })


                                                                                let mailOptions = {
                                                                                    from: '<pw.policiamaritima@gmail.com>',
                                                                                    to: email_gestor,
                                                                                    cc: '<pw.policiamaritima@gmail.com>',
                                                                                    subject: 'Ocorrência concluída - DETALHES',
                                                                                    text: "Caro Gestor, " + nome_gestor + '\n' + '\n' + "A sua ocorrência com id " + id + " que ocorreu no distrito de " + distrito + ", " + "no concelho de " + concelho + ", " + "na morada " + morada + " foi concluída com sucesso." + '\n\ ' + '\n\ ' + "Detalhes: " + '\n' + "Distância ao centro de operações: " + distancia + " Km " + '\n' + "Custo da ocorrência: " + custoTotal + " €" + '\n' + "Duração da ocorência: " + tempoMinimo + " minutos" + '\n' + '\n ' + "Cumprimentos, PM",

                                                                                };

                                                                                transporter.sendMail(mailOptions, function (error, info) {
                                                                                    if (error) {
                                                                                        console.log(error);
                                                                                        res.json({ yo: 'error' });

                                                                                    } else {
                                                                                        console.log('Message sent: ' + info.response);
                                                                                        res.json({ yo: info.response });
                                                                                    };
                                                                                });
                                                                            } else {
                                                                                res.status(400).send({ "msg": err.code });
                                                                                console.log('Error while performing Query.', err);
                                                                            }
                                                                        });
                                                                } else {
                                                                    res.send("Esta ocorrência não tem nenhum gestor associado.");
                                                                }
                                                            } else {
                                                                res.status(400).send({ "msg": err.code });
                                                                console.log('Error while performing Query.', err);
                                                            }
                                                        });
                                                }
                                            }
                                        });
                                } else {
                                    res.status(400).send({ "msg": err.code });
                                    console.log('Error while performing Query.', err);
                                }
                            })
                    }
                    else {
                        res.status(400).send({ "msg": err.code });
                        console.log('Error while performing Query.', err);
                    }
                }
            }
        })
};



module.exports = {
    verOcorrencias: verOcorrencias,
    verOcorrenciasId: verOcorrenciasId,
    alterarOcorrencia: alterarOcorrencia,
    apagarOcorrencia: apagarOcorrencia,
    ocorrenciasConcluidas: ocorrenciasConcluidas,
    ocorrenciasAtivas: ocorrenciasAtivas,
    ocorrenciasEspera: ocorrenciasEspera,
    ultimasOcorrencias: ultimasOcorrencias,
    totalOcorrencias: totalOcorrencias,
    verOcorrenciasAtivas: verOcorrenciasAtivas,
    percOcorrAtivas: percOcorrAtivas,
    percOcorrConcluidas: percOcorrConcluidas,
    atribuirGestor: atribuirGestor,
    numberLocalDistrito: numberLocalDistrito,
    notificarGestor: notificarGestor,
    listarOcorrenciaLocal: listarOcorrenciaLocal,
    listarOcorrenciaAtivasLocal: listarOcorrenciaAtivasLocal,
    custoOperacao: custoOperacao,
    verOcorrenciasTabela: verOcorrenciasTabela,
    preverMaterial: preverMaterial,
    cbmBoxGestores: cbmBoxGestores,
    finalizarOcorrencia: finalizarOcorrencia,
    verLocalOcorrencia: verLocalOcorrencia,
    listarOcorrenciaConcluidasLocal: listarOcorrenciaConcluidasLocal,
    verNivel: verNivel,
    cbmBoxMateriais: cbmBoxMateriais,
    ocorrenciasSemana: ocorrenciasSemana,
    verOcorrenciasNaoConcluidas: verOcorrenciasNaoConcluidas,
    numberLocalDistritoAtivas: numberLocalDistritoAtivas,
    numberLocalDistritoConcluidas: numberLocalDistritoConcluidas,
}