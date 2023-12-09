var bannerImages = ["https://imgur.com/96OnkX7.png", "https://imgur.com/KtGxwnN.png", "https://imgur.com/sfjg9R8.png", "https://imgur.com/p0wdadG.png"]

var owl = $('.owl-carousel');
owl.owlCarousel({
    items: 1,
    // items change number for slider display on desktop

    loop: true,
    margin: 10,
    autoplay: true,
    autoplayTimeout: 3000,
    autoplayHoverPause: true
});

//Header Section
document.getElementById("header").innerHTML += `
<div id="title-wrapper">
<div id="logo"><a href="Home Page.html" id="title"><span id="shop">SHOP</span>LANE</a></div>
<a href="#clothing-section">CLOTHING</a>
<a href="#accessory-section">ACCESSORIES</a>
</div>
<div id="search-wrapper">
<i class="fa-solid fa-magnifying-glass"></i>
<input id="searchBox" type="text" placeholder="Search for Clothing and Accessories" />
</div>
<div id="cart-signin-wrapper">
<div id="cart-wrapper">
    <p id="item-count">0</p>
    <a href="Cart Page.html"><i class="fa-solid fa-cart-shopping"></i></a>
</div>
<img src="https://test-hosting-8f9bf.web.app/assets/avatar.jpg" />
</div>`




// Home Page Data
$.get("https://5d76bf96515d1a0014085cf9.mockapi.io/product", function (response) {
    var productList = response

    var clothingSection = document.getElementById("clothing-section")
    clothingSection.innerHTML += `
    <h3 class="section-heading">Clothing for Men and Women</h3>
    <div id="clothing-grid" class="product-grid">
    </div>`
    var clothingGrid = document.getElementById("clothing-grid")

    var accessorySection = document.getElementById("accessory-section")
    accessorySection.innerHTML += `
    <h3 class="section-heading">Accessories for Men and Women</h3>
    <div id="accessory-grid" class="product-grid">
    </div>`
    var accessoryGrid = document.getElementById("accessory-grid")

    for (var i = 0; i < productList.length; i++) {
        if (productList[i].isAccessory == false) {
            clothingGrid.innerHTML += `
                 <div class="product-card" id=${i} onclick = "selectedProduct(parseInt(id)+1)">
                    <a href="Product Page.html?p=${productList[i].id}">
                        <img class="product-image" src=${productList[i].preview} alt=${productList[i].name} pic />
                    </a>
                    <div class="product-meta">
                        <h4>${productList[i].name}</h4>
                        <h5>${productList[i].brand}</h5>
                        <p>Rs ${productList[i].price}</p>
                    </div>
                </div>`
        } else {
            accessoryGrid.innerHTML += `
            <div class="product-card" id=${i} onclick = "selectedProduct(parseInt(id)+1)">
                    <a href="Product Page.html?p=${productList[i].id}">
                        <img class="product-image" src=${productList[i].preview} alt=${productList[i].name} pic />
                    </a>
                    <div class="product-meta">
                        <h4>${productList[i].name}</h4>
                        <h5>${productList[i].brand}</h5>
                        <p>Rs ${productList[i].price}</p>
                    </div>
                </div>`
        }
    }
})

//Product Page Data

function selectedProduct(id) {
    localStorage.setItem("id", id)
}

var count = JSON.parse(localStorage.getItem("cartCount"))
var cartCountElement = document.getElementById("item-count")
if (count == null) {
    cartCountElement.innerText = 0
} else {
    cartCountElement.innerText = count
}

// Search Functonality
var searchBox = document.getElementById("searchBox")
searchBox.onchange = function () {
    var val = searchBox.value
    $.get("https://5d76bf96515d1a0014085cf9.mockapi.io/product", function (response) {
        var productList = response
        var clothingSection = document.getElementById("clothing-section")
        clothingSection.innerHTML = `<div id="clothing-grid" class="product-grid">
            </div>`
        var accessorySection = document.getElementById("accessory-section")
        accessorySection.style.display = "none"
        var count = 0
        console.log(productList.length)
        var clothingGrid = document.getElementById("clothing-grid")
        for (var i = 0; i < productList.length; i++) {
            var name = productList[i].name
            var brand = productList[i].brand
            var description = productList[i].description
            if ((name.match(val) == null) && (brand.match(val) == null) && (description.match(val) == null)) {
                count+=1
                console.log(count)
                continue
            } else if ((name.match(val) != null) || (brand.match(val) != null) || (description.match(val) != null)) {
                clothingGrid.innerHTML += `
                 <div class="product-card" id=${i} onclick = "selectedProduct(parseInt(id)+1)">
                    <a href="Product Page.html?p=${productList[i].id}">
                        <img class="product-image" src=${productList[i].preview} alt=${productList[i].name} pic />
                    </a>
                    <div class="product-meta">
                        <h4>${productList[i].name}</h4>
                        <h5>${productList[i].brand}</h5>
                        <p>Rs ${productList[i].price}</p>
                    </div>
                </div>`
            }
        }
        if(count == productList.length){
            console.log(count)
            clothingGrid.innerHTML = `<h1 id = "Notfound"> Not Found ❌ </h1>`
        }
    })
    searchBox.value = ""
}

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