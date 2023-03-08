function crearEventos(datos) {
    let textoHTML = "";
    datos.forEach(dato => {
        textoHTML +=
            `<div class="col">
        <div class="card h-100">
    <img src=${dato.image} class="card-img-top p-3 embed-responsive-item" alt="${dato.name}">
    <div class="card-body">
        <h5 class="card-title text-center">${dato.name}</h5>
        <p class="card-text text-center">${dato.description}</p>
    </div>
    <div class="d-flex flex-row justify-content-between m-4 gap-2">
        <small>$ ${dato.price}</small>
        <input type="button" onclick="verDetalle('${dato._id}')" class="btn" value="See more...">
    </div>
    </div>
    </div>`;
    });
    return textoHTML;
}

function crearCheckbox(datos) {
    const categorias = datos.map(dato => dato.category);
    const listCategorias = [...new Set(categorias)];

    let textoHTML = "";
    listCategorias.forEach(c => {
        textoHTML +=
        `
        <div class="input-group flex-fill check">
        <label for="${c}" class="form-check-label">
            <input type="checkbox" class="form-check-input mt-0" name="category"
                value="${c}">
                ${c}
        </label>
    </div>
        `});
    return textoHTML;
}

function buscarEventos(text, eventos, checkboxes){
    let eventosFinales= [];
    let eventosXCategoria = eventos.filter(ev => checkboxes.includes(ev.category));
    if (eventosXCategoria.length > 0) {
        eventosFinales = eventosXCategoria.filter(ev => ev.name.toLowerCase().includes(text) ||
        ev.description.toLowerCase().includes(text)); 
    } else {
        eventosFinales = eventos.filter(ev => ev.name.toLowerCase().includes(text) ||
        ev.description.toLowerCase().includes(text));
    }

    return eventosFinales.length > 0 ? 
    crearEventos(eventosFinales) :
     "<h5 class='aviso'>No hay resultados disponibles, intente con otra búsqueda</h5>";
}

function verDetalle(id) {
    window.location.href = `./detail.html?id=${id}`;
}





