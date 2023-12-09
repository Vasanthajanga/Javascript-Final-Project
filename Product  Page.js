//Header Section
document.getElementById("header").innerHTML += `
<div id="title-wrapper">
<div id="logo"><a href="index.html" id="title"><span id="shop">SHOP</span>LANE</a></div>
<a href="">CLOTHING</a>
<a href="">ACCESSORIES</a>
</div>
<div id="search-wrapper">
<i class="fa-solid fa-magnifying-glass"></i>
<input type="text" placeholder="Search for Clothing and Accessories" />
</div>
<div id="cart-signin-wrapper">
<div id="cart-wrapper">
    <p id="item-count">0</p>
    <a href="Cart Page.html"><i class="fa-solid fa-cart-shopping"></i></a>
</div>
<img src="https://test-hosting-8f9bf.web.app/assets/avatar.jpg" />
</div>`


var productId = JSON.parse(localStorage.getItem("id"))
$.get("https://5d76bf96515d1a0014085cf9.mockapi.io/product/" + productId, function (response) {
    var productData = response
    var productWrapper = document.getElementById("product-wrapper")
    productWrapper.innerHTML += `
    <div id="product-image">
    <div id="image-wrapper">
        <img id="product-preview" src=${productData.preview} />
    </div>
</div>
<div id="product-details">
    <h1 id="product-title">${productData.name}</h1>
    <h1 id="product-brand">${productData.brand}</h1>
    <h4 class="section-heading">Price: Rs <p id="product-price"> ${productData.price}</p></h4>
    <h4 class="section-heading">Description</h4>
    <p id="description">${productData.description}</p>
    <h4 class="section-heading" >Product Preview</h4>
    <div id="product-images">
        
    </div>
    <button id="btn-add-to-cart" onclick="added()">Add to cart</button>
</div>`

    var smallImagesDiv = document.getElementById("product-images")
    for (let i = 0; i < productData.photos.length; i++) {
        if (i == 0) {
            smallImagesDiv.innerHTML += `
        <img id=card${i} onclick = "selectedProduct(${i})" class="active-image" src=${productData.photos[i]} />`
        } else {
            smallImagesDiv.innerHTML += `
        <img id=card${i} onclick = "selectedProduct(${i})" src=${productData.photos[i]} />`
        }
    }

})
function selectedProduct(id) {
    $(".active-image").removeClass("active-image")
    $("#card" + id).addClass("active-image")
    $.get("https://5d76bf96515d1a0014085cf9.mockapi.io/product/" + productId, function (response) {
        var productData1 = response
        var mainImageDiv = document.getElementById("image-wrapper")
        mainImageDiv.innerHTML = `
    <img id="product-preview" src=${productData1.photos[id]} />
    `
    })
}

var count = JSON.parse(localStorage.getItem("cartCount"))
var cartCountElement = document.getElementById("item-count")
if (count == null) {
    var countInitial = 0
    count = localStorage.setItem("cartCount", JSON.stringify(countInitial))
    cartCountElement.innerText = countInitial
}

function added() {
    $.get("https://5d76bf96515d1a0014085cf9.mockapi.io/product/" + productId, function (response) {
        var productData2 = response
        if (JSON.parse(localStorage.getItem("cartProducts")) == null) {
            var cartProduct = []
            cartProduct.push(productData2)
            localStorage.setItem("cartProducts", JSON.stringify(cartProduct))
        }
        else {
            var cartProducts = JSON.parse(localStorage.getItem("cartProducts"))
            cartProducts.push(productData2)
            localStorage.setItem("cartProducts", JSON.stringify(cartProducts))
        }
    })

    count = JSON.parse(localStorage.getItem("cartCount"))
    count += 1
    localStorage.setItem("cartCount", count)
    cartCountElement.innerText = JSON.parse(count)
}
cartCountElement.innerText = JSON.parse(count)


//Footer Section
var footer = document.getElementById("footer")
footer.innerHTML += `
<div>
<p class="footer-heading">Online store</p>
<a href="#clothing-section" class="footer-link">Men Clothing</a>
<a href="#clothing-section" class="footer-link">Womwn Clothing</a>
<a href="#accessory-section" class="footer-link">Men Accessories</a>
<a href="#accessory-section" class="footer-link">Women Accessories</a>
</div>
<div>
<p class="footer-heading">Helpful Links</p>
<a href="" class="footer-link">Home</a>
<a href="" class="footer-link">About</a>
<a href="" class="footer-link">Contact</a>
</div>
<div>
<p class="footer-heading">Partners</p>
<a href="" class="footer-link">Zara</a>
<a href="" class="footer-link">Pantaloons</a>
<a href="" class="footer-link">Levis</a>
<a href="" class="footer-link">UCB</a>
<a href="" class="footer-link">+ Many More</a>
</div>
<div>
<p class="footer-heading">Address</p>
<p href="" class="footer-link">Building 101</p>
<p href="" class="footer-link">Central Avenue</p>
<p href="" class="footer-link">LA - 902722</p>
<p href="" class="footer-link">United States</p>
</div>`