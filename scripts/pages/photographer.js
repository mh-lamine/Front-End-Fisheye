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

function displayPhotographerMedia(mediaList, photographerFullName) {
    photographerFirstName = photographerFullName.split(" ")[0].replace("-", " ");
    
    mediaList.forEach(media => {
        
        const mediaSection = document.querySelector("#media");
        
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
        let first = true;
        like.addEventListener("click", function(){
            if (first) {
                media.likes += 1;
                likes.textContent = parseInt(media.likes);
                first = false
                likesCount(mediaList)
            } else {
                media.likes -= 1;
                likes.textContent = parseInt(media.likes);
                first = true
                likesCount(mediaList)
            }
        });

        const heart = document.createElement( 'i' );
        heart.setAttribute("class", "fa-solid fa-heart");
        like.appendChild(heart);
        
        const likes = document.createElement( 'p' );
        likes.textContent = `${media.likes}`;
        like.appendChild(likes);
        
    });
}



function likesCount(mediaList) {
    let totalLikes = 0; 
    mediaList.forEach(media => {
        totalLikes += parseInt(media.likes);
        price = media.price;
    })

    const infos = document.querySelector( '.infos' );

    const likes = document.createElement( 'span' );
    likes.textContent = `${totalLikes} `

    const heart = document.createElement( 'i' );
    heart.setAttribute("class", "fa-solid fa-heart");

    const dailyprice = document.createElement( 'span' );
    dailyprice.textContent = `${price}€/jour`;

    infos.textContent = "";

    likes.appendChild(heart);
    infos.appendChild(likes);
    infos.appendChild(dailyprice);
}

function byPop(a, b) {
    return parseInt(b.likes) - parseInt(a.likes);
}

function byDate(a, b) {
    return new Date(b.date).valueOf() - new Date(a.date).valueOf();
}

function byTitle(a, b) {
    if (a.title > b.title) {
        return 1;
    } else if (b.title > a.title) {
        return -1;
    } else { return 0; }
}

function mediaSorting(photographerMediaList, name) {
    document.getElementById("sort").addEventListener("change", (e) => {
        if (e.target.value == "popularity"){
            photographerMediaList.sort(byPop)
        } else if (e.target.value == "date") {
            photographerMediaList.sort(byDate)
        } else if (e.target.value == "title") {
            photographerMediaList.sort(byTitle)
        }
        document.querySelector("#media").innerHTML = ""
        displayPhotographerMedia(photographerMediaList, name);
    });
}

async function init() {

    const { photographers, media } = await getPhotographersData();
    
    const urlParams = new URLSearchParams(window.location.search);
    const photographerId = urlParams.get('id')
    
    const photographer = photographers.find(
        (p) => p.id == photographerId 
    );
        
    
    
    displayPhotographerInfo(photographer);
    
    const photographerMediaList = media.filter(
        media => media.photographerId == photographer.id
        );
        
    likesCount(photographerMediaList);

    const name = photographer.name;

    mediaSorting(photographerMediaList, name)

    photographerMediaList.sort(byPop)

    displayPhotographerMedia(photographerMediaList, name);

    
};


init();
