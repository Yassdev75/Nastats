const hamburger = document.getElementById('hamburger');
const navUl = document.getElementById('navigation');

hamburger.addEventListener('click', () => {
    navUl.classList.toggle('show');
});

var child1 = document.getElementById('child1');

function lowOpacity() {
    var child = child1;
    child.classList.toggle("low-opacity");
    setTimeout(function() {
        child.classList.toggle("display-none");;
    }, 500);
};

// Recovering the image of the day with the api key of NASA

async function getApiImage() {
    let apiKey = "f5oRMiVGZ9rWbjcjmxWkOFanJ0bTORX63pEubMrJ";
    let response = await fetch(`https://api.nasa.gov/planetary/apod?api_key=${apiKey}`);
    let data = await response.json();
    useApiImage(data);
}

function useApiImage(data) {
    title = data.title;
    subtitle = data.copyright;
    corpus = data.explanation;
    media = data.media_type;
    date = data.date;
    imgSrc = data.url;
    document.querySelector("#img-api").innerHTML += `<img class="img-fluid" style="width:300px; height:300px;" src="${imgSrc}">`;
    document.querySelector("#table-api").innerHTML += `<h1>${title}</h1>
    <h6>${subtitle}</h6>
    <p class="w-75">${corpus}</p>
    <table class="w-75">
        <tbody>
            <tr>
             <th>Content type</th>
               <td>${media}</td>
             </tr>
             <tr>
                 <th>Date</th>
                 <td>${date}</td>
             </tr>
         </tbody>
     </table>`
};

// Recovering the asteroids near to earth with the api key of NASA

async function getApiAsteroid() {
    let d = new Date();
    let month = (d.getMonth()) + 1;
    let day = d.getDate();
    let year = d.getFullYear();
    var date = `${year}-${month}-${day}`;
    let apiKey = "f5oRMiVGZ9rWbjcjmxWkOFanJ0bTORX63pEubMrJ";
    let response = await fetch(`https://api.nasa.gov/neo/rest/v1/feed?start_date=${date}&end_date=${date}&api_key=${apiKey}`);
    let data = await response.json();
    // console.log(data);
    useApiAsteroid(data);
}

function useApiAsteroid({ element_count, near_earth_objects }) {
    document.querySelector("#numbers-object").innerHTML += `<span>${element_count}</span>`;
    Object.keys(near_earth_objects).map(date => {
        near_earth_objects[date].map(asteroid => {

            // const id = asteroid.id;
            const name = asteroid.name;
            const dangerous = asteroid.is_potentially_hazardous_asteroid;
            const magnitude = asteroid.absolute_magnitude_h;
            const min = asteroid.estimated_diameter.meters.estimated_diameter_min;
            const max = asteroid.estimated_diameter.meters.estimated_diameter_max;

            document.querySelector("#names-object").innerHTML += `<p class="content-object">${name}<br></p>`;
            document.querySelector("#dangerous-object").innerHTML += `<p class="content-object">${dangerous}<br></p>`;
            document.querySelector("#magnitude-object").innerHTML += `<p class="content-object">${magnitude}<br></p>`;
            document.querySelector("#minimum-object").innerHTML += `<p class="content-object">${min}<br></p>`;
            document.querySelector("#maximum-object").innerHTML += `<p class="content-object">${max}<br></p>`;
        })
    })
}