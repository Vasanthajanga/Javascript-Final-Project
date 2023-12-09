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
    <a href=""><i class="fa-solid fa-cart-shopping"></i></a>
</div>
<img src="https://test-hosting-8f9bf.web.app/assets/avatar.jpg" />
</div>`

var count = JSON.parse(localStorage.getItem("cartCount"))
var cartCountElement = document.getElementById("item-count")
if (count == null) {
    cartCountElement.innerText = 0
} else {
    cartCountElement.innerText = count
}

var cartItems = JSON.parse(localStorage.getItem("cartProducts"))
// var differentProducts = []
var similarProducts = []
var cartProductIds = []
var differentCartItems=[]
for (var i = 0; i < cartItems.length; i++) {
    cartProductIds.push(cartItems[i].id)
}


for(var k=0;k<cartProductIds.length;k++){
    var isInclude = false
    if(differentCartItems.includes(cartProductIds[k])){
        isInclude = true
    }
    if(!isInclude){
        differentCartItems.push(cartProductIds[k])
        
    }
}
console.log(cartProductIds)
console.log(differentCartItems)
var nummberOfSimlarProducts = []
for(var i=0;i<differentCartItems.length;i++){
    var count = 0
    // console.log(differentCartItems[i])
    for(var j=0;j<cartProductIds.length;j++){
        // console.log(cartProductIds[j])
        if(differentCartItems[i]==cartProductIds[j]){
            count+=1
        }
    }
    nummberOfSimlarProducts.push(count)
}
console.log(nummberOfSimlarProducts)


$("#differentcount").text(parseInt(differentCartItems.length))

var totalAmount = document.getElementById("total-amount")
var totalCost = 0
var cardListElement = document.getElementById("card-list")
var cartItems = JSON.parse(localStorage.getItem("cartProducts"))



for (var i = 0; i < differentCartItems.length; i++) {
    $.ajax({
        url: "https://5d76bf96515d1a0014085cf9.mockapi.io/product/" +differentCartItems[i],
        type: 'GET',
        async: false, // Set this to false to make it synchronous
        success: function(data) {
            var productData = data
            console.log(productData)
            cardListElement.innerHTML += `
            <div class="checkout-card">
                                <div>
                                    <img class="checkout-product-img"
                                        src=${productData.preview} />
                                </div>
                                <div>
                                    <h4>${productData.name}</h4>
                                    <p>x${nummberOfSimlarProducts[i]}</p>
                                    <p>
                                        <span>Amount: Rs</span>
                                        <span>${productData.price}</span>
                                    </p>
                                </div>
                            </div> `
                
                totalCost+=(productData.price*parseInt(nummberOfSimlarProducts[i]))
                totalAmount.innerText=totalCost
        },
        error: function(error) {
          // Handle any errors here
        }
      });
      

}

function orderPlaced(){
    if($("#differentcount").text()==0){
        $("#href").attr("href","Cart Page.html")
        alert("Your Cart is Empty!!")
    }else{
        $("#href").attr("href","Order Page.html")
        localStorage.removeItem("cartProducts")
        localStorage.removeItem("id")
        localStorage.removeItem("cartCount")
    }
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