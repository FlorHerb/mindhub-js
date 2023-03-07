const contenedor = document.getElementById("rowCards");
const eventosNuevos = data.events.filter(evento => evento.date >= data.currentDate);

contenedor.innerHTML = crearEventos(eventosNuevos);


const listaCheckbox= document.getElementById("collapse2");
listaCheckbox.innerHTML= crearCheckbox(eventosNuevos);

const textBuscar = document.getElementById("textBuscar");
textBuscar.addEventListener("keyup", () => {
    let filtro = eventosNuevos.filter( ev => ev.name.toLowerCase().includes(textBuscar.value.toLowerCase()));   
    contenedor.innerHTML = crearEventos(filtro);
})