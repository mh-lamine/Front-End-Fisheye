//Mettre le code JavaScript lié à la page photographer.html

async function getPhotographersData() {
    const response = await fetch("../data/photographers.json")
    return await response.json()
}

function displayPhotographerInfo(photographer) {
    const name = document.querySelector( 'h1' );
    name.textContent = photographer.name;
            
    const location = document.querySelector( '.location' );
    location.textContent = `${photographer.city}, ${photographer.country}`;
            
    const description = document.querySelector( '.description' );
    description.textContent = photographer.tagline;
            
    const img = document.querySelector( '.profile-pic' );
    img.setAttribute("src", `../assets/photographers/Photographers ID Photos/${photographer.portrait}`);
}

function displayPhotographerMediaList(mediaList, photographerFullName) {
    photographerFirstName = photographerFullName.split(" ")[0].replace("-", " ");
    
    mediaList.forEach(media => {
        
        const mediaSection = document.querySelector(".media");
        
        const article = document.createElement( 'article' );
        mediaSection.appendChild(article);

        if (media.video) {
            path = `../assets/photographers/${photographerFirstName}/${media.video}`
            const video = document.createElement( 'video' );
            video.setAttribute("src", path);
            article.appendChild(video);
        }
        if (media.image) {
            path = `../assets/photographers/${photographerFirstName}/${media.image}`
            const img = document.createElement( 'img' );
            img.setAttribute("src", path);
            article.appendChild(img);
        } 
        
        const text = document.createElement( 'div' );
        text.setAttribute("class", "text");
        article.appendChild(text);
        
        const title = document.createElement( 'p' );
        title.setAttribute("class", "title");
        title.textContent = `${media.title}`;
        text.appendChild(title);
        
        const like = document.createElement( 'div' );
        like.setAttribute("class", "like");
        text.appendChild(like);

        const heart = document.createElement( 'i' );
        heart.setAttribute("class", "fa-solid fa-heart");
        like.appendChild(heart);
        
        const likes = document.createElement( 'p' );
        likes.textContent = `${media.likes}`;
        like.appendChild(likes);
        
    });
}

async function init() {

    const { photographers, mediaList } = await getPhotographersData();

    const urlParams = new URLSearchParams(window.location.search);
    const photographerId = urlParams.get('id')

    const photographer = photographers.find(
        (p) => p.id == photographerId 
    );

    displayPhotographerInfo(photographer);


    const photographerMediaList = mediaList.filter(
        media => media.photographerId == photographer.id
    );

    const name = photographer.name;

    displayPhotographerMedia(photographerMediaList, name);
    
};


init();
