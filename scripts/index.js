const contenedor = document.getElementById("rowCards");
const eventos = data.events;
let checkeados = [];
contenedor.innerHTML = crearEventos(eventos);

const listaCheckbox = document.getElementById("collapse2");
listaCheckbox.innerHTML = crearCheckbox(eventos);


const textBuscar = document.getElementById("textBuscar");

const btnBuscar = document.getElementById("btnBuscar");
btnBuscar.addEventListener("click", (e) => { 
    e.preventDefault();
    contenedor.innerHTML = buscarEventos(textBuscar.value.toLowerCase(), eventos, checkeados);
});

textBuscar.addEventListener("keyup", () => {
    let text = textBuscar.value.toLowerCase();
    contenedor.innerHTML = buscarEventos(text, eventos, checkeados);
})

const checkboxes = document.getElementsByName("category");

checkboxes.forEach(check => {
    check.addEventListener("change", () => {
        let text = textBuscar.value.toLowerCase();
        checkeados = Array.from(checkboxes).filter(ch => ch.checked).map(ch => ch.value);
       contenedor.innerHTML = buscarEventos(text, eventos, checkeados);
    })
})


let btnSubir = document.getElementById("btn-subir");

window.onscroll = function () {
  scrollFunction();
};

function scrollFunction() {
  if (
    document.body.scrollTop > 20 ||
    document.documentElement.scrollTop > 20
  ) {
    btnSubir.style.display = "block";
  } else {
    btnSubir.style.display = "none";
  }
}
btnSubir.addEventListener("click", subirArriba);

function subirArriba() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}



