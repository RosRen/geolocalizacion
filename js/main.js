window.onload = () => {
  const statusMessage = document.getElementById('statusMessage');
  const informacion = document.getElementById('informacion');
  const btnUbicacion = document.getElementById('btnUbicacion');
  const inputIp = document.getElementById('ip');
  const urlApi = 'https://iplocate.io/api/lookup/';
  const apiKey = '8586359a662d9ba99c7b709f02fbe932';

 btnUbicacion.addEventListener('click', () => {
    statusMessage.textContent = 'Cargando...';
    informacion.innerHTML = '';

    const ipIngresada = inputIp.value.trim();

    const urlConsulta = `${urlApi}${ipIngresada}?apikey=${apiKey}`;

    fetch(urlConsulta)
      .then(response => {
        if (!response.ok) {
          throw new Error('Error en la respuesta de la API');
        }
        return response.json();
      })
      .then(data => {
        const {
          ip,
          country,
          city,
          continent,
          time_zone,
          currency_code,
          calling_code,
          latitude,
          longitude
        } = data;

        informacion.innerHTML = `
          <ul>
            <li><strong>IP:</strong> ${ip}</li>
            <li><strong>País:</strong> ${country}</li>
            <li><strong>Ciudad:</strong> ${city}</li>
            <li><strong>Continente:</strong> ${continent}</li>
            <li><strong>Zona horaria:</strong> ${time_zone}</li>
            <li><strong>Código de moneda:</strong> ${currency_code}</li>
            <li><strong>Código de llamada:</strong> +${calling_code}</li>
            <li><strong>Latitud:</strong> ${latitude}</li>
            <li><strong>Longitud:</strong> ${longitude}</li>
          </ul>
        `;

        statusMessage.textContent = 'Ubicación obtenida con éxito.';
      })
      .catch(error => {
        statusMessage.textContent = `Error al obtener la ubicación: ${error.message}`;
      });
  });
};