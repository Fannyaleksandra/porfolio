document.addEventListener("DOMContentLoaded", () => {
    const availableDatesSection = document.getElementById("available-dates");

    fetch("https://raw.githubusercontent.com/Fannyaleksandra/porfolio/main/available-dates.json")
      .then(response => {
        if (!response.ok) {
          throw new Error("JSON file could not be loaded");
        }
        return response.json();
      })
      .then(data => {
        if (data.availableDates && Array.isArray(data.availableDates)) {
          availableDatesSection.innerHTML = `
            <h1>Vapaat ajat</h1>
            <div class="available-dates">
              ${data.availableDates.map(dateObj => `
                <div class="date-item">
                  <h4 class="date">${formatDate(dateObj.date)}</h4>
                  <ul class="times">
                    ${dateObj.times.map(time => `<li class="time">${time}</li>`).join('')}
                  </ul>
                </div>
              `).join('')}
            </div>
          `;
        } else {
          console.error("JSON ei sisällä oikeaa 'availableDates' kenttää");
        }
      })
      .catch(error => console.error("Error loading JSON:", error));
});

// Funktio päivämäärän muotoiluun
function formatDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const date = new Date(dateString);
    return date.toLocaleDateString('fi-FI', options);
}



  
  
   