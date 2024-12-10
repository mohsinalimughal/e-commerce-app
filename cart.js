const cart = JSON.parse(localStorage.getItem("cart"))
console.log(cart)

const cartitems = document.querySelector("#cart-items")

const renderitems = ()=>{
cart.map((item ,index)=>{
    cartitems.innerHTML += `
                       <div class="col">
                <div class="card h-100 border-0 shadow-sm">
                    <img src="${item.thumbnail}" class="card-img-top" alt="Product Image" style="height: 200px; object-fit: cover;">
                    <div class="card-body text-center">
                        <h5 class="card-title text-truncate">${item.title}</h5>
                        <p class="card-text text-success fw-bold">$${item.price}</p>
                        <div class="d-flex justify-content-between align-items-center mb-3">
                            <button class="btn btn-outline-secondary btn-sm" onclick="minusquantity(${index})">-</button>
                            <input type="number" class="form-control form-control-sm text-center" value="${item.quantity}" style="width: 60px;" min="1">
                            <button class="btn btn-outline-secondary btn-sm" onclick="addquantity(${index})">+</button>
                        </div>
                        <button class="btn btn-danger btn-sm w-100" onclick="removefromcart(${index})">Remove from Cart</button>
                    </div>
                </div>
            </div>
    `
})
}
renderitems()
const removefromcart = (index)=>{
           
       cart.splice(index,1)
       cartitems.innerHTML =``
       renderitems()
       localStorage.setItem("cart",JSON.stringify(cart))

}

const addquantity = (index)=>{
    console.log("add clicked",index)
    cart[index].quantity++
    console.log(cart[index])
    cartitems.innerHTML =``
    renderitems()
    localStorage.setItem("cart",JSON.stringify(cart))
}
const minusquantity = (index)=>{
    console.log("minus clicked",index)
    cart[index].quantity--
    console.log(cart[index])
    cartitems.innerHTML =``
    renderitems()
    localStorage.setItem("cart",JSON.stringify(cart))
}