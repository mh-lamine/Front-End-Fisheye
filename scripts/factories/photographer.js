function photographerFactory(data) {
    const { id, name, portrait, city, country, tagline, price } = data;

    const picture = `assets/photographers/Photographers ID Photos/${portrait}`;

    function getUserCardDOM() {
        const link = document.createElement( 'a' );
        link.setAttribute("href", `photographer.html?id=${id}`);
        link.setAttribute("class", "link");

        const article = document.createElement( 'article' );

        const img = document.createElement( 'img' );
        img.setAttribute("src", picture)
        img.setAttribute("alt", name);

        const h2 = document.createElement( 'h2' );
        h2.textContent = name;

        const location = document.createElement( 'p' );
        location.setAttribute("class", "location");
        location.textContent = `${city}, ${country}`;

        const description = document.createElement( 'p' );
        description.setAttribute("class", "description");
        description.textContent = `${tagline}`;

        const pricing = document.createElement( 'p' );
        pricing.setAttribute("class", "pricing");
        pricing.textContent = `${price}€/jour`;

        link.appendChild(article);
        article.appendChild(img);
        article.appendChild(h2);
        article.appendChild(location);
        article.appendChild(description);
        article.appendChild(pricing);

        return (link);
    }
    return { name, picture, getUserCardDOM }
}