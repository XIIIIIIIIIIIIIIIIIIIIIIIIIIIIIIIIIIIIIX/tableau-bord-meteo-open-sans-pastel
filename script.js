// OpenWeatherMap API KEY — Remplacer par votre propre clé !
    const API_KEY = '94d0a6e8badad4cc82d7adb11c635d1c'; // demo – à remplacer
    const DEFAULT_CITY = 'Paris,fr';
    // Utilitaire: Map code vers icône SVG
    function getWeatherSVG(code) {
      // icônes simplifiées, adaptables si besoins
      const icons = {
        '01d': `<svg viewBox="0 0 64 64" width="84" fill="none"><circle cx="32" cy="32" r="16" fill="#FDE68A"/><path d="M32 6v6M32 52v6M58 32h-6M12 32H6M48.97 15.03l-4.24 4.24M19.27 44.73l-4.24 4.24M15.03 15.03l4.24 4.24M44.73 44.73l4.24 4.24" stroke="#F9D72C" stroke-width="2" stroke-linecap="round"/></svg>`,
        '01n': `<svg viewBox="0 0 64 64" width="84" fill="none"><path d="M46 36a16 16 0 1 1-12-26c0 0-.12 0-.12 0A16 16 0 1 0 46 36z" fill="#A7C7E7"/><circle cx="40" cy="24" r="13" fill="#FDE68A" fill-opacity="0.6"/></svg>`,
        '02d': `<svg viewBox="0 0 64 64" width="84" fill="none"><circle cx="25" cy="25" r="11" fill="#FDE68A"/><ellipse cx="40" cy="40" rx="15" ry="13" fill="#DBEAFE"/></svg>`,
        '02n': `<svg viewBox="0 0 64 64" width="84" fill="none"><path d="M40 38a12 12 0 1 1-9-20c0 0-.09 0-.09 0A12 12 0 1 0 40 38z" fill="#A7C7E7"/><ellipse cx="45" cy="35" rx="14" ry="10" fill="#DBEAFE"/></svg>`,
        '03d': `<svg viewBox="0 0 64 64" width="84" fill="none"><ellipse cx="32" cy="38" rx="17" ry="13" fill="#DBEAFE"/></svg>`,
        '03n': `<svg viewBox="0 0 64 64" width="84" fill="none"><ellipse cx="34" cy="36" rx="16" ry="13" fill="#90CDF4"/></svg>`,
        '04d': `<svg viewBox="0 0 64 64" width="84" fill="none"><ellipse cx="32" cy="37" rx="18" ry="13" fill="#BAC7D5"/><ellipse cx="37" cy="31" rx="10" ry="7" fill="#DBEAFE"/></svg>`,
        '04n': `<svg viewBox="0 0 64 64" width="84" fill="none"><ellipse cx="34" cy="38" rx="16" ry="13" fill="#C7DBE7"/><ellipse cx="42" cy="32" rx="8" ry="6" fill="#B4BDCB"/></svg>`,
        '09d': `<svg viewBox="0 0 64 64" width="84" fill="none"><ellipse cx="34" cy="27" rx="14" ry="9" fill="#9CECFB"/><path d="M22 38v6M28 40v6M34 42v6M40 41v7M46 39v7" stroke="#56CCF2" stroke-width="2" stroke-linecap="round"/></svg>`,
        '09n': `<svg viewBox="0 0 64 64" width="84" fill="none"><ellipse cx="35" cy="31" rx="12" ry="8" fill="#67B7E7"/><path d="M25 38v5M31 40v6M38 41v7M44 38v7" stroke="#3896C1" stroke-width="2" stroke-linecap="round"/></svg>`,
        '10d': `<svg viewBox="0 0 64 64" width="84" fill="none"><circle cx="22" cy="22" r="10" fill="#FDE68A"/><ellipse cx="37" cy="38" rx="15" ry="11" fill="#DBEAFE"/><path d="M23 43v7M31 45v7M39 43v7" stroke="#56CCF2" stroke-width="2" stroke-linecap="round"/></svg>`,
        '10n': `<svg viewBox="0 0 64 64" width="84" fill="none"><ellipse cx="35" cy="34" rx="10" ry="8" fill="#C7DBE7"/><circle cx="45" cy="20" r="7" fill="#A7C7E7" fill-opacity="0.8"/><path d="M30 41v7M38 43v7M46 41v7" stroke="#3896C1" stroke-width="2" stroke-linecap="round"/></svg>`,
        '11d': `<svg viewBox="0 0 64 64" width="84" fill="none"><ellipse cx="32" cy="40" rx="15" ry="12" fill="#DBEAFE"/><path d="M26 48 32 56 38 48" stroke="#FBBF24" stroke-width="2" stroke-linecap="round"/></svg>`,
        '11n': `<svg viewBox="0 0 64 64" width="84" fill="none"><ellipse cx="33" cy="41" rx="12" ry="8" fill="#A7C7E7"/><path d="M25 47 32 54 39 47" stroke="#FBBF24" stroke-width="2" stroke-linecap="round"/></svg>`,
        '13d': `<svg viewBox="0 0 64 64" width="84" fill="none"><ellipse cx="32" cy="36" rx="15" ry="10" fill="#DBEAFE"/><path d="M24 43v5M32 44v6M40 43v5" stroke="#E0E7EF" stroke-width="2" stroke-linecap="round"/></svg>`,
        '13n': `<svg viewBox="0 0 64 64" width="84" fill="none"><ellipse cx="34" cy="40" rx="11" ry="8" fill="#C7DBE7"/><path d="M27 45v4M34 46v4M41 45v4" stroke="#E0E7EF" stroke-width="2" stroke-linecap="round"/></svg>`,
        '50d': `<svg viewBox="0 0 64 64" width="84" fill="none"><ellipse cx="32" cy="34" rx="14" ry="9" fill="#C7DBE7"/><ellipse cx="32" cy="42" rx="17" ry="5" fill="#E5E7EB"/></svg>`,
        '50n': `<svg viewBox="0 0 64 64" width="84" fill="none"><ellipse cx="32" cy="34" rx="14" ry="9" fill="#A7C7E7"/><ellipse cx="32" cy="44" rx="17" ry="6" fill="#B4BDCB"/></svg>`,
      };
      return icons[code] || icons['01d'];
    }
    function getSmallWeatherSVG(code) {
      // Version réduite
      return getWeatherSVG(code).replace(/width="84"/g, 'width="54"');
    }

    // Convertir unix timestamp en date
    function formatDayName(unix, locale = 'fr-FR') {
      const date = new Date(unix * 1000);
      return date.toLocaleDateString(locale, { weekday: 'short' }).replace('.', '');
    }
    // ----------- Affichage météo ----------- //
    function displayCurrentWeather(data) {
      const el = document.getElementById('weather-current');
      el.innerHTML = `
        <div class="weather-icon">${getWeatherSVG(data.weather[0].icon)}</div>
        <div class="weather-current-details">
          <span class="city-name">
            ${data.name}, ${data.sys.country}
          </span>
          <span class="current-temp">${Math.round(data.main.temp)}°C</span>
          <span class="current-desc">${data.weather[0].description}</span>
          <div class="weather-extras">
            <div>
              <span class="extra-label">Ressenti&nbsp;:</span>
              <span class="extra-value">${Math.round(data.main.feels_like)}°C</span>
            </div>
            <div>
              <span class="extra-label">Vent&nbsp;:</span>
              <span class="extra-value">${Math.round(data.wind.speed)} km/h</span>
            </div>
            <div>
              <span class="extra-label">Humidité&nbsp;:</span>
              <span class="extra-value">${data.main.humidity} %</span>
            </div>
          </div>
        </div>
      `;
    }

    function displayForecast(data) {
      // OpenWeather retourne sur 5 jours, dt toutes les 3 heures.
      // Pour la grille, on prend la prévision de 12:00 pour chaque jour.
      const noonForecasts = [];
      const today = (new Date()).getDate();
      for (let item of data.list) {
        const dt = new Date(item.dt * 1000);
        if (dt.getHours() === 12 && dt.getDate() !== today) {
          noonForecasts.push(item);
        }
        if (noonForecasts.length === 5) break;
      }
      // Sécurité: si 12:00 pas dispo, prends premier slot dispo chaque jour
      if (noonForecasts.length < 5) {
        const foundDates = new Set();
        for (let item of data.list) {
          const dt = new Date(item.dt * 1000);
          if (dt.getDate() !== today && !foundDates.has(dt.getDate())) {
            noonForecasts.push(item);
            foundDates.add(dt.getDate());
            if (noonForecasts.length === 5) break;
          }
        }
      }

      const grid = document.getElementById('forecast-grid');
      grid.innerHTML = '';
      noonForecasts.forEach((item, idx) => {
        const day = formatDayName(item.dt);
        grid.innerHTML += `
          <div class="forecast-card">
            <span class="forecast-day">${day.charAt(0).toUpperCase()+day.slice(1)}</span>
            <div class="forecast-icon">${getSmallWeatherSVG(item.weather[0].icon)}</div>
            <div class="forecast-temp">${Math.round(item.main.temp)}°C</div>
            <span class="forecast-desc">${item.weather[0].description}</span>
          </div>
        `;
      });
    }

    async function fetchWeatherData(city) {
      try {
        // Données météo actuelle
        const urlCurr = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&units=metric&lang=fr&appid=${API_KEY}`;
        // Prévisions 5 jours
        const urlForecast = `https://api.openweathermap.org/data/2.5/forecast?q=${encodeURIComponent(city)}&units=metric&lang=fr&appid=${API_KEY}`;
        const [curr, forecast] = await Promise.all([
          fetch(urlCurr).then(r=>r.json()),
          fetch(urlForecast).then(r=>r.json())
        ]);
        if(curr && curr.weather) displayCurrentWeather(curr);
        if(forecast && forecast.list) displayForecast(forecast);
      } catch(e) {
        alert("Erreur de chargement des données météo");
      }
    }

    // Lancer au chargement
    fetchWeatherData(DEFAULT_CITY);

    // Option UX: Permettre de changer la ville
    // (non demandé explicitement mais à ajouter ici pour démo :)
    let h1 = document.querySelector('h1');
    h1.title = "Cliquez pour changer de ville";
    h1.style.cursor = 'pointer';
    h1.addEventListener('click', ()=>{
      let ville = prompt("Ville, Code pays (ex: Paris,fr) :");
      if(ville) fetchWeatherData(ville);
    });