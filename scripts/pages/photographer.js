//Mettre le code JavaScript lié à la page photographer.html

const queryString = window.location.search;

const urlParams = new URLSearchParams(queryString);

const urlId = urlParams.get('id')

async function getPhotographers() {
    const response = await fetch("../data/photographers.json")
    return await response.json()
}

async function displayData(data) {

    data.forEach(data => {

        if(data.id == urlId) {
            const name = document.querySelector( 'h1' );
            name.textContent = data.name;
            
            const location = document.querySelector( '.location' );
            location.textContent = `${data.city}, ${data.country}`;
            
            const description = document.querySelector( '.description' );
            description.textContent = data.tagline;
            
            const img = document.querySelector( '.profile-pic' );
            img.setAttribute("src", `../assets/photographers/Photographers ID Photos/${data.portrait}`);
        }

        if(data.photographerId == urlId) {
            const mediaSection = document.querySelector(".media");
            
            const article = document.createElement( 'article' );

            const text = document.createElement( 'div' );
            text.setAttribute("class", "text");

            const like = document.createElement( 'div' );
            like.setAttribute("class", "like");

            const img = document.createElement( 'img' );
            img.setAttribute("src", "../assets/photographers/Mimi/Animals_Rainbow.jpg");

            const title = document.createElement( 'p' );
            title.setAttribute("class", "title");
            title.textContent = `${data.title}`;

            const likes = document.createElement( 'p' );
            likes.textContent = `${data.likes}`;

            const heart = document.createElement( 'i' );
            heart.setAttribute("class", "fa-solid fa-heart");

            mediaSection.appendChild(article);
            article.appendChild(img);
            article.appendChild(text);
            text.appendChild(title);
            text.appendChild(like);
            like.appendChild(likes);
            like.appendChild(heart);
        }
    });
}




async function init() {
    // Récupère les datas des photographes
    const { photographers } = await getPhotographers();
    displayData(photographers);
    
    const { media } = await getPhotographers();
    displayData(media);
};


init();
