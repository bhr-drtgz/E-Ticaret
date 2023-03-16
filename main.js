const categoryList = document.querySelector(".CategoryList");
const productList = document.querySelector(".productList");
const sepetBtn = document.querySelector("#SEPET")
const closeBtn = document.querySelector("#close")
const modal = document.querySelector(".modalWrapper")
const modalList = document.querySelector("#modalList")
const toplam = document.querySelector("#fiyat")



document.addEventListener("DOMContentLoaded", () => {
    fetchCategories();
    fetchProduct();
});

function fetchCategories() {
    fetch('https://api.escuelajs.co/api/v1/categories')
        .then((res) => res.json())
        .then((data) =>
            data.slice(1, 5).forEach((category) => {
                const categoryDiv = document.createElement("div");
                categoryDiv.classList.add("categoryCart");
                categoryDiv.innerHTML = `
            <img src="${category.image}">
            <span>"${category.name}"</span>
             `;
                categoryList.appendChild(categoryDiv)
            }))
        .catch((err) => console.log(err))
}

function fetchProduct() {
    fetch('https://api.escuelajs.co/api/v1/products')
        .then((res) => res.json())
        .then((data) =>
            data.slice(0, 20).forEach((product) => {
                const productDiv = document.createElement('div');
                productDiv.classList.add('product');
                productDiv.innerHTML = `
                <img src="${product.images[0]}">
                       <p>"${product.title}"</p>
                       <p>"${product.category.name}"</p>
                <div class="productInfo">
                     <span>"${product.price}"$</span>
                     <button onClick="sepeteEkle({name:'${product.title}',id:'${product.id}',price:'${product.price}',amount:1})">Sepete Ekle</button>
                 `;
                productList.appendChild(productDiv)
            })
        )
        .catch((err) => console.log(err))
}
const basket = []
let toplamFiyat = 0

function addList() {
    basket.forEach((item) => {
        console.log(item)
        const basketItem = document.createElement("div");
        basketItem.classList.add("sepetItem");
        basketItem.innerHTML = `
         <h2>${item.name}</h2>
        <h3>${item.price} $</h3>
        <p>Miktar:${item.amount}</p>
          `;
        modalList.appendChild(basketItem)
        toplamFiyat += Number(item.price) * item.amount;
    })
    toplam.innerText = toplamFiyat;
}

sepetBtn.addEventListener("click", () => {
    toggleSepet();
    addList();
});
closeBtn.addEventListener("click", () => {
    toggleSepet();
    modalList.innerHTML = "";
});

function toggleSepet() {
    modal.classList.toggle("active");
}


function sepeteEkle(param) {
    const fountItem = basket.find((item) => item.id == param.id);
    if (fountItem) {
        fountItem.amount += 1;
    } else {
        basket.push(param);
    }
}
