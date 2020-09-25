const arrayLocalStorage = JSON.parse(localStorage.getItem("Carts"));
if (arrayLocalStorage == null) {
    let blocPage = document.getElementById("bloc-basket");
    let infosPanel = document.createElement("p");
    infosPanel.textContent = "Basket is empty.";
    blocPage.appendChild(infosPanel);
} else {
    let teddiesElt = document.getElementById("basket");
    arrayLocalStorage.forEach(function(key) {
        let articlesElt = document.createElement("article");
        let imageDiv = document.createElement("div");
        let imageElt = document.createElement("img");
        imageElt.src = key.imageUrl;
        let infosDiv = document.createElement("div");
        let nameElt = document.createElement("h2");
        nameElt.textContent = key.name;
        let colorElt = document.createElement("p");
        colorElt.textContent = key.colors;
        colorElt.style.fontStyle = "italic";
        let numberOfArticles = document.createElement("p");
        let counterArticles = 1;
        let priceTotalElt = document.createElement("p");
        priceTotalElt.textContent = "Price : " + key.price*counterArticles + " $";
        let buttonsDiv = document.createElement("div");
        let buttonAdd = document.createElement("button");
        imageDiv.appendChild(imageElt);
        articlesElt.appendChild(imageDiv);
        infosDiv.appendChild(nameElt);
        infosDiv.appendChild(colorElt);
        infosDiv.appendChild(numberOfArticles);
        infosDiv.appendChild(priceTotalElt);
        articlesElt.appendChild(infosDiv);
        teddiesElt.appendChild(articlesElt);

        if (compteurArticles <= 1) {
            numberOfArticles.textContent = counterArticles + " article";
        } else {
            numberOfArticles.textContent = counterArticles + " articles";
        };
    });
}