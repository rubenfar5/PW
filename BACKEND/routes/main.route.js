//ligações
const router = require('express').Router();
const pedido_cont = require('../controllers/pedido.controller');
const operacional_cont = require('../controllers/operacionais.controller');
const cargo_cont = require('../controllers/cargo.controller');
const entidade_cont = require('../controllers/entidade.controller');
const estado_cont = require('../controllers/estado.controller');
const grauDi_cont = require('../controllers/grau_dificuldade.controller');
const grauUr_cont = require('../controllers/grau_urgencia.controller');
const local_cont = require('../controllers/localizacao.controller');
const material_cont = require('../controllers/material.controller');
const ocorrencia_mat_cont = require('../controllers/ocorrencia_material.controller');
const ocorrencia_cont = require('../controllers/ocorrencia.controller');
const servico_cont = require('../controllers/servico.controller');
const subtipo_pedidoController = require('../controllers/sub_tipo.controller');
const tipo_pedidoController = require('../controllers/tipo_pedido.controller');
const tipo_servicoController = require('../controllers/tipo_servico.controller');
const tipologia_pedidoController = require('../controllers/tipologia_pedido.controller');
const utilizadorController = require('../controllers/utilizador.controller');
//const { body } = require('express-validator');
const { body, validationResult } = require('express-validator');
const { JSONCookie } = require('cookie-parser');



//route geral
router.get("/", function (req, res) {
    res.send("Página principal");
});

//Router Cargos
router.get('/positions', cargo_cont.verCargos);
router.get('/positions/:id', cargo_cont.verCargoID);

//Router Entidades
router.get('/entities', entidade_cont.verEntidades);
router.get('/entitiesTable', entidade_cont.verEntidadesTabela);
router.get('/entities/:id', entidade_cont.verEntidadeID);
router.put('/entities/:id', [
    body('tipo')
        .not()
        .isEmpty()
        .withMessage('Tipo é um campo de preenchimento obrigatório'),
    body('entidade')
        .not()
        .isEmpty()
        .withMessage('Nome é um campo de preenchimento obrigatório'),
], function (req, res) {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    entidade_cont.alterarEntidade(req, res)
});
router.delete('/entities/:id', entidade_cont.removerEntidade);
router.post('/entities', entidade_cont.registarEntidade);

//Router Estados
router.get('/status', estado_cont.verEstados);
router.get('/status/:id', estado_cont.verEstadoID);

//Router Gestores

//Router Grau Dificuldade
router.get('/degreedifficulty', grauDi_cont.verGrauDificuldade);
router.get('/degreedifficulty/:id', grauDi_cont.verGrauDificuldadeID);

//Router Grau Urgencia
router.get('/degreeurgency', grauUr_cont.verGrauUrgencia);
router.get('/degreeurgency/:id', grauUr_cont.verGrauUrgenciaID);

//Router Localizacoes
router.get('/locations', local_cont.verLocalizacao);
router.get('/locations/:id', local_cont.verLocalizacaoID);
router.get('/locationsNorth', local_cont.regiaoNorte);
router.get('/locationsCenter', local_cont.regiaoCentro);
router.get('/locationsLisbon', local_cont.regiaoLisboa);
router.get('/locationsAlentejo', local_cont.regiaoAlentejo);
router.get('/locationsAlgarve', local_cont.regiaoAlgarve);


router.put('/locations/:id', [
    body('morada')
        .not()
        .isEmpty()
        .withMessage('Morada é um campo de preenchimento obrigatório'),
    body('freguesia')
        .not()
        .isEmpty()
        .withMessage('Freguesia é um campo de preenchimento obrigatório'),
    body('distrito')
        .not()
        .isEmpty()
        .withMessage('Distrito é um campo de preenchimento obrigatório'),
    body('concelho')
        .not()
        .isEmpty()
        .withMessage('Concelho é um campo de preenchimento obrigatório'),
], function (req, res) {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    local_cont.alterarLocalizacaoID(req, res)
});

router.post('/locations',
    [body('morada')
        .not()
        .isEmpty()
        .withMessage('Morada é um campo de preenchimento obrigatório'),
    body('freguesia')
        .not()
        .isEmpty()
        .withMessage('Freguesia é um campo de preenchimento obrigatório'),
    body('distrito')
        .not()
        .isEmpty()
        .withMessage('Distrito é um campo de preenchimento obrigatório'),
    body('concelho')
        .not()
        .isEmpty()
        .withMessage('Concelho é um campo de preenchimento obrigatório'),
    ], function (req, res) {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        local_cont.registarLocalizacao(req, res)
    });

//Router Materiais
router.get('/materials', material_cont.verMaterial);
router.get('/materials/:id', material_cont.verMaterialID);

router.put('/materials/:id', [
    body('nome_material')
        .not()
        .isEmpty()
        .withMessage('Nome é um campo de preenchimento obrigatório'),
    body('descricao_material')
        .not()
        .isEmpty()
        .withMessage('Descrição é um campo de preenchimento obrigatório'),
    body('quantidade_disponivel')
        .isInt()
        .withMessage('Insira uma quantidade de material válida'),
    body('quantidade_total')
        .isInt()
        .withMessage('Insira uma quantidade total de material válida'),
], function (req, res) {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    material_cont.alterarMaterialID(req, res)
});

router.post('/materials', [
    body('nome_material')
        .not()
        .isEmpty()
        .withMessage('Nome é um campo de preenchimento obrigatório'),
    body('descricao_material')
        .not()
        .isEmpty()
        .withMessage('Descrição é um campo de preenchimento obrigatório'),
    body('quantidade_disponivel')
        .isInt()
        .withMessage('Insira uma quantidade de material válida'),
    body('quantidade_total')
        .isInt()
        .withMessage('Insira uma quantidade total de material válida'),

], function (req, res) {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    material_cont.registarMaterial(req, res)
});

router.delete('/materials/:id', material_cont.removerMaterial);

//Router Ocorrencias Materiais
router.get('/occurrencesMaterial', ocorrencia_mat_cont.verOcorrenciasMaterial);
router.get('/occurrencesMaterial/:id/list', ocorrencia_mat_cont.listaMaterial);
router.put('/occurrencesMaterial/:id', ocorrencia_mat_cont.atribuirMaterial);

//Router Ocorrencia
router.get('/occurrences', ocorrencia_cont.verOcorrencias);
router.get('/occurrencesTable', ocorrencia_cont.verOcorrenciasTabela);
router.get('/occurrencesCmbBox', ocorrencia_cont.cbmBoxGestores);
router.get('/occurrencesCmbBoxMaterials', ocorrencia_cont.cbmBoxMateriais);
router.get('/occurrencesLocal/:id', ocorrencia_cont.verLocalOcorrencia);
router.get('/occurrencesLevel/:id', ocorrencia_cont.verNivel);
router.get('/occurrences/:id', ocorrencia_cont.verOcorrenciasId);
router.get('/occurrencesCompleted', ocorrencia_cont.ocorrenciasConcluidas);
router.get('/occurrencesNumberRunning', ocorrencia_cont.ocorrenciasAtivas);
router.get('/occurrencesWaiting', ocorrencia_cont.ocorrenciasEspera);
router.get('/occurrencesLastDay', ocorrencia_cont.ultimasOcorrencias);
router.get('/occurrencesTotal', ocorrencia_cont.totalOcorrencias);
router.get('/occurrencesRunning', ocorrencia_cont.verOcorrenciasAtivas);
router.get('/occurrencesPerRunning', ocorrencia_cont.percOcorrAtivas);
router.get('/occurrencesPerCompleted', ocorrencia_cont.percOcorrConcluidas);
router.get('/occurrencesDistrito', ocorrencia_cont.numberLocalDistrito);
router.get('/occurrencesDistritoActive', ocorrencia_cont.numberLocalDistritoAtivas);
router.get('/occurrencesDistritoFinished', ocorrencia_cont.numberLocalDistritoConcluidas);
router.get('/occurrencesNotGestor/:id', ocorrencia_cont.notificarGestor);
router.get('/occurrencesLocal', ocorrencia_cont.listarOcorrenciaLocal);
router.get('/occurrencesAtivLocal', ocorrencia_cont.listarOcorrenciaAtivasLocal);
router.get('/occurrencesConcLocal', ocorrencia_cont.listarOcorrenciaConcluidasLocal);
router.get('/occurrencesCusto/:id', ocorrencia_cont.custoOperacao);
router.get('/occurrences/:id/material', ocorrencia_cont.preverMaterial);
router.put('/occurrences/:id/finish', ocorrencia_cont.finalizarOcorrencia);
router.get('/occurrencesweek', ocorrencia_cont.ocorrenciasSemana);
router.get('/occurrencesNotFinished/', ocorrencia_cont.verOcorrenciasNaoConcluidas);

router.put('/occurrencesGestor/:id', [
    body('id_gestor')
        .isInt()
        .withMessage('Insira um id_gestor válido'),

], function (req, res) {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    ocorrencia_cont.atribuirGestor(req, res)
});

router.put('/occurrences/:id', [

    body('id_nivel')
        .not()
        .isEmpty()
        //.isInt()
        //.trim()
        //.escape()
        .withMessage('Insira um nível de urgência válido'),
    /*body('id_estado')
        .isInt()
        //.trim()
        //.escape()
        .withMessage('Insira um estado para a ocorrência válido'),*/
], function (req, res) {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    ocorrencia_cont.alterarOcorrencia(req, res)
});

router.delete('/occurrences/:id', ocorrencia_cont.apagarOcorrencia);

//Router Operacionais
router.get('/operational', operacional_cont.verOperacionais);
router.get('/operationalTable', operacional_cont.verOperacionaisTabela);
router.get('/operational/:id', operacional_cont.verOperacionalID);
router.get('/operationalDados/:id', operacional_cont.dadosAlterar);
//router.post('/operational', operacional_cont.registarOperacionais);
router.put('/operational/:id', operacional_cont.alterarOperacional);


//Router Pedidos
router.get('/solicitations', pedido_cont.verPedidos);
router.get('/solicitations/:id', pedido_cont.verPedidosID);
router.get('/solicitationsTreated', pedido_cont.numeroPedidosTratados);
router.get('/solicitationsFalse', pedido_cont.percentagemPedidosFalsos);
router.get('/solicitationsNumberFalse', pedido_cont.numeroPedidosFalsos);
router.get('/solicitationsTotal', pedido_cont.numeroTotalPedidos);
router.get('/solicitationsWaiting', pedido_cont.numeroPedidosPendentes);
router.get('/solicitationsTabel', pedido_cont.verPedidosTabela);
router.get('/solicitationsIdLocal/:id', pedido_cont.selecionarIdLocal);
router.get('/solicitationsUrgency', pedido_cont.numeroPedidosUrgentes);
router.put('/solicitations/:id', [
    body('nome')
        .not()
        .isEmpty()
        //.trim()
        //.escape()
        .withMessage('Nome é um campo de preenchimento obrigatório'),
    body('id_subtipo_pedido')
        .isInt()
        //.trim()
        //.escape()
        .withMessage('Insira um subtipo de pedido válido'),
    body('lesados')
        .isInt()
        //.trim()
        //.escape()
        .withMessage('Insira um número válido de lesados'),
], function (req, res) {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    pedido_cont.alterarPedidoID(req, res)
});



router.post('/solicitations', [
    body('nome')
        .not()
        .isEmpty()
        //.trim()
        //.escape()
        .withMessage('Nome é um campo de preenchimento obrigatório'),
    body('morada')
        .not()
        .isEmpty()
        //.trim()
        //.escape()
        .withMessage('Morada é um campo de preenchimento obrigatório'),
    body('distrito')
        .not()
        .isEmpty()
        //.trim()
        //.escape()
        .withMessage('Distrito é um campo de preenchimento obrigatório'),
    body('concelho')
        .not()
        .isEmpty()
        //.trim()
        //.escape()
        .withMessage('Concelho é um campo de preenchimento obrigatório'),
    body('descricao_pedido')
        .not()
        .isEmpty()
        //.trim()
        //.escape()
        .withMessage('Descrição do pedido  é um campo de preenchimento obrigatório'),
    body('id_subtipo_pedido')
        .isInt()
        //.trim()
        //.escape()
        .withMessage('Insira um subtipo de pedido válido'),
    body('lesados')
        .isInt()
        //.trim()
        //.escape()
        .withMessage('Insira um número válido de lesados'),
    body('id_entidade')
        .isInt()
        //.trim()
        //.escape()
        .withMessage('Insira uma entidade válida'),
    body('email')
        //.isEmail()
        //.normalizeEmail()
        .not()
        .isEmpty()
        .withMessage('Insira um email válido'),
], function (req, res) {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    pedido_cont.registarPedido(req, res)
});
router.delete('/solicitations/:id', pedido_cont.removerPedidoID);
router.post('/solicitations/:id/convert/', pedido_cont.converterPedidoID);
router.put('/solicitations/:id/validate/', pedido_cont.validarPedidoID);


//RouterServicos
router.get('/services', servico_cont.verServicos);
router.get('/services/:id', servico_cont.verServicoId);
router.get('/servicesCmbBox', servico_cont.verServiçosComboBox)
router.get('/servicesdiscover/:id', servico_cont.descobrirServiço)
router.post('/services', [
    body('id_dificuldade')
        .isInt()
        .withMessage('Insira uma dificuldade válida'),
    body('descricao_tipo_servico')
        .not()
        .isEmpty()

        .withMessage('Descrição do tipo de serviço é um campo de preenchimento obrigatório'),
], function (req, res) {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    servico_cont.adicionarServico(req, res);
});

router.put('/services/:id', [
    body('id_dificuldade')
        .isInt()
        .withMessage('Insira uma dificuldade válida'),
    body('id_tipo_servico')
        .isInt()
        .withMessage('Insira um tipo de serviço válido'),
], function (req, res) {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    servico_cont.alterarServicoID(req, res);
});

router.delete('/services/:id', servico_cont.apagarServico);

//Router Subtipo de Pedido
router.get('/subtype_solicitations', subtipo_pedidoController.verSubtipoPedido);
router.get('/subtype_solicitations/:id', subtipo_pedidoController.verSubtipoPedidoId);

//Router tipos de pedido
router.get('/type_solicitations', tipo_pedidoController.VerTipoPedidos);
router.get('/type_solicitations/:id', tipo_pedidoController.verTipoPedidosId);

//Router tipos de serviço
router.get('/type_services', tipo_servicoController.VerTipoServicos);
router.get('/type_services/:id', tipo_servicoController.verTipoServicosId);

//Router Tipologia de pedido
router.get('/typology_solicitations', tipologia_pedidoController.VerTipologiaPedidos);
router.get('/typology_solicitations/:id', tipologia_pedidoController.verTipologiaPedidosId);

//Router utilizadores (não esta completo)
router.get('/users', utilizadorController.VerUtilizadores);
router.get('/users/:username', utilizadorController.verUtilizadoresUsername);
router.put('/usersNewPassword/:email_utilizador', utilizadorController.AlterarPassword);
router.post('/users', [
    body('username')
        .isLength({ min: 5, max: 15 })
        .withMessage('Username deve ter entre 5 e 15 caracteres'),
    body('nome')
        .not()
        .isEmpty()
        .withMessage('Insira um nome válido'),
    body('email_utilizador')
        .isEmail()
        .withMessage('Insira um email válido'),
], function (req, res) {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    utilizadorController.RegistarUtilizadores(req, res);
});

router.put('/users/:username', [
    body('nome')
        .not()
        .isEmpty()
        .withMessage('Insira um nome válido'),
    body('email_utilizador')
        .isEmail()
        .withMessage('Insira um email válido'),
    body('password')
        .isLength({ min: 8, max: 15 })
        .withMessage('Password deve ter entre 8 e 15 caracteres')
], function (req, res) {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    utilizadorController.AlterarUtilizadores(req, res);
});

module.exports = router;

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    else {
        return next();
    }
}