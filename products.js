let urlProduct = window.location.search.substr(4);
let productsElt = document.getElementById("products");
fetch("http://localhost:3000/api/teddies/" + urlProduct)
  .then(
    function(response) {
      if (response.status !== 200) {
        console.log('Oops, something went wrong ' +
          response.status); 
        return;
      }
      response.json().then(function(data) {
        let articleElt = document.createElement("article");
        let imageElt = document.createElement("img");
        imageElt.src = data.imageUrl;
        let pLabel = document.createElement("p");
        let label = document.createElement("label");
        label.textContent = "Color : ";
        label.setAttribute("for", "color");
        let select = document.createElement("select");
        select.setAttribute("name", "color");
        select.setAttribute("id", "color");
        console.log (data);
        const colors = data.colors;
        colors.forEach(function (color) {
            let option = document.createElement("option");
            option.value = color;
            option.textContent = color;
            select.appendChild(option);
        });
        pLabel.appendChild(label);
        pLabel.appendChild(select);
        let nameElt = document.createElement("h2");
        nameElt.textContent = data.name;
        let priceElt = document.createElement("p");
        priceElt.textContent = data.price/100 + " $";
        let buttonAdd = document.createElement("a");
        buttonAdd.setAttribute("id", "btnAddToCart");
        buttonAdd.textContent = "Add to Cart";
        articleElt.appendChild(imageElt);
        articleElt.appendChild(pLabel);
        articleElt.appendChild(nameElt);
        articleElt.appendChild(priceElt);
        articleElt.appendChild(buttonAdd);
        productsElt.appendChild(articleElt);
        buttonAdd.addEventListener("click", (event) => {
          event.preventDefault();
          let selectedColor = document.getElementById("color");

          const infosTeddy = {
            "id": data._id,
            "imageUrl": data.imageUrl,
            "name": data.name,
            "price": data.price/100,
            "colors": selectedColor.options[selectedColor.selectedIndex].text
          };

          const cart = JSON.parse(localStorage.getItem('Carts')) || [];
          cart.push(infosTeddy);
          localStorage.setItem('Carts', JSON.stringify(cart));
          window.open("index.html", "_self");
        });
      });
    }
  )
  .catch(function(err) {
    console.log('Fetch Error :-S', err);
  });