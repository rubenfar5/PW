//ligação ficheiro da base de dados
const bd = require("../config/bd");
//ligação ficheiro de mensagens json
const jsonMessagesPath = __dirname + "/../assets/";
const jsonMessages = require(jsonMessagesPath + "db");


//--------------------------------------
//ver todos os materiais

function verMaterial(req, res) {

    bd.con.query('SELECT id_material, nome_material, descricao_material, quantidade_disponivel, quantidade_total FROM material WHERE eliminado = 0', 
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
//Ver o material pelo ID

function verMaterialID(req, res) {
    const id = req.params.id;

    const query = bd.con.query('SELECT id_material, nome_material, descricao_material, quantidade_disponivel, quantidade_total FROM material WHERE id_material = ? AND eliminado=0', id,
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

//Criar uma nova localizaçao  
function registarMaterial(req, res) {

    //receber os dados do formulario que sao enviados por post
    let nome_material = req.body.nome_material;
    let descricao_material = req.body.descricao_material;
    let quantidade_disponivel = req.body.quantidade_disponivel;
    let quantidade_total = req.body.quantidade_total;
    

    let inserir = [
        nome_material,
        descricao_material,
        quantidade_disponivel,
        quantidade_total,
    ];
    if (parseInt(quantidade_total) > parseInt(quantidade_disponivel)) {
        console.log(inserir);
    let query = "INSERT INTO material SET nome_material = ?, descricao_material = ?, quantidade_disponivel = ?, quantidade_total = ?"
    bd.con.query( query, inserir,
    function (err, rows, fields) {
        if (!err) {
            res.status(jsonMessages.db.successInsert.status).location(rows.insertId).send(jsonMessages.db.successInsert);
        }
        else {
            console.log(err);
            res.status(jsonMessages.db.dbError.status).send(jsonMessages.db.dbError);
        }
    });
} else {
    console.log(inserir);
    res.status(jsonMessages.db.dbError.status).send('A quantidade total deve ser maior que a quantidade disponível');
}
}

//alterar material por id
function alterarMaterialID(req,res) {
    //receber os dados do formulario que sao enviados por post
    let nome_material = req.body.nome_material;
    let descricao_material = req.body.descricao_material;
    let quantidade_disponivel = req.body.quantidade_disponivel;
    let quantidade_total = req.body.quantidade_total;
    let id = req.params.id;


    //console.log("without hahsh:" + req.body.pass);

    let alterar = [
        nome_material,
        descricao_material,
        quantidade_disponivel,
        quantidade_total,
        id,
    ];
    console.log(alterar);

    let query = 'UPDATE material SET nome_material = ?, descricao_material =?, quantidade_disponivel=?, quantidade_total=? where id_material=?'
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
//-------------------------------------
//Delete logico um Material  
function removerMaterial(req, res) {
   let id = req.params.id;
    const update = [1, 
        id ]
    ;
    const query = bd.con.query('UPDATE material SET eliminado = ? WHERE id_material=?', update, function(err,rows,fields){
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
    verMaterial: verMaterial,
    verMaterialID: verMaterialID,
    registarMaterial: registarMaterial,
    alterarMaterialID: alterarMaterialID,
    removerMaterial: removerMaterial,
}