console.log("js ok")
const cart = JSON.parse(localStorage.getItem("cart"))
const productscontainer = document.querySelector("#productscontainer")


const globalcart = cart || []


const renderproducts = ()=>{
fetch('https://dummyjson.com/products')
.then(res => res.json())
.then((res)=>{
    console.log(res.products)
    res.products.map((item)=>{
     productscontainer.innerHTML += `
                        <div class="col">
                            <div class="card border-0 shadow-sm h-100">
                                <img src="${item.thumbnail}" class="card-img-top" alt="" style="height: 200px; object-fit: cover;">
                                <div class="card-body text-center">
                                    <h5 class="card-title text-truncate">${item.title}</h5>
                                    <p class="card-text text-success fw-bold">$${item.price.toFixed(2)}</p>
                                    <button class="btn btn-primary btn-sm w-100" onclick="addtocart(${item.id})">Add to Cart</button>
                                    <button class="btn btn-secondary btn-sm w-100 mt-2" onclick="seemore(${item.id})">see more</button>
                                </div>
                            </div>
                        </div>
     `
    //  console.log(item)
    })
})
.catch((err)=>{
    console.log(err)
})
}

const addtocart = (id)=>{
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

const seemore = (id)=>{
    window.location = "seemore.html"
    console.log(id)
    localStorage.setItem("id",JSON.stringify(id))
}
renderproducts()