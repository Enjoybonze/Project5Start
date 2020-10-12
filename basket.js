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
let infosArticles = document.getElementById("infosArticles");

        let priceTotalOrdered = 0;
        for (let i = 0; i<arrayLocalStorage.length; i++) {
            priceTotalOrdered += arrayLocalStorage[i].price;
        };
        let priceOrderedPanel = document.createElement("p");
        priceOrderedPanel.textContent ="Total Order : " + priceTotalOrdered + " $";
        priceOrderedPanel.setAttribute("id", "priceTotalOrdered");
        infosArticles.appendChild(priceOrderedPanel);
        let buttonDeleteCart = document.createElement("a");
        buttonDeleteCart.textContent = "Clear the basket";
        buttonDeleteCart.setAttribute("id", "buttonDeleteCart");
        infosArticles.appendChild(buttonDeleteCart);
        buttonDeleteCart.addEventListener("click", () => {
            event.preventDefault();
            localStorage.clear();
            location.reload();
        });
        let OrderedPanel = document.getElementById("Ordered");
        OrderedPanel.style.visibility = "visible";
        let submitButton = document.getElementById("submit");
        submitButton.addEventListener("click", () => {

            event.preventDefault();
            let firstName = document.getElementById('firstName');
            let lastName = document.getElementById('lastName');
            let address = document.getElementById('address');
            let city = document.getElementById('city');
            let email = document.getElementById('email');
            let regexText = /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/u;
            let regexLocation = /^[a-zA-Z0-9àáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/u;
            let regexEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

            let isValid = true;
            if (!regexText.test(firstName.value)) {
                Swal.fire({
                    icon: 'error',
                    title: '',
                    text: "error",
                }) 
                isValid = false;
            } 
            else if (!regexText.test(lastName.value)) {
                Swal.fire({
                    icon: 'error',
                    title: '',
                    text: "error",
                })
                isValid = false;
            } 
            else if (!regexLocation.test(address.value)) {
                Swal.fire({
                    icon: 'error',
                    title: '',
                    text: "error.",
                })
                isValid = false;
            } 
            else if (!regexLocation.test(city.value)) {
                Swal.fire({
                    icon: 'error',
                    title: '',
                    text: "error",
                })
                isValid = false;
            } 
            else if (!regexEmail.test(email.value)) {
                Swal.fire({
                    icon: 'error',
                    title: '',
                    text: "error",
                })
                isValid = false;
                console.log(isValid);
            } else if (isValid) {
                const products = [];
                for (let i = 0; i<arrayLocalStorage.length; i++) {
                    let product = arrayLocalStorage[i].id;
                    products.push(product);
                };
                const contact = {
                    "firstName": firstName.value,
                    "lastName": lastName.value,
                    "address": address.value,
                    "city": city.value,
                    "email": email.value
                  };
                fetch("http://localhost:3000/api/teddies/order", {
                      method: 'POST',
                      headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                      },
                      body: JSON.stringify({contact, products})
                    })
                    .then(
                        function(response) {
                            if (response.status >= 200 || response.status <= 299) {
                            response.json().then(function(data) {
                            const orderInfos = {
                                "orderId" : data.orderId,
                                "priceTotal" : priceTotalOrdered
                            };
                            localStorage.setItem("order", JSON.stringify(orderInfos));
                            window.open("confOrdered.html", "_self");
                            });
                            }
                    
                            console.log('Looks like there was a problem. Status Code: ' + response.status);
                            return;
                            }
                    )
                    .catch(function(err) {
                        console.log('Fetch Error :-S', err);
                    });
            } else {
                Swal.fire({
                    icon: 'error',
                    title: '',
                    text: "Error",
                })
            };
        });
};