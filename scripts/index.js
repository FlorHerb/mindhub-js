const contenedor = document.getElementById("rowCards");
const eventos = data.events;
contenedor.innerHTML = crearEventos(eventos);

const listaCheckbox= document.getElementById("collapse2");
listaCheckbox.innerHTML= crearCheckbox(eventos);

const btnBuscar = document.getElementById("btnBuscar");
btnBuscar.addEventListener("click", buscarEventos);

const textBuscar = document.getElementById("textBuscar");

textBuscar.addEventListener("keyup", () => {
    let filtro = eventos.filter( ev => ev.name.toLowerCase().includes(textBuscar.value.toLowerCase()));   
    contenedor.innerHTML = crearEventos(filtro);
})


