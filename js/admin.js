

const listaEventos = document.querySelector("tbody");

async function listarEventos() {
    try {
        const response = await fetch("https://xp41-soundgarden-api.herokuapp.com/events", {
            headers: {
                "Content-Type": "application/json"
            }
        })

        const data = await response.json(); 

        for (let i = 0; i < data.length; i++) {
            const evento = data[i];
            const dataHoraIso = evento.scheduled;
            const data_americana = dataHoraIso.substring(0,10);
            const data_brasileira = data_americana.split('-').reverse().join('/');

            const linhaEvento = `<tr>
                <th scope="row">${i + 1}</th>
                <td>${data_brasileira}</td>
                <td>${evento.name}</td>
                <td>${evento.attractions}</td>
                <td>
                    <a href="./reservas-evento.html?id=${evento._id}" class="btn btn-dark">ver reservas</a>
                    <a href="./editar-evento.html?id=${evento._id}" class="btn btn-secondary">editar</a>
                    <a href="./excluir-evento.html?id=${evento._id}" class="btn btn-danger">excluir</a>
                </td>
            </tr>` 

            listaEventos.innerHTML += linhaEvento;
            
        };
        
    } catch (error) {
        console.log(error);
        
    };
};

listarEventos();