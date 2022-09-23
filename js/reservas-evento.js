

endPoint = "https://xp41-soundgarden-api.herokuapp.com/bookings/event/"
urlPage = window.location.href;
id = urlPage.substring(urlPage.lastIndexOf("=") + 1);

async function exibirReservasEvento() {
    try {
        const response = await fetch(endPoint + id, {
            headers: {
                "Content-Type": "application/json"
            }

        })

        const reservas = await response.json();
        console.log({reservas})

        for (let i = 0; i < reservas.length; i++) {
            const reserva = reservas[i];
            const linhaReserva = `<tr>
                <th scope="row">${i + 1}</th>
                <td>${reserva._id}</td>
                <td>${reserva.owner_name}</td>
                <td>${reserva.owner_email}</td>
                <td>${reserva.number_tickets}</td>
                
                </tr>`

                const listaReservasEvento = document.querySelector("tbody");
                listaReservasEvento.innerHTML += linhaReserva;
            
        }    
        
    } catch (error) {
        console.log(error);
        
    };
};

exibirReservasEvento();