window.onload = function () {

    nomeUser.innerText = localStorage.User;

    
$('#registarServico').click(function () {
    let descricao = document.getElementById("descricao").value;
    if (descricao == "") {
        swal.fire("Preencha o campo com o descrição!");
        //formNewEntidade.tipo.focus();
        return false;
    }
    if (descricao.length < 5) {
        swal.fire("Insira uma descrição válida!");
        //formNewEntidade.tipo.focus();
        return false;
    }
    else {
        //return true;
        //função de registar
        var data = {};
        data.descricao_tipo_servico = document.getElementById("descricao").value;
        data.id_dificuldade = document.getElementById("nivel").value;
        console.log(data); //debugging para ver os dados que foram enviados
        //chamada fetch para envio dos dados para o servior via POST
        fetch('http://127.0.0.1:3000/services/', {
            headers: { 'Content-Type': 'application/json' },
            method: 'POST',
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then((out) => {
                if (out.message.pt == "Dados inseridos com sucesso") {
                    //completar
                    swal.fire({
                        icon: "success",
                        title: "Sucesso",
                        text: out.message.pt
                    }).then(function () {
                        window.location.href = "./registarServiço.html";
                    })
                }
                if (out.message.pt == "Os dados que inseriu são inválidos!") {
                    swal.fire({
                        icon: "error",
                        title: "Erro",
                        text: "Este serviço já foi registado anteriormente"
                    }).then(function () {
                        window.location.href = "./registarServiço.html";
                    })
                }
            })
            .catch(error => {
                console.log(error);
            })
    }
});
};
