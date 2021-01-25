const bcrypt = require("bcryptjs");
const saltRounds = 10;

//ligação ficheiro da base de dados
const { buildSanitizeFunction } = require("express-validator");
const bd = require("../config/bd");
//ligação ficheiro de mensagens json
const jsonMessagesPath = __dirname + "/../assets/";
const jsonMessages = require(jsonMessagesPath + "db");
const SMTPTransport = require('nodemailer-smtp-transport');
const nodemailer = require('nodemailer');

//Ver os utilizador existentes no sistema
function VerUtilizadores(req, res) {
    const query = bd.con.query('SELECT * FROM utilizador',
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
};

//Ver os utilizadores pelo username                     
function verUtilizadoresUsername(req, res) {
    const username = req.params.username;
    const post = [username];
    const query = bd.con.query('SELECT * from utilizador where username = ?', post,
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
};


//Adicionar novos utilizadores                 
function RegistarUtilizadores(req, res) {
    //receber os dados do formuário que são enviados por post
    let username = req.body.username;
    let nome = req.body.nome;
    let email_utilizador = req.body.email_utilizador;
    let password = [...Array(10)].map(i=>(~~(Math.random()*36)).toString(36)).join('');
    console.log(password);
    let id_cargo = "1";
    let disp = "disponível";
    //console.log("without hash:" + req.body.password);
    let query = "";
    bcrypt.hash(password, saltRounds).then(function (hash) {
        let post = [
            username,
            nome,
            email_utilizador,
            hash,
            id_cargo
        ];
        console.log("with hash:" + hash);

        let post_dois = [
            username,
            id_cargo,
            disp
        ]
       
        console.log(post_dois);
        console.log(post);

        query = "INSERT INTO utilizador SET username = ?, nome = ?, email_utilizador = ?, password = ?, id_cargo = ?";
        bd.con.query (query, post, 
        function (err, rows, fields) {
            //adicionar nos users tb
            if (!err) {

        let queryy =  "INSERT INTO users SET username = ?, nome = ?, email_utilizador = ?, password = ?, id_cargo = ?";
                bd.con.query(queryy, post, 
                    function(err, rows, fields) {
                    if (!err) {
                        let query_dois = "INSERT INTO operacional SET username = ?, id_cargo = ?, disponibilidade = ?";
                        bd.con.query (query_dois, post_dois , 
                            function (err, rows, fields) {
                        console.log(email_utilizador);
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
                                        to: email_utilizador,
                                        cc: '<pw.policiamaritima@gmail.com>',
                                        subject: 'Novo Registo - PASSWORD - PM',
                                        text: "Bem vindo ao centro de operações da Polícia Marítima!" + '\n\ ' + "O seu registo foi efetuado com sucesso." + '\n\ ' + '\n\ ' + "Username: " + username + '\n\ ' + "Password: " + password + '\n\ ' + '\n\ ' + "Aconselhamos que efetue a alteração da sua password." + '\n\ ' + "Cumprimentos, PM",
                                                
                                    };
        
                                    transporter.sendMail(mailOptions, function (error, info) {
                                        if (error) {
                                            console.log(error);
                                            res.json({ yo: 'error' });
                                            
                                        } else {
                                            console.log('Message sent: ' + info.response);
                                            //res.json({ yo: info.response });
                                        };
                                    });
                                
                                if (!err) {
                                    res.status(200).location(rows.insertId).send({
                                        "msg": "Inserido com sucesso"
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
                    else {
                        console.log(err);
                        res.status(jsonMessages.db.dbError.status).send(jsonMessages.db.dbError);
                    }
                });
            } else {
                if (err.code == "ER_DUP_ENTRY") {
                    res.status(409).send({ "msg": "Dados inválidos, username ou email já existem" });
                    console.log('Error while performing Query.', err);
                } else res.status(400).send({ "msg": err.code });
            }
        });
        
    });
}

//Alterar dados dos utilizadores     

function AlterarUtilizadores(req, res) {
    //receber os dados do formuário que são enviados por post
    let nome = req.body.nome;
    let email_utilizador = req.body.email_utilizador;
    let password = req.body.password;
    let username = req.params.username;
    
    console.log("without hahsh:" + req.body.password);
    var query = "";
    bcrypt.hash(password, saltRounds).then(function (hash) {
        console.log("with hash:" + hash);
        
        let update = [
            nome,
            email_utilizador,
            hash,
            username
        ];
        var query = "UPDATE utilizador SET nome = ?, email_utilizador = ?, password= ? WHERE username=?";
        bd.con.query (query, update,
        function (err, rows, fields) {
            if (!err) {
              let query1 = "UPDATE users SET nome = ?, email_utilizador = ?, password= ? WHERE username=?";
              bd.con.query(query1, update, 
                function(err, rows, fields){
                if (!err) {
                    console.log("Number of records updated: " + rows.affectedRows);
                    res.status(200).send({ "msg": "update with success" });
                } else {
                    res.status(400).send({ "msg": err.code });
                    console.log('Error while performing Query.', err);
                }
              })
            } else {
                res.status(400).send({ "msg": err.code });
                console.log('Error while performing Query.', err);
            }
        });
    });
}

//Alterar dados dos utilizadores     

function AlterarPassword(req, res) {
    //receber os dados do formuário que são enviados por post
    let email_utilizador = req.params.email_utilizador;
    let password = [...Array(10)].map(i=>(~~(Math.random()*36)).toString(36)).join('');

    
    console.log("without hahsh:" + password);
    var query = "";
    bcrypt.hash(password, saltRounds).then(function (hash) {
        console.log("with hash:" + hash);
        
        let update = [
            hash,
            email_utilizador
        ];
        var query = "UPDATE utilizador SET password = ? WHERE email_utilizador = ?";
        bd.con.query (query, update,
        function (err, rows, fields) {
            if (!err) {
              let query1 = "UPDATE users SET password= ? WHERE email_utilizador=?";
              bd.con.query(query1, update, 
                function(err, rows, fields){
                if (!err) {
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
                        to: email_utilizador,
                        cc: '<pw.policiamaritima@gmail.com>',
                        subject: 'Nova password - FORGET PASSWORD - PM',
                        text: "A sua password foi atualizada para: " + password +  '\n\ ' + "Aconselhamos que efetue a alteração da sua password na Area do Seu Perfil." + '\n\ ' + "Cumprimentos, PM",
                                
                    };
        
                    transporter.sendMail(mailOptions, function (error, info) {
                        if (error) {
                            console.log(error);
                            res.json({ yo: 'error' });
                            
                        } else {
                            console.log('Message sent: ' + info.response);
                            //res.json({ yo: info.response });
                        };
                    });
                    console.log("Number of records updated: " + rows.affectedRows);
                    res.status(200).send({ "msg": "update with success" });
                } else {
                    res.status(400).send({ "msg": err.code });
                    console.log('Error while performing Query.', err);
                }
              })
            } else {
                res.status(400).send({ "msg": err.code });
                console.log('Error while performing Query.', err);
            }
            
            
        });
    });
}



module.exports = {
    VerUtilizadores: VerUtilizadores,
    verUtilizadoresUsername: verUtilizadoresUsername,
    RegistarUtilizadores: RegistarUtilizadores,
    AlterarUtilizadores: AlterarUtilizadores,
    AlterarPassword: AlterarPassword,
}