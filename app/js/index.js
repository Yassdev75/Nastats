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


async function getApi() {
    let apiKey = "f5oRMiVGZ9rWbjcjmxWkOFanJ0bTORX63pEubMrJ";
    let response = await fetch(`https://api.nasa.gov/planetary/apod?api_key=${apiKey}`);
    let data = await response.json();
    useApi(data);
}

function useApi(data) {
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
             <th>Type du contenu</th>
               <td>${media}</td>
             </tr>
             <tr>
                 <th>Date</th>
                 <td>${date}</td>
             </tr>
         </tbody>
     </table>`
};

async function getApiMars() {
    let apiKey = "f5oRMiVGZ9rWbjcjmxWkOFanJ0bTORX63pEubMrJ";
    let response = await fetch(`https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=1000&api_key=${apiKey}`);
    console.log(response);
    let data = await response.json();
    console.log(data);
    useApi(data);
}