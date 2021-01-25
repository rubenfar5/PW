window.onload = function () {

    nomeUser.innerText = localStorage.User;

    carregarDados();
}

function carregarDados() {
    fetch('http://127.0.0.1:3000/users/' + localStorage.User, {
        headers: { 'Content-Type': 'application/json' },
        method: "GET",
    })
        .then(res => res.json())
        .then((out) => {
            document.getElementById("username").value = out.username;
            document.getElementById("nome").value = out.nome;
            document.getElementById("email").value = out.email_utilizador;
        })
        .catch(error => {
            console.log(error);
        })
}


$('#alterarPerfil').click(function () {
    let nome = document.getElementById("nome").value;
    let password = document.getElementById("password").value;
    let email = document.getElementById("email").value;
    let confirmar_pasword = document.getElementById("confirmar_password").value;

    if (nome == "") {
        swal.fire("Preencha o campo com o nome!");
        formNewOperacional.nome.focus();
        return false;
    }
    if (nome.length < 2) {
        swal.fire("Insira um nome completo!");
        formNewOperacional.nome.focus();
        return false;
    } 

    if (password == "") {
        swal.fire("Preencha o campo com a password!");
        formNewOperacional.nome.focus();
        return false;
    }
    if (password.length > 15 || password.length < 8) {
        swal.fire("Insira uma password entre 8 e 15 caracteres!");
        formNewOperacional.nome.focus();
        return false;
    }

    if (email == "") {
        swal.fire("Preencha o email com a password!");
        formNewOperacional.nome.focus();
        return false;
    }

        var filter = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
        if (!filter.test(email)) {
            swal.fire('Digite o email corretamente');
            document.getElementById("email").focus();
            return false;
        }
    

    if (confirmar_pasword == "") {
        swal.fire("Preencha o campo com a confirmação da password!");
        formNewOperacional.nome.focus();
        return false;
    }
    if (password != confirmar_pasword) {
        swal.fire("A password de confirmação não coincide com a password inserida em cima!");
        formNewOperacional.nome.focus();
        return false;
    }

    else {
        var data = {};
        data.nome = document.getElementById("nome").value;
        data.email_utilizador = document.getElementById("email").value;
        data.password = document.getElementById("password").value;
        console.log(data); //debugging para ver os dados que foram enviados
        //chamada fetch para envio dos dados para o servior via POST
        fetch('http://127.0.0.1:3000/users/' + localStorage.User, {
            headers: { 'Content-Type': 'application/json' },
            method: 'PUT',
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then((out) => { 
                    swal.fire({
                        icon: "success",
                        title: "Sucesso",
                        text: "Perfil alterado com sucesso"
                    }).then(function () {
                        window.location.href = "./dadosPerfil.html";
                    })
            })
            .catch(error => {
                console.log(error);
            })
    }
});
