const eventStats = document.getElementById("event stats");
const eventStatsUpcoming = document.getElementById("upcoming events");
const eventStatsPast = document.getElementById("past events");
const loading = document.getElementsByClassName("loading");

Array.from(loading).forEach(element => {
    element.style.display = "inline block";
});

fetch('https://mindhub-xj03.onrender.com/api/amazing')
    .then(response => response.json())
    .then(datos => {
        let eventos = datos.events;

        calcularEstadisticas(eventos);
        calcularUpcoming(eventos.filter(evento => evento.date > datos.currentDate));
        calcularPast(eventos.filter(evento => evento.date < datos.currentDate));

        Array.from(loading).forEach(element => {
            element.style.display = "none";
        });
    }).catch(error => console.log(error.message))


function calcularEstadisticas(eventos) {
    let textHTML = '';
    let highAttendance = { id: 0, name: '', percentage: 0 };
    let lowAttendance = { id: 0, name: '', percentage: 100 };
    let largerCapacity = { id: 0, name: '', capacity: 0 };

    eventos.forEach(ev => {
        if (ev.capacity > largerCapacity.capacity) {
            largerCapacity.id = ev._id;
            largerCapacity.name = ev.name;
            largerCapacity.capacity = ev.capacity;
        }
        if (ev.hasOwnProperty('assistance')) {
            //let percentage = ev.assistance * 100 / ev.capacity;
            let percentage = (ev.assistance / ev.capacity) * 100;
            if (percentage > highAttendance.percentage) {
                highAttendance.id = ev._id;
                highAttendance.name = ev.name;
                highAttendance.percentage = percentage;
            }
            if (percentage < lowAttendance.percentage) {
                lowAttendance.id = ev._id;
                lowAttendance.name = ev.name;
                lowAttendance.percentage = percentage;
            }
        }
    })

    textHTML = `
<tr>
    <td><a onclick='verDetalle(${highAttendance.id})'>${highAttendance.name + "  %" + highAttendance.percentage.toFixed(2)}</a></td>
    <td><a onclick='verDetalle(${lowAttendance.id})'>${lowAttendance.name + "  %" + lowAttendance.percentage.toFixed(2)}</a></td>
    <td><a onclick='verDetalle(${largerCapacity.id})'>${largerCapacity.name + " cap: " + largerCapacity.capacity}</a></td>
</tr>
`
    eventStats.innerHTML = textHTML;
}




function calcularUpcoming(eventos) {

    let calcPorCategoria = calcularEventos(eventos);
    let textHTML = '';

    calcPorCategoria.forEach(calc => {
        textHTML += `
    <tr>
        <td>${calc.category}</td>
        <td>$ ${calc.revenue}</td>
        <td>${((calc.asistencia/calc.capacity)*100).toFixed(2)} %</td>
    <tr>
    `
    });

    eventStatsUpcoming.innerHTML = textHTML;
}

function calcularPast(eventos) {

    let calcPorCategoria = calcularEventos(eventos);
    let textHTML = '';

    calcPorCategoria.forEach(calc => {
        textHTML += `
      <tr>
          <td>${calc.category}</td>
          <td>$ ${calc.revenue} </td>
          <td>${((calc.asistencia/calc.capacity)*100).toFixed(2)} %</td>
      <tr>
      `
    });

    eventStatsPast.innerHTML = textHTML;
}

function calcularEventos(eventos) {
    
    const events = eventos.map(ev => {
        let eventoCalculado = {};
        let asistencia = ev.assistance ? ev.assistance : ev.estimate;
        let revenue = ev.price * asistencia;
        eventoCalculado = { category: ev.category, revenue: revenue, asistencia:asistencia, capacity: ev.capacity }
        return eventoCalculado;
    });

    const categories = events.reduce((acum, item) => {
        if (acum[item.category]) {
            acum[item.category].revenue = acum[item.category].revenue + item.revenue;
            acum[item.category].asistencia = acum[item.category].asistencia + item.asistencia;
            acum[item.category].capacity = acum[item.category].capacity + item.capacity;
        } else {
            acum[item.category] = item;
        }
        return acum
    }, {});

    const categoriesAvg = Object.values(categories).map(({ ...item }) => {
        return { ...item};
    });


    /* const events = eventos.map(ev => {
        let eventoCalculado = {};
        let asistencia = ev.assistance ? ev.assistance : ev.estimate;
        let revenue = ev.price * asistencia;
        let percentage = (asistencia / ev.capacity) * 100;
        eventoCalculado = { category: ev.category, revenue: revenue, percentage: percentage }
        return eventoCalculado;
    });

    const categories = events.reduce((acum, item) => {
        if (acum[item.category]) {
            acum[item.category].revenue = acum[item.category].revenue + item.revenue;
            acum[item.category].percentage = acum[item.category].percentage + item.percentage;
            acum[item.category].contador = acum[item.category].contador + 1;
        } else {
            acum[item.category] = item;
            acum[item.category].contador = 1;

        }
        return acum
    }, {});

    const categoriesAvg = Object.values(categories).map(({ ...item }) => {
        return { ...item, percentage: (item.percentage / item.contador).toFixed(2) };
    }); */

    //return categoriesAvg.sort((a, b) => (a.category > b.category) ? 1 : ((b.category > a.category) ? -1 : 0));

    return categoriesAvg.sort((a, b) => (a.category > b.category) ? 1 : ((b.category > a.category) ? -1 : 0));
}
