
const arrayLocalStorage = JSON.parse (localStorage.getItem ("order"));


let OrderConf section = document.getElementById ("orderConf");

let articlesElt = document.createElement ("article");
let forValid = document.createElement ("h2");
forValide.textContent = "Order validated!";
let forPrice = document.createElement ("p");
forPrice.textContent = "Thank you for ordering" + arrayLocalStorage.PriceTotal + "$ of handmade teddy bears.";
let forId = document.createElement ("p");
forId.textContent = "Your order has been registered and bears the identification number:";
let forId2 = document.createElement ("p");
forId2.textContent = arrayLocalStorage.orderId;
forId2.style.fontWeight = "bold";
let forThanks = document.createElement ("p");
forThanks.textContent = "Please use this number in all your queries regarding this order.";
let btnBackToIndex = document.createElement ("a");
btnBackToIndex.textContent = "Back to home";
btnBackToIndex.href = "index.html";
articlesElt.appendChild (forValid);
articlesElt.appendChild (forPrice);
articlesElt.appendChild (forId);
articlesElt.appendChild (forId2);
articlesElt.appendChild (forThanks);
articlesElt.appendChild (btnBackToIndex);
sectionConfOrder.appendChild (articlesElt);

btnBackToIndex.addEventListener ("click", () => {
    localStorage.clear ();
});