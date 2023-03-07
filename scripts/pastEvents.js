const contenedor = document.getElementById("rowCards");
const eventosPasados = data.events.filter(evento => evento.date < data.currentDate);

contenedor.innerHTML = crearEventos(eventosPasados);

const listaCheckbox= document.getElementById("collapse2");
listaCheckbox.innerHTML= crearCheckbox(eventosPasados);

const textBuscar = document.getElementById("textBuscar");

textBuscar.addEventListener("keyup", () => {
    let filtro = eventosPasados.filter( ev => ev.name.toLowerCase().includes(textBuscar.value.toLowerCase()));   
    contenedor.innerHTML = crearEventos(filtro);
})
