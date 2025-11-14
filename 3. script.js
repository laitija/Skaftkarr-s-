const LAT = 60.3923;  // Skaftkärr
const LON = 25.6653;

const url = `https://api.open-meteo.com/v1/forecast?latitude=${LAT}&longitude=${LON}&current=temperature_2m&hourly=temperature_2m&timezone=auto`;

async function loadWeather() {
  const res = await fetch(url);
  const data = await res.json();

  // Näytä nykyinen lämpötila
  document.getElementById("current").textContent =
    `Nyt: ${data.current.temperature_2m} °C`;

  // Piirrä lämpötilakäyrä
  const ctx = document.getElementById("tempChart").getContext("2d");
  new Chart(ctx, {
    type: "line",
    data: {
      labels: data.hourly.time.slice(0, 24).map(t => new Date(t).getHours() + ":00"),
      datasets: [{
        label: "Lämpötila (°C)",
        data: data.hourly.temperature_2m.slice(0, 24),
        borderColor: "#6dd6ff",
        backgroundColor: "rgba(109,214,255,0.3)",
        fill: true,
        tension: 0.3
      }]
    }
  });
}

loadWeather();
