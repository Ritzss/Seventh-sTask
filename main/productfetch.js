
let body = document.body;
let img1 = document.createElement("img");
let h1 = document.createElement("h1");
let div1 = document.createElement("div");
let div2 = document.createElement("div");
let div3 = document.createElement("div");
let div4 = document.createElement("div");
let select = document.createElement("select");
let option1 = document.createElement("option");
let option2 = document.createElement("option");
let button = document.createElement("button");
let img2 = document.createElement("img");
let div5 = document.createElement("div");


// attributes
div1.id = "sortbar";
div2.id = "productCount";
div3.id = "sortContainer";
div4.id = "product-display";
div5.id = "hiding-container";
select.id = "sort-method";
img1.className = "background-image";
img1.src = "https://static.vecteezy.com/system/resources/previews/008/311/935/non_2x/the-illustration-graphic-consists-of-abstract-background-with-a-blue-gradient-dynamic-shapes-composition-eps10-perfect-for-presentation-background-website-landing-page-wallpaper-vector.jpg";
img1.alt = "Background Image";

// values
h1.innerHTML=`All Products`;
option1.value = "price_low_to_high";
option1.text = "Price: Low to High";
option2.value = "price_high_to_low";
option2.text = "Price: High to Low";

function displayProducts() {
    
//product fetching from api
let productData = {};
fetch("https://interveiw-mock-api.vercel.app/api/getProducts")
.then(response => response.json())
.then(data => {
    productData = data.data;
    div2.innerHTML = productData.length + " Products";

    productData.map((product)=>{
        let productCard = document.createElement("div");
        let productImage = document.createElement("img");
        let productName = document.createElement("h2");
        let productPrice = document.createElement("h3");
        let addcart = document.createElement("button");

        // setting attributes
        productCard.className = "product-card";

        productImage.src = product.product.images[0].src;
        productImage.alt = product.product.images[0].alt;
        productImage.className = "product-image";

        productName.innerHTML = product.product.title;
        productName.className = "product-name";

        productPrice.innerHTML = "Price: Rs" + product.product.variants[0].price;
        productPrice.className = "product-price";

        addcart.innerHTML = "Add to Cart";    
        addcart.className = "product-addcart";

        productCard.appendChild(productImage);
        productCard.appendChild(productName);
        productCard.appendChild(productPrice);
        productCard.appendChild(addcart);
        div4.appendChild(productCard);

    })
})
.catch(error => console.error('Error fetching products:', error));

}

select.onchange = function() {
    let selectedValue = select.value;
    let productCards = document.querySelectorAll(".product-card");
    let productsArray = Array.from(productCards);
    productsArray.sort((a, b) => {
        let priceA = parseFloat(a.querySelector(".product-price").innerText.replace("Price: Rs", ""));
        let priceB = parseFloat(b.querySelector(".product-price").innerText.replace("Price: Rs", ""));
        if (selectedValue === "price_low_to_high") {
            return priceA - priceB;
        } else {
            return priceB - priceA;
        }
    });
    // displaying the product in card format using map
    div2.innerHTML =" Products";
    div4.innerHTML = ""; // Clear previous products
    productsArray.forEach(card => {
        div4.appendChild(card);
    });
};

//onclick for button
button.innerHTML = "Fetch Products";
button.onclick = displayProducts;
button.className = "fetch-button";

button.addEventListener("click", ()=>{

setInterval(() => {

    button.innerHTML = "Loading Products....."; // Clears the product display area before fetching new products
clearInterval();
}, 500)


setTimeout(() => {
    div5.style.display = "none"; // Hides the div5 when button is clicked
}, 1000)

});

// setting attributes
img2.src = "../images/image.png";
img2.alt = "LOADING Image";
img2.className = "LOADING-image";

// appends
body.appendChild(img1);
body.appendChild(h1);
div1.appendChild(div2);
div1.appendChild(div3);
div3.appendChild(select);
select.appendChild(option1);
select.appendChild(option2);
body.appendChild(div1);
body.appendChild(div4);
div5.appendChild(img2);
div5.appendChild(button);
body.appendChild(div5);