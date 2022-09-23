const endPoint = "https://xp41-soundgarden-api.herokuapp.com/events/";
const urlPage = window.location.href;
const id = urlPage.substring(urlPage.lastIndexOf("=") + 1);

async function exibirInfoEvento() {
    try {
        const response = await fetch(endPoint + id, {
            headers: {
                "Content-Type": "application/json"
            }
        });

        const objEvento = await response.json();
        const form = document.querySelector(".col-6");

        form.onsubmit = (event) => {
            event.preventDefault();
        }

        const dataHoraIso = objEvento.scheduled;
        const dataHoraCerta = dataHoraIso.slice(0,16);
        console.log({dataHoraCerta})
        formInfoEvento = `<form class="col-6">
        <div class="mb-3">
            <label for="nome" class="form-label">Nome</label>
            <input type="text" class="form-control" id="nome" aria-describedby="nome" value= "${objEvento.name}">
        </div>
        <div class="mb-3">
            <label for="poster" class="form-label">poster</label>
            <input type="text" class="form-control" id="poster" aria-describedby="poster" value="${objEvento.poster}">
            <small>adicione o link da imagem</small>
        </div>
        <div class="mb-3">
            <label for="atracoes" class="form-label">Atrações</label>
            <input type="text" class="form-control" id="atracoes" aria-describedby="atracoes" value = "${objEvento.attractions}">
            <small>insira o nome dos artistas separados por vírgula</small>
        </div>
        <div class="mb-3">
            <label for="descricao" class="form-label">Descrição</label>
            <textarea name="descricao" id="descricao" class="form-control" rows="5">${objEvento.description}</textarea>
        </div>
        <div class="mb-3">
            <label for="data" class="form-label">Data</label>
            <input type="datetime-local" name="data" id="data" class="form-control"
                value="${dataHoraCerta}">
        </div>
        <div class="mb-3">
            <label for="lotacao" class="form-label">Lotação (número de ingressos disponiveis)</label>
            <input type="number" class="form-control" id="lotacao" aria-describedby="lotacao" value="${objEvento.number_tickets}">
        </div>
        <button type="submit" class="btn btn-primary">enviar</button>
      </form>`
        form.innerHTML = formInfoEvento;
        const btnEnviar = document.querySelector("button");
        btnEnviar.onclick = editarEvento;
    } catch (error) {
        console.log(error);
    };
};
async function editarEvento(event) {
    try {
        const inputData = document.querySelector("#data");
        const inputNome = document.querySelector("#nome");
        const inputAtracoes = document.querySelector("#atracoes");
        const inputDescricao = document.querySelector("#descricao");
        const inputLotacao = document.querySelector("#lotacao");
        const inputLink =document.querySelector("#poster");
        event.preventDefault();
        const scheduledDate = new Date(inputData.value);
        const evento = {
            name: inputNome.value,
            poster: inputLink.value,
            attractions: [inputAtracoes.value],
            description: inputDescricao.value,
            scheduled: scheduledDate.toISOString(),
            number_tickets: inputLotacao.value
        };
        console.log(evento)
        const response = await fetch(endPoint + id, {
            method: "PUT",
            headers: {
                "Content-Type" : "application/json"
            },
            body: JSON.stringify(evento)
        });
        alert("Informações do evento atualizadas com sucesso!");
    } catch (error) {
        console.log(error);
        alert("Ops! não conseguimos cadastrar seu evento, por favor verificar os seus dados!");
    }
}
exibirInfoEvento();