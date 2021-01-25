

//Número de ocorrências nas últimas 24 horas
fetch('http://127.0.0.1:3000/occurrencesLastDay/')
    .then(res => res.json())
    .then((out) => {
        ocorrenciasUltimas.innerText = out.nmr_ocor;

    })
    .catch(err => console.error(err));

//Número de ocorrências ativas
fetch('http://127.0.0.1:3000/occurrencesNumberRunning/')
    .then(res => res.json())
    .then((out) => {
        ocorrenciasAtivas.innerText = out.nmr_ocor;

    })
    .catch(err => console.error(err));

//Número de ocorrências totais
fetch('http://127.0.0.1:3000/occurrencesTotal/')
    .then(res => res.json())
    .then((out) => {
        ocorrenciasTotal.innerText = out.nmr_ocor;

    })
    .catch(err => console.error(err));

//Número de ocorrências concluídas
fetch('http://127.0.0.1:3000/occurrencesCompleted/')
    .then(res => res.json())
    .then((out) => {
        ocorrenciasCompletas.innerText = out.nmr_ocor;

    })
    .catch(err => console.error(err));

//---------------------------------------------------------------------------
//Visão Geral de Ocorrências
//Ocorrências ativas
fetch('http://127.0.0.1:3000/occurrencesPerRunning/')
    .then(res => res.json())
    .then((out) => {
        percOcorAtivasBarra.style.width = out;
        percOcorAtivas.innerText = out;

    })
    .catch(err => console.error(err));

//ocorrências concluídas
fetch('http://127.0.0.1:3000/occurrencesPerCompleted/')
    .then(res => res.json())
    .then((out) => {
        percOcorConcluidasBarra.style.width = out;
        percOcorConcluidas.innerText = out;

    })
    .catch(err => console.error(err));

//utilizador conectado
nomeUser.innerText = localStorage.User;

//logout
$('#btnsair').click(function () {
    fetch('http://127.0.0.1:3000/logout/')
        .then(res => res.json())
        .then((out) => {
            swal.fire({
                icon: "success",
                tittle: "Logout com sucesso",
                text: out.message.pt,
            })
                .then(function () {
                    window.location.href = "../FrontOffice/index.html";
                })
        })
        .catch(err => console.error(err));
})