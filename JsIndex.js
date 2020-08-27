getProductInfo = function(){

    let xhr = new XMLHttpRequest();
    
    let url = 'http://localhost:3000/api/cameras/' + getProductID();
    
    xhr.open('GET', url);
    
    xhr.onload = function(){
    
    if(this.status == 200) {
    
    let camera = JSON.parse(this.response);
    
    let container = document.createElement('div');
    
    let title = document.createElement('h1');
    
    let productImage = document.createElement('img');
    
    let productDescription = document.createElement('p');
    
    let productPrice = document.createElement('p');
    
    let label = document.createElement('label');
    
    let dropDownMenu = document.createElement('select');
    
    let addToCart = document.createElement('a');
    
    let back = document.createElement('a');
    
    title.textContent = `${camera.name}`;
    
    productImage.src = `${camera.imageUrl}`;
    
    productDescription.textContent = `${camera.description}`;
    
    productPrice.textContent = `$${camera.price/100}.00`;
    
    container.appendChild(title);
    
    container.appendChild(productImage);
    
    container.appendChild(productDescription);
    
    container.appendChild(productPrice)
    
    document.getElementById('cameraDisplay').appendChild(container);
    
    document.getElementById('cameraDisplay').classList.add('text-center');
    
    }
    
    if(this.status == 404) {
    
    document.getElementById('cameraDisplay').innerHTML = '404 : Document not found!'
    
    }
    
    }
    
    xhr.send();
    
    }
    
    getProductInfo();