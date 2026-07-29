

const products = [
        {
            id: 1,
            name: "Apple Coasters",
            price: 16.50,
            image: "images/applecoaster.jpg"
        },

        {
            id: 2,
            name: "Crochet Case",
            price: 17.00,
            image: "images/case.jpg"
        },
        {
            id: 3,
            name: "Checkered Bucket Hat",
            price: 15.99,
            image: "images/checkeredbuckethat.jpg"
        },

        {
            id: 4,
            name: "Desk Mat",
            price: 17.00,
            image: "images/deskmat.jpeg"
        },
        {
            id: 5,
            name: "Checkered Bag",
            price: 17.00,
            image: "images/checkeredhandbag.jpeg"
        },

        {
            id: 6,
            name: "Headband",
            price: 8.99,
            image: "images/headband.jpg"
        },

        {
            id: 7,
            name: "Heart Tote Bag",
            price: 20.00,
            image: "images/totebag.jpg"
        },

        {
            id: 8,
            name: "Bubble Stitch Hand Bag",
            price: 17.00,
            image: "images/bubblebag.jpg"
        },

        {
            id: 9,
            name: "Jewelry Hanger",
            price: 13.50,
            image: "images/hanger.jpg"
        },

        {
            id: 10,
            name: "Hammock",
            price: 20.00,
            image: "images/hammock.jpg"
        }
    ]


    const params = new URLSearchParams(window.location.search);
    const id = Number(params.get("id"));

    const product = products.find(p => p.id === id);

    if(product) {
        document.querySelector('#title').textContent = product.name;
        document.querySelector('#price').textContent = `$${product.price.toFixed(2)}`;
        document.querySelector('#image').src = product.image;
    }
    
    
    function addToCart(product) {
        let cart = JSON.parse(localStorage.getItem("cart")) || [];
       

         const duplicate = cart.find(item => item.id === product.id);
         
         if(duplicate) {
            alert("This product is already in the cart");
            return;
         }

        const quantity = Number(document.getElementById("product-quantity").value);
        cart.push({...product, quantity: quantity});
        
        

        localStorage.setItem("cart", JSON.stringify(cart));
    }

    const cartItems = document.getElementById("cart-items");

    const shoppingCart = JSON.parse(localStorage.getItem("cart")) || [];

    

    shoppingCart.forEach(products => {
        const cartRow = document.createElement("div");

        cartRow.innerHTML = `
         <div class="row-container">
              <div>
                <img src="${products.image}" alt="apple coaster" width="100px" height="130px">
              </div>

              <div class="row-2">
                <a href="product.html?id=${products.id}">${products.name}</a><br> 
                <span>$${products.price}</span>
              </div>

              <div class="row-3">
                <input id="display" name="quantity" value="${products.quantity}" readonly>
                <button onclick="plusQuantity(${products.id})" class="quantity-btn plus" name="plus">+</button>
                <button onclick="minusQuantity(${products.id})" class="quantity-btn minus" name="minus">-</button>
                <i class="fa-regular fa-trash-can" onclick="removeProduct(${products.id})"></i>
              </div>

              <div class="row-4">
                $${products.price * products.quantity}
              </div>
            </div>
            `;

            cartItems.appendChild(cartRow);
    });

    function removeProduct(id) {
        let cart = JSON.parse(localStorage.getItem("cart")) || [];

        cart = cart.filter(product => product.id !== id);

        localStorage.setItem("cart", JSON.stringify(cart));

        location.reload();
    }

       

    function minusQuantity(id) {
        let cart = JSON.parse(localStorage.getItem("cart")) || [];
        const product = cart.find(product => product.id === id);
        const display = document.getElementById("display");

        if (product && product.quantity > 1) {
            display.value = product.quantity--;
        }

        localStorage.setItem("cart", JSON.stringify(cart));

        location.reload()

    }
    
    function plusQuantity(id) {
        let cart = JSON.parse(localStorage.getItem("cart")) || [];
        const product = cart.find(product => product.id === id);
        const display = document.getElementById("display");

        if (product && product.quantity) {
            display.value = product.quantity++;
        }

        localStorage.setItem("cart", JSON.stringify(cart));

        location.reload()
    }
    
    const checkout = document.getElementById("total");

    let total = 0;
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.forEach(product => {
        total += product.price * product.quantity;
    });

        checkout.textContent = `Estimated Total: $${total.toFixed(2)}`;

        
        const cartContainer = document.getElementById("cart-container");
        const checkoutSection = document.getElementById("container");
        const heading = document.getElementById("heading");
        const border = document.getElementById("border")
        const estimate = document.getElementById("estimate")
        const body = document.querySelector("body")
        const nav = document.querySelector("nav")
       
        
        if (cart.length === 0) {
            cartContainer.innerHTML = `
            <div id="empty-cart">
              <h2>Your cart is empty</h2>
              <a href="products.html">
              <button class="shopping-btn">Continue shopping</button>
              </a>
            </div>`;

            checkoutSection.style.display = "none";
            heading.style.display = "none";
            border.style.display = "none";
            estimate.style.display = "none";
            cartContainer.style.paddingTop = "10%"
            nav.style.marginTop = "0px"
        }

        function checkOut() {
            let order = confirm("Are you sure you want to place your order?");

            if(order) {
                alert("Thank you for your order")
                localStorage.removeItem("cart");
                location.reload();
            }
        }
