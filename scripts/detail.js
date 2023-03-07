let params = new URLSearchParams(document.location.search);
let id = params.get("id");

const eventoFiltro = data.events.filter(event => event._id == id);
const evento = eventoFiltro[0];

const container = document.getElementById("tarjeta");
let textHTML = "";

textHTML = `<div class="row">
<div class="col-md-12 col-lg-7">
  <img src="${evento.image}" class="p-3 w-100 h-100" alt="event image">
</div>
<div class="col-md-12 col-lg-5">
  <div class="card-body d-flex flex-column mt-1 justify-content-between h-100 p-4">
    <div class="d-flex justify-content-between flex-wrap mb-3">
    <p class="card-text"><small><b>Date:</b> ${evento.date}</small></p>
    <p class="card-text"><small><b>Place:</b> ${evento.place}</small></p>
    </div>
    <h5 class="card-title text-center">${evento.name}</h5>
    <p class="card-text">${evento.description}</p>

    <p class="card-text"><small><b>Capacity:</b> ${evento.capacity}</small></p>
    <p class="card-text"><small>${evento.assistance? "<b>Assistance: </b>" + evento.assistance: "<b>Estimate: </b>" + evento.estimate}</small></p>
  
    <p class="card-text align-self-end precio"><b>Price: </b>$${evento.price}</p>
  </div>
</div>
</div>`;

container.innerHTML = textHTML;