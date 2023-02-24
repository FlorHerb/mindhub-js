const contenedor = document.getElementById("rowCards");
const eventos = data.events;

contenedor.innerHTML = crearEventos(eventos);

function crearEventos(datos){
    let textoHTML= "";
    for (const dato of datos) {
        textoHTML +=
            `<div class="col">
            <div class="card h-100">
        <img src=${dato.image} class="card-img-top p-3 embed-responsive-item" alt="music concert">
        <div class="card-body">
            <h5 class="card-title text-center">${dato.name}</h5>
            <p class="card-text text-center">${dato.description}</p>
        </div>
        <div class="d-flex flex-row justify-content-between m-4 gap-2">
            <small>$ ${dato.price}</small>
            <a href="./detail.html" class="btn">See more...</a>
        </div>
        </div>
        </div>`;
    }
    return textoHTML;
}

