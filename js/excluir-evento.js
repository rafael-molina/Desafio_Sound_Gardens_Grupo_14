

const endPoint = "https://xp41-soundgarden-api.herokuapp.com/events/";
const urlPage = window.location.href;
const id = urlPage.substring(urlPage.lastIndexOf("=") + 1);


async function exibirInfoEvento() {
    try {
        const response = await fetch(endPoint + id, {
            headers: {
                "Content-Type" : "application/json"
            }
        });
        
        const objEvento = await response.json();
        const form = document.querySelector(".col-6");
        
        form.onsubmit = (event) => {
            event.preventDefault();

        }

        const dataHoraIso = objEvento.scheduled;
        const dataHoraBr = new Date(dataHoraIso).toLocaleString();

        formInfoEvento = `<form class="col-6">
            <div class="mb-3">
            <label for="nome" class="form-label">Nome</label>
            <input type="text" class="form-control" id="nome" aria-describedby="nome" value="${objEvento.name}"
                disabled>
            </div>
            <div class="mb-3">
            <label for="banner" class="form-label">Banner</label>
            <input type="text" class="form-control" id="banner" aria-describedby="banner"
                value="${objEvento.poster}" disabled>
            <small>adicione o link da imagem</small>
            </div>
            <div class="mb-3">
            <label for="atracoes" class="form-label">Atrações</label>
            <input type="text" class="form-control" id="atracoes" aria-describedby="atracoes"
                value="${objEvento.attractions}" disabled>
            <small>insira o nome dos artistas separados por vírgula</small>
            </div>
            <div class="mb-3">
            <label for="descricao" class="form-label">Descrição</label>
            <textarea name="descricao" id="descricao" class="form-control" rows="5" disabled>${objEvento.description}
            </textarea>
            </div>
            <div class="mb-3">
            <label for="data" class="form-label">Data</label>
            <input type="datetime" name="data" id="data" class="form-control"
                 value="${dataHoraBr}" disabled>
            </div>
            <div class="mb-3">
            <label for="lotacao" class="form-label">Lotação (número de ingressos disponiveis)</label>
            <input type="number" class="form-control" id="lotacao" aria-describedby="lotacao"
                value="${objEvento.number_tickets}" disabled>
            </div>
            <button type="submit" class="btn btn-danger">excluir pra sempre</button>
            </form>`

        form.innerHTML = formInfoEvento;
        const btnExcluir = document.querySelector("button");

        btnExcluir.onclick = excluirEvento;

    } catch (error) {
        console.log(error);
        
    }
}

exibirInfoEvento();

async function excluirEvento(event) {
    try {

        event.preventDefault();

        const response = await fetch(endPoint + id, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            }

        })

        alert("Evento excluído com sucesso!")
        
    } catch (error) {
        console.log(error);
        alert("O evento não pôde ser excluído.")
        
    }
}
