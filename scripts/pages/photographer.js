//Mettre le code JavaScript lié à la page photographer.html

async function getPhotographersData() {
    const response = await fetch("../../data/photographers.json")
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
    img.alt = `${photographer.name}`;

    const contact = document.querySelector( '.contact' );
    contact.textContent += `${photographer.name}`

}

function displayLightbox(mediaList, index) {
    document.querySelector("body").style.overflow = "hidden";

    const mediaContainer = document.querySelector( '.media-container' );
    
    let lightboxContainer = document.querySelector( '.lightbox-container' );
    lightboxContainer.style.display = "block";
    
    let lastFocusableElement = document.querySelector( '.right' );
    let firstFocusableElement = document.querySelector( '.close' );
    firstFocusableElement.focus();
    
    firstFocusableElement.addEventListener("click", function() {
        select = document.querySelector( '#sort' ).tabIndex = 0;
        contact = document.querySelector( '.contact_button' ).tabIndex = 0;
        document.querySelector("body").style.overflow = "scroll";
        lightboxContainer.style.display = "none";
        mediaContainer.innerHTML = "";
    })

    lightboxContainer.addEventListener('keydown', function (event) {
        if (event.key === 'Tab' || event.keyCode === 9) {
      
          if (event.shiftKey) {
            if (document.activeElement === firstFocusableElement) {
              event.preventDefault();
              lastFocusableElement.focus();
            }
          } else {
            if (document.activeElement === lastFocusableElement) {
              event.preventDefault();
              firstFocusableElement.focus();
            }
          }
        }
    });

    document.addEventListener("keydown", function(event){
        if (event.keyCode === 27) {
            select = document.querySelector( '#sort' ).tabIndex = 0;
            contact = document.querySelector( '.contact_button' ).tabIndex = 0;
            lightboxContainer.style.display = "none";
            mediaContainer.innerHTML = "";
    }})

    if (index >= 0 && index < mediaList.length && mediaList[index].video) {
        path = `../assets/photographers/${photographerFirstName}/${mediaList[index].video}`

        const video = document.createElement( 'video' );
        video.setAttribute("src", path);
        video.setAttribute("autoplay", true);
        mediaContainer.append(video);
    
        const title = document.createElement( 'p' );
        title.setAttribute("class", "title");
        title.textContent = `${mediaList[index].title}`;
        mediaContainer.append(title);
     } else if (index >= 0 && index < mediaList.length && mediaList[index].image) {
        path = `../assets/photographers/${photographerFirstName}/${mediaList[index].image}`
    
        const img = document.createElement( 'img' );
        img.setAttribute("src", path);
        mediaContainer.append(img);
    
        const title = document.createElement( 'p' );
        title.setAttribute("class", "title");
        title.textContent = `${mediaList[index].title}`;
        mediaContainer.append(title);
    } else {
        lightboxContainer.style.display = "none";
        mediaContainer.innerHTML = "";
    }

    navigation(mediaList, index);

}

function updateLightbox(mediaList, index) {

    const mediaContainer = document.querySelector( '.media-container' );
    mediaContainer.innerHTML = "";

    if (index >= 0 && index < mediaList.length && mediaList[index].video) {
        path = `../assets/photographers/${photographerFirstName}/${mediaList[index].video}`

        const video = document.createElement( 'video' );
        video.setAttribute("src", path);
        video.setAttribute("autoplay", true);
        mediaContainer.append(video);
    
        const title = document.createElement( 'p' );
        title.setAttribute("class", "title");
        title.textContent = `${mediaList[index].title}`;
        mediaContainer.append(title);

    } else if (index >= 0 && index < mediaList.length && mediaList[index].image) {
        path = `../assets/photographers/${photographerFirstName}/${mediaList[index].image}`

        const img = document.createElement( 'img' );
        img.setAttribute("src", path);
        mediaContainer.append(img);
    
        const title = document.createElement( 'p' );
        title.setAttribute("class", "title");
        title.textContent = `${mediaList[index].title}`;
        mediaContainer.append(title);

    } else {
        lightboxContainer.style.display = "none";
        mediaContainer.innerHTML = "";
    }
}

function navigation(mediaList, index){
    
    document.addEventListener("keydown", function(event){
        if (event.keyCode === 37) {
            index-=1
            updateLightbox(mediaList, index)
        } else if (event.keyCode === 39) {
            index+=1
            updateLightbox(mediaList, index)
        }
    })
    
    document.querySelector(".left").addEventListener("click", function() {
        index-=1
        updateLightbox(mediaList, index)
    })
    document.querySelector(".right").addEventListener("click", function() {
        index+=1
        updateLightbox(mediaList, index)
    })
}

function displayPhotographerMedia(mediaList, photographerFullName) {
    photographerFirstName = photographerFullName.split(" ")[0].replace("-", " ");
    
    mediaList.forEach((media, index) => {

        const mediaSection = document.querySelector("#media");
        
        const article = document.createElement( 'article' );
        
        mediaSection.append(article);

        if (media.video) {
            path = `../assets/photographers/${photographerFirstName}/${media.video}`
            const video = document.createElement( 'video' );
            video.tabIndex = 0;
            video.setAttribute("src", path);
            video.addEventListener("click", () => {
                displayLightbox(mediaList, index)
            })
            article.append(video);
        }
        if (media.image) {
            path = `../assets/photographers/${photographerFirstName}/${media.image}`
            const img = document.createElement( 'img' );
            img.tabIndex = 0;
            img.setAttribute("src", path);
            img.addEventListener("click", () => {
                displayLightbox(mediaList, index)
            })
            article.append(img);
        } 
        
        const text = document.createElement( 'div' );
        text.setAttribute("class", "text");
        article.append(text);
        
        const title = document.createElement( 'p' );
        title.setAttribute("class", "title");
        title.textContent = `${media.title}`;
        text.append(title);
        
        const like = document.createElement( 'div' );
        like.setAttribute("class", "like");
        like.tabIndex = 0;
        text.append(like);
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
        like.append(heart);
        
        const likes = document.createElement( 'p' );
        likes.textContent = `${media.likes}`;
        likes.ariaLabel = "likes";
        like.append(likes);
        
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

    likes.append(heart);
    infos.append(likes);
    infos.append(dailyprice);
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
