

const BASE_URL = "https://xp41-soundgarden-api.herokuapp.com/events";
const princevento = document.querySelector('.container.d-flex.justify-content-center.align-items-center');

const modal = document.querySelector(".modal");
const span = document.querySelector(".close")

span.onclick = function () {
    modal.style.display = "none";
}

window.onclick = function (event) {
    if(event.target == modal)
        modal.style.display = "none";
}

async function monstEventos() {
    try {
        const response = await fetch(BASE_URL, {
            headers: {
                "Content-Type": "application/json"
            }
        });

        const data = await response.json();
        const lista = data.slice(0,3);
        
        lista.forEach((evento) => {
            const dataHoraIso = evento.scheduled;
            const data_americana = dataHoraIso.substring(0,10);
            const data_brasileira = data_americana.split('-').reverse().join('/');
            const card = `<article class="evento card p-5 m-3">
            <h2> ${evento.name} - </h2>
            <h2> ${data_brasileira} </h2>
            <h4> ${evento.atractions} - </h4>
            <p> ${evento.description} - </p>
            <a href="#${evento._id}" class="btn btn-primary">reservar ingresso</a>
            </article>`
            
            princevento.innerHTML += card
        });

        const btnReservarIngresso = document.querySelectorAll(".btn.btn-primary");

        btnReservarIngresso.forEach((button) => {
            button.onclick = function () {
                modal.style.display = "block";
            }
        });

        btnEfetuarReserva = document.querySelector(".modal-input-btn")

        btnEfetuarReserva.onclick = reservarIngresso;

    } catch (error) {
        console.log(error)
    };
};

async function reservarIngresso(event) {
    try {

        event.preventDefault();

        const urlPage = window.location.href;
        const id = urlPage.substring(urlPage.lastIndexOf("#") + 1);
        
        const inputName = document.querySelector("#name");
        const inputEmail = document.querySelector("#email");
        const inputTickets = document.querySelector("#number_tickets")

        const novaReserva = {
            owner_name: inputName.value,
            owner_email: inputEmail.value,
            number_tickets: inputTickets.value,
            event_id: id
        }

        const response = await fetch("https://xp41-soundgarden-api.herokuapp.com/bookings", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(novaReserva)

        });

        if(response.ok) {
            alert("Reserva efetuada com sucesso!")
            
        } else {
            alert("Nâo foi possível efetuar a reserva, por favor entre em contato através dos nossos canais de atendimento.")

        };
        
    } catch (error) {
        console.log(error);
        
    };
};

monstEventos();