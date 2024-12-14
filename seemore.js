
const body = document.querySelector("body")
const idd = JSON.parse(localStorage.getItem("id"))
console.log(idd)

const cart = JSON.parse(localStorage.getItem("cart"))
const productscontainer = document.querySelector("#productscontainer")


const globalcart = cart || []
const renderproduct = ()=>{
    fetch(`https://dummyjson.com/products/${idd}`)
    .then(res => res.json())
    .then((res)=>{
        console.log(res)

         body.innerHTML += `
    <div class="container my-5">
        <!-- Back Button -->
        <button class="btn btn-secondary mb-4" onclick="window.history.back()">← Back to Products</button>

        <!-- Product Details Section -->
        <div class="row">
            <!-- Product Image -->
            <div class="col-md-6">
                <img src="${res.thumbnail}" alt="Product Image" class="img-fluid rounded">
            </div>

            <!-- Product Details -->
            <div class="col-md-6">
                <h1 id="product-title">${res.title}</h1>
                <p class="text-muted" id="product-category">Category: ${res.category}</p>
                <h4 class="text-success fw-bold" id="product-price">$${res.price}</h4>
                <p id="product-description">
                    ${res.description}
                </p>

                <!-- Quantity Selector -->
                <div class="d-flex align-items-center mb-3">
                    <label for="quantity" class="me-2">Quantity:</label>
                    <input type="number" id="quantity" class="form-control form-control-sm text-center" value="1" style="width: 80px;" min="1">
                </div>

                <!-- Add to Cart Button -->
                <button class="btn btn-primary w-100"  onclick="addtocart(${res.id})" >Add to Cart</button>
            </div>
        </div>
    </div>
         `
        //  console.log(item)
        })
    .catch((err)=>{
        console.log(err)
    })
    }

    renderproduct()

const addtocart = (id)=>{
    Swal.fire("Product added to cart!");
    console.log(id)
      fetch(`https://dummyjson.com/products/${id}`)
      .then(res =>res.json())
      .then((res)=>{

        let product = globalcart.find(item => item.id === res.id);
        if(!product){
            res.quantity = 1
            globalcart.push(res)
           localStorage.setItem("cart",JSON.stringify(globalcart))
        }else{
            console.log("quanityty increase")
            product.quantity++
            localStorage.setItem("cart",JSON.stringify(globalcart))
        }
           console.log(globalcart)
      })
      .catch((err)=>{
        console.log(err)
      })
}