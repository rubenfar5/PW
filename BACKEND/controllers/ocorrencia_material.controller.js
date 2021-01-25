//ligação ficheiro da base de dados
const { con } = require("../config/bd");
const bd = require("../config/bd");
//ligação ficheiro de mensagens json
const jsonMessagesPath = __dirname + "/../assets/";
const jsonMessages = require(jsonMessagesPath + "db");

//ver todas as ocorrencias_material
function verOcorrenciasMaterial(req, res) {

    const query = bd.con.query('SELECT * FROM ocorrencia_material',
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


function atribuirMaterial (req,res) {

    const id_ocorrencia = req.params.id;
    const id_mat = req.body.id_material;
    const quantidade_usada = req.body.quantidade_usada;
    let id_material;

    let prever = [
        id_ocorrencia,
        id_mat,
        quantidade_usada
    ]

    let id_ocorr = [
        id_ocorrencia
    ]
    let query1 = "SELECT id_material FROM ocorrencia_material OM, ocorrencia O WHERE O.id_ocorrencia=?";

    bd.con.query(query1, id_ocorr, function (err, rows, fields) {
        if (!err) {

            id_material = rows;
            if(id_mat.indexOf(id_material) === -1) {

            let query = "INSERT INTO ocorrencia_material SET id_ocorrencia=?, id_material=?, quantidade_usada=?";

    bd.con.query(query, prever, function (err, rows, fields) {
        if (!err) {
            res.status(200).location(rows.insertId).send({
                "msg": "inserted with success"
            });
            console.log("Number of records inserted: " + rows.affectedRows);
        } else {
            res.status(400).send({ msg: "Este material já foi adicionado"});
        }
    });
            }

        } 
            else res.status(400).send({ msg: "Este material já foi adicionado" });
    });
};


function listaMaterial (req,res) {

    const id_ocorrencia = req.params.id;
    let material;
    let mat = [
        id_ocorrencia
    ]

    let query = "SELECT O.id_ocorrencia, M.nome_material, OM.quantidade_usada FROM ocorrencia_material OM, ocorrencia O, material M  WHERE OM.id_ocorrencia=O.id_ocorrencia AND OM.id_material = M.id_material AND O.id_ocorrencia =?";

    bd.con.query(query, mat, function (err, rows, fields) {
        
        if (!err) {
            res.send(rows);
        } else {
            if (err.code == "ER_DUP_ENTRY") {
                res.status(409).send({ "msg": err.code });
                console.log('Error while performing Query.', err);
            } else res.status(400).send({ "msg": err.code });
        }
    });


}


/*
// ver ocorrencia_material por id
function verOcorrenciaMaterialId(req, res) {
    const id_ocorrencia = req.params.id_ocorrencia;
    const id_material = req.params.id_material;
    const post = {
        id_ocorrencia: id_ocorrencia,
        id_material: id_material
    };

    let query = 'SELECT * from ocorrencia_material where ?';

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
                    res.send(rows);
                }
            }
        });
}
*/

module.exports = {
    verOcorrenciasMaterial: verOcorrenciasMaterial,
    atribuirMaterial:atribuirMaterial,
    listaMaterial:listaMaterial,
    //verOcorrenciaMaterialId: verOcorrenciaMaterialId,
}