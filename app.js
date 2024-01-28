

const URI = "https://api.unsplash.com";
const ENDPOINT = "/search/photos";
const ACCESS_KEY = "-734BMqDJU5HYW9Mdx3RiYDJv51pGFnYdXTVvolIbrM";
let page = 1;
let keyword = "";
let itemsPerPage = 8;

const carousel = document.querySelector(`#gallery`);
const lefttBtn = document.querySelector(`#btn-left`)
const rightBtn = document.querySelector(`#btn-right`)
const searchForm = document.querySelector(`#form`)

//////////////////////////////////////////////////////////////////////////////////////////////////////////

searchForm.addEventListener(`submit`, e => search(e))
lefttBtn.addEventListener(`click`, e => search(e, page--))
rightBtn.addEventListener(`click`, e => search(e, page++))

////////////////////////////////////////////////////////////////////////////////////////\

async function search(e) {
    e.preventDefault();
    keyword = document.querySelector('#info').value;
    const url = `${URI}${ENDPOINT}?page=${page}&query=${keyword}&client_id=${ACCESS_KEY}&per_page=${itemsPerPage}`;

    try {
        const response = await fetch(url)
        if (!response.ok) return;

        const data = await response.json()
        showResults(data.results);
    } catch (error) {
        console.log(error);
    }
}

////////////////////////////////////////////////////////////////////////////////////////\

function showResults(results) {
    carousel.innerHTML = ""; // Clean up previous results

    results.forEach(result => {
        const objUrls = result.urls;

        const imagen = document.createElement(`img`);
        imagen.src = objUrls.thumb;
        carousel.appendChild(imagen)

        imagen.addEventListener("click", e => backgroundIMG(objUrls.regular))

    });
}

function backgroundIMG(url) {
    document.body.style.backgroundImage = `url("${url}")`;
}
