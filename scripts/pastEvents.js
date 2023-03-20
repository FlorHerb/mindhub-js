const contenedor = document.getElementById("rowCards");
//const eventosPasados = data.events.filter(evento => evento.date < data.currentDate);
let checkeados = [];
let eventosPasados = [];
let checkboxes = [];
const listaCheckbox = document.getElementById("collapse2");
const textBuscar = document.getElementById("textBuscar");
const btnBuscar = document.getElementById("btnBuscar");
const loading = document.getElementById("loading");

traerEventos();

function traerEventos() {
  loading.style.display = "block";
  //fetch("./events.json")
  fetch('https://mindhub-xj03.onrender.com/api/amazing')
    .then(response => response.json())
    .then(datos => {
      eventosPasados = datos.events;
      eventosPasados = eventosPasados.filter(evento => evento.date < datos.currentDate);
      contenedor.innerHTML = crearEventos(eventosPasados);
      listaCheckbox.innerHTML = crearCheckbox(eventosPasados);

      checkboxes = document.getElementsByName("category");

      checkboxes.forEach(check => {
        check.addEventListener("change", () => {
          let text = textBuscar.value.toLowerCase();
          checkeados = Array.from(checkboxes).filter(ch => ch.checked).map(ch => ch.value);
          contenedor.innerHTML = buscarEventos(text, eventosPasados, checkeados);
        })
      })
      loading.style.display = "none";

    }).catch(error => console.log(error.message))
}



btnBuscar.addEventListener("click", (e) => {
  e.preventDefault();
  contenedor.innerHTML = buscarEventos(textBuscar.value.toLowerCase(), eventosPasados, checkeados);
});

textBuscar.addEventListener("keyup", () => {
  let text = textBuscar.value.toLowerCase();
  contenedor.innerHTML = buscarEventos(text, eventosPasados, checkeados);
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

