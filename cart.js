
// console.log(cart)

const cartitems = document.querySelector("#cart-items")
const totalprice = document.querySelector("#total-price")

    // const cart = JSON.parse(localStorage.getItem("cart"))
    // localStorage.setItem("cart", JSON.stringify(cart)); 



const renderitems = ()=>{
    const cart = JSON.parse(localStorage.getItem("cart"))
cart.map((item ,index)=>{
    cartitems.innerHTML += `
                       <div class="col">
    <div class="card h-100 border-0 shadow-sm" style="border: 1px solid var(--border-color); background-color: var(--background-color);">
        <!-- Product Image -->
        <img src="${item.thumbnail}" class="card-img-top" alt="Product Image" style="height: 200px; object-fit: cover;">

        <!-- Card Body -->
        <div class="card-body text-center">
            <!-- Product Title -->
            <h5 class="card-title text-truncate" style="color: var(--text-color); font-weight: bold;">
                ${item.title}
            </h5>

            <!-- Product Price -->
            <p class="card-text fw-bold" style="color: var(--primary-color); font-size: 1.2rem;">
                $${item.price.toFixed(2)}
            </p>

            <!-- Quantity Controls -->
            <div class="d-flex justify-content-between align-items-center mb-3">
                <button class="btn btn-outline-secondary btn-sm" onclick="minusquantity(${index})" style="color: var(--text-color);">
                    -
                </button>
                <input type="number" class="form-control form-control-sm text-center" value="${item.quantity}" style="width: 60px;" min="1">
                <button class="btn btn-outline-secondary btn-sm" onclick="addquantity(${index})" style="color: var(--text-color);">
                    +
                </button>
            </div>

            <!-- Remove Button -->
            <button class="btn btn-danger btn-sm w-100" onclick="removefromcart(${index})" style="background-color: var(--accent-color); border-color: var(--accent-color);">
                Remove from Cart
            </button>
        </div>
    </div>
</div>

    `
})
}
renderitems()
const removefromcart = (index) => {
    const cart = JSON.parse(localStorage.getItem("cart"))
    Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
    }).then((result) => {
        if (result.isConfirmed) {
            
            cart.splice(index, 1);
            
          
            Swal.fire({
                title: "Deleted!",
                text: "Your item has been removed.",
                icon: "success"
            });

            
            cartitems.innerHTML = "";
            renderitems();
            localStorage.setItem("cart", JSON.stringify(cart)); 
        }
    });
    totalfunc()
};

const addquantity = (index)=>{
    const cart = JSON.parse(localStorage.getItem("cart"))
    console.log("add clicked",index)
    cart[index].quantity++
    console.log(cart[index])
    cartitems.innerHTML =``
    renderitems()
    totalfunc()
    localStorage.setItem("cart",JSON.stringify(cart))
}
const minusquantity = (index)=>{
    const cart = JSON.parse(localStorage.getItem("cart"))
    console.log("minus clicked",index)
    cart[index].quantity--
    console.log(cart[index])
    cartitems.innerHTML =``
    renderitems()
    totalfunc()
    localStorage.setItem("cart",JSON.stringify(cart))
}




const totalfunc = ()=>{
    var totalPrice = 0
    const cart = JSON.parse(localStorage.getItem("cart"))
    cart.map((item)=>{
        if(item.quantity === 1){
            console.log(item.price)
                totalPrice = totalPrice + item.price
        }else{
            totalPrice = totalPrice + (item.price*item.quantity)
        }
    })
    totalprice.innerHTML = totalPrice
}

totalfunc()





