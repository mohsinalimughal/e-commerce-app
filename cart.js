// Get DOM Elements
const cartitems = document.querySelector("#cart-items");
const totalprice = document.querySelector("#total-price");


const renderitems = () => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    cartitems.innerHTML = "";
    cart.forEach((item, index) => {
        cartitems.innerHTML += `
            <div class="col" id="cart-item-${index}">
                <div class="card h-100 border-0 shadow-sm" style="border: 1px solid var(--border-color); background-color: var(--background-color);">
                    <img src="${item.thumbnail}" class="card-img-top" alt="${item.title}" style="height: 200px; object-fit: cover;">
                    <div class="card-body text-center">
                        <h5 class="card-title text-truncate" style="color: var(--text-color); font-weight: bold;">${item.title}</h5>
                        <p class="card-text fw-bold" style="color: var(--primary-color); font-size: 1.2rem;">$${item.price.toFixed(2)}</p>
                        <div class="d-flex justify-content-between align-items-center mb-3">
                            <button class="btn btn-outline-secondary btn-sm" 
                                    onclick="minusquantity(${index})" 
                                    ${item.quantity === 1 ? "disabled" : ""}>
                                -
                            </button>
                            <input type="number" class="form-control form-control-sm text-center" value="${item.quantity}" style="width: 60px;" min="1" readonly>
                            <button class="btn btn-outline-secondary btn-sm" onclick="addquantity(${index})">+</button>
                        </div>
                        <button class="btn btn-danger btn-sm w-100" onclick="removefromcart(${index})">Remove from Cart</button>
                    </div>
                </div>
            </div>`;
    });
};


const removefromcart = (index) => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
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
            localStorage.setItem("cart", JSON.stringify(cart));
            Swal.fire({
                title: "Deleted!",
                text: "Your item has been removed.",
                icon: "success"
            });
            renderitems(); 
            totalfunc();
        }
    });
};


const addquantity = (index) => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart[index].quantity++;
    localStorage.setItem("cart", JSON.stringify(cart)); 
    renderitems();
    totalfunc();
};


const minusquantity = (index) => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    if (cart[index].quantity > 1) {
        cart[index].quantity--;
        localStorage.setItem("cart", JSON.stringify(cart)); 
        renderitems();
        totalfunc();
    } else {
        Swal.fire("Invalid action", "Quantity cannot be less than 1.", "error");
    }
};


const totalfunc = () => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const totalPrice = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
    totalprice.innerHTML = `$${totalPrice.toFixed(2)}`;
};

renderitems();
totalfunc();
