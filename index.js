let productAPI = 'http://localhost:3000/product'

// Start chuong trinh
function start() {
    getProducts((products) => {
        renderProducts(products)
    })

    handleCreateForm()
}
// chay ham start
start()

function getProducts(callback) {
    fetch(productAPI)
        .then((res) => {
            return res.json()
        })
        .then(callback)
}

// Them dữ liệu vào
function createProduct(data, callback){
    let options = {
        method: 'POST',
        headers: {
            "Content-Type": 'application/json'
        },
        body: JSON.stringify(data)
    }
    fetch(productAPI, options)
        .then((res) => {
           return res.json()
        })
        .then(callback)
}

// Sửa dữ liệu 
function handleEditProduct(id, data){
    let options = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }
    fetch(productAPI + '/' + id, options)
        .then((res)=>{
            return res.json()
        })
        .then((data)=>{
            document.querySelector(`p[id="${id}"]`).innerHTML = data.title
        })
}
// Xóa dữ liệu
function handleDeleteProduct(id){
    let options = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    }
    fetch(productAPI + '/' + id, options)   
        .then((res)=>{
            return res.json()
        })
        .then(function(){
            let deleteData = document.querySelector('.products-'+id)
            if(deleteData){
                deleteData.remove()
            }
        })
}

// Lấy sản phẩm bên db.json, gọi thứ cần lấy
function renderProducts(products){
    let listProduct = document.querySelector('#list-product')
    let html = products.map((product) => {
        return ` 
            <li class ="products-"${product.id}>
                <h4>${product.id}</h4>
                <p id="editName">${product.name}</p>
                <p>${product['date of manufacture']}</p>
                <p>${product.expiry}</p>
                <p id="editFunc">${product.function}</p>
                <p>${product.ingredient}</p>
                <button onclick = "handleDeleteProduct(${product.id})">delete</button>
                <button onclick ="handleEditProduct(${product.id})">edit</button>    
            </li>    
        `
    })
    listProduct.innerHTML = html.join('')
}

// Tạo form ghi thông tin 
function handleCreateForm(){
    let createBtn = document.querySelector('#create')
    createBtn.onclick = function(){     // Event
        let id = document.querySelector('input[name = "id"]').value
        let name = document.querySelector('input[name = "name"]').value
        let date = document.querySelector('input[name = "date of manufacture"]').value
        let expiry = document.querySelector('input[name = "expiry"]').value
        let func = document.querySelector('input[name = "function"]').value
        let ingredient = document.querySelector('input[name = "ingredient"]').value
        
        // Dua du lieu vao 
        let formData = {
            id: id,
            name: name,
            date: date,
            expiry: expiry,
            func: func,
            ingredient: ingredient
        }
        createProduct(formData)
    }
}
