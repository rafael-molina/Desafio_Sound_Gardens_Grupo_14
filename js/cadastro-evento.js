// Recebendo dados de um novo cadastro de evento.
const inputNome = document.querySelector("#nome");
const inputAtracoes = document.querySelector("#atracoes");
const inputDescricao = document.querySelector("#descricao");
const selectData = document.querySelector("#data");
const selectLotacao = document.querySelector("#lotacao");
const btnEnviar = document.querySelector(".btn-primary");
const inputLink =document.querySelector("#poster");
// Enviando cadastro para API
const SGARDEN_URL = "https://xp41-soundgarden-api.herokuapp.com/events";
async function novosEventos(event) {
    try{
        event.preventDefault();
        const dataTranform = new Date(selectData.value);
        const enviaEventos = {
            name: inputNome.value,
            poster: inputLink.value,
            attractions: [
                inputAtracoes.value
            ],
            description: inputDescricao.value,
            scheduled: dataTranform.toISOString(),
            number_tickets: selectLotacao.value,
        };
        const response = await fetch(SGARDEN_URL, {
            method: "POST",
            body: JSON.stringify(enviaEventos),
            headers: {
                "Content-Type": "application/json",
            },
        });
        alert("Evento cadastrado com sucesso!");
    } catch(error){
        console.log(error);
        alert("Ops! não conseguimos cadastrar seu evento, por favor verificar os seus dados!");
    }
};
btnEnviar.onclick = novosEventos;