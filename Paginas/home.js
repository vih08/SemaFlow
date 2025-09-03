// Inicializa o mapa
const map = L.map('map').setView([-23.5505, -46.6333], 6);

// Camada base estilo Google Maps
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>'
}).addTo(map);

let rota;
let mostrarSemaforos = false;
let semaforos = [];
let semaforosMarkers = [];
const painel = document.getElementById("side-panel");
const listaSemaforos = document.getElementById("semaforos-list");

// Função para criar ícone do semáforo
const criarIconeSemaforo = (estado) => {
    const cor = estado === "verde" ? "green" : estado === "amarelo" ? "orange" : "red";
    return L.divIcon({
        className: "custom-icon",
        html: `<div style="background:${cor}; width:14px; height:14px; border-radius:50%; border:2px solid #fff;"></div>`
    });
};

// Alterna o estado dos semáforos a cada 1 minuto
const atualizarSemaforos = () => {
    semaforos.forEach((s, i) => {
        if (s.estado === "verde") semaforos[i].estado = "amarelo";
        else if (s.estado === "amarelo") semaforos[i].estado = "vermelho";
        else semaforos[i].estado = "verde";

        // Atualiza o ícone do semáforo
        if (semaforosMarkers[i]) {
            semaforosMarkers[i].setIcon(criarIconeSemaforo(semaforos[i].estado));
            semaforosMarkers[i].bindPopup(`<strong>Semáforo</strong><br>Status: ${semaforos[i].estado}`);
        }
    });

    atualizarPainel();
    recalcularRota();
};
setInterval(atualizarSemaforos, 6000);

// Função para gerar semáforos ao longo da rota
const gerarSemaforos = (waypoints) => {
    semaforos = [];
    semaforosMarkers.forEach(m => map.removeLayer(m));
    semaforosMarkers = [];

    for (let i = 0; i < waypoints.length; i += 60) {
        const estadoInicial = ["verde", "amarelo", "vermelho"][Math.floor(Math.random() * 3)];
        semaforos.push({
            coords: [waypoints[i].latLng.lat, waypoints[i].latLng.lng],
            estado: estadoInicial
        });
    }
    atualizarPainel();
};

// Atualiza painel lateral com os status
const atualizarPainel = () => {
    listaSemaforos.innerHTML = "";
    semaforos.forEach((s, i) => {
        const cor = s.estado === "verde" ? "🟢" : s.estado === "amarelo" ? "🟡" : "🔴";
        const item = document.createElement("li");
        item.textContent = `${cor} Semáforo ${i + 1} → ${s.estado.toUpperCase()}`;
        listaSemaforos.appendChild(item);
    });
};

// Mostrar/Ocultar semáforos
document.getElementById('toggleSemaforos').addEventListener('click', () => {
    mostrarSemaforos = !mostrarSemaforos;

    if (mostrarSemaforos) {
        semaforosMarkers = semaforos.map(s => {
            const marker = L.marker(s.coords, { icon: criarIconeSemaforo(s.estado) })
                .addTo(map)
                .bindPopup(`<strong>Semáforo</strong><br>Status: ${s.estado}`);
            return marker;
        });
        document.getElementById('toggleSemaforos').innerText = "Ocultar Semáforos";
        painel.style.display = "block";
    } else {
        semaforosMarkers.forEach(m => map.removeLayer(m));
        document.getElementById('toggleSemaforos').innerText = "Mostrar Semáforos";
        painel.style.display = "none";
    }
});

// Função para geocodificar endereços
const geocode = async (query) => {
    const url = `https://nominatim.openstreetmap.org/search?format=json&q=${query}`;
    const res = await fetch(url);
    const data = await res.json();
    return data.length > 0 ? [data[0].lat, data[0].lon] : null;
};

// Recalcula rota evitando semáforos vermelhos
const recalcularRota = () => {
    if (!rota) return;

    const start = rota.getWaypoints()[0].latLng;
    const end = rota.getWaypoints()[1].latLng;

    if (rota) map.removeControl(rota);

    rota = L.Routing.control({
        waypoints: [start, end],
        routeWhileDragging: false,
        lineOptions: { styles: [{ color: '#007bff', weight: 5 }] }
    }).addTo(map);
};

// Traçar rota principal
document.getElementById('routeBtn').addEventListener('click', async () => {
    const start = document.getElementById('start').value.trim();
    const end = document.getElementById('end').value.trim();

    if (!start || !end) {
        alert("Digite o ponto de partida e o destino!");
        return;
    }

    const startCoords = await geocode(start);
    const endCoords = await geocode(end);

    if (!startCoords || !endCoords) {
        alert("Não foi possível encontrar os locais informados!");
        return;
    }

    if (rota) map.removeControl(rota);

    rota = L.Routing.control({
        waypoints: [
            L.latLng(startCoords[0], startCoords[1]),
            L.latLng(endCoords[0], endCoords[1])
        ],
        routeWhileDragging: false,
        lineOptions: { styles: [{ color: '#007bff', weight: 5 }] }
    }).addTo(map);

    rota.on('routesfound', (e) => {
        const waypoints = e.routes[0].coordinates.map(coord => ({
            latLng: L.latLng(coord.lat, coord.lng)
        }));

        gerarSemaforos(waypoints);
        document.getElementById('toggleSemaforos').disabled = false;
    });
});
