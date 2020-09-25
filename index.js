fetch("http://localhost:3000/api/teddies")
  .then(
    function(response) {
      if (response.status !== 200) {
        console.log('Looks like there was a problem. Status Code: ' +
          response.status);
        return;
      }
      response.json().then(function(data) {
        data.forEach(function (teddy) {
            let teddiesElt = document.getElementById("articles");
            let articlesElt = document.createElement("article"); 
            let nameElt = document.createElement("h2");
            nameElt.textContent = teddy.name;
            let imageElt = document.createElement("img");
            imageElt.src = teddy.imageUrl;
            let priceElt = document.createElement("p");
            priceElt.textContent = teddy.price/100 + " $";
            let seeArticleElt = document.createElement("a");
            seeArticleElt.textContent = "See the article";
            seeArticleElt.setAttribute("class", "btnProduct");
            seeArticleElt.setAttribute("data-id", teddy._id);
            seeArticleElt.setAttribute("href", "product.html?id=" + teddy._id);
            articlesElt.appendChild(imageElt);
            articlesElt.appendChild(nameElt);
            articlesElt.appendChild(priceElt);
            articlesElt.appendChild(seeArticleElt);
            teddiesElt.appendChild(articlesElt);
            });
        });
      })
  .catch(function(err) {
    console.log('Fetch Error :-S', err);
  });