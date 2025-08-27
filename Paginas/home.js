// Inicializa o mapa
const map = L.map("map").setView([-27.6403, -48.6705], 15);

// Adiciona o mapa base (OpenStreetMap)
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: "© OpenStreetMap",
}).addTo(map);

// Dados iniciais dos semáforos
const semaforos = [
    { id: 1, lat: -27.6403, lng: -48.6705, estado: "verde" },
    { id: 2, lat: -27.6420, lng: -48.6720, estado: "vermelho" },
    { id: 3, lat: -27.6385, lng: -48.6685, estado: "verde" },
];

// Função para definir a cor do marcador
function getCor(estado) {
    return estado === "verde" ? "green" : "red";
}

// Criar marcadores para os semáforos
const marcadores = {};
semaforos.forEach((s) => {
    const marcador = L.circleMarker([s.lat, s.lng], {
        radius: 10,
        color: getCor(s.estado),
        fillColor: getCor(s.estado),
        fillOpacity: 0.8,
    }).addTo(map);
    marcador.bindPopup(`<b>Semáforo ${s.id}</b><br>Estado: ${s.estado}`);
    marcadores[s.id] = marcador;
});

// Botão para atualizar estados dos semáforos
document.getElementById("atualizar").addEventListener("click", () => {
    semaforos.forEach((s) => {
        // Alterna estado
        s.estado = s.estado === "verde" ? "vermelho" : "verde";
        marcadores[s.id].setStyle({
            color: getCor(s.estado),
            fillColor: getCor(s.estado),
        });
        marcadores[s.id].bindPopup(`<b>Semáforo ${s.id}</b><br>Estado: ${s.estado}`);
    });
});
