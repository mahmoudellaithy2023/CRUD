var productName=document.getElementById("productName");
var productPrice=document.getElementById("productPrice");
var productCate=document.getElementById("productCategory");
var productDesc=document.getElementById("productDesc");
var productImage=document.getElementById("productImage");
var searchInput=document.getElementById("searchInput");
var addBtn=document.getElementById("addBtn");
var updateBtn=document.getElementById("updateBtn");
var productList=[];

if(localStorage.getItem("products")!=null){
  productList=JSON.parse(localStorage.getItem("products"));
  console.log(productList);
  display();
  
}

function addProduct(){
 if(validationName() && validationPrice() && validationDesc() && validationCategory()){
  var product={
    name:productName.value,
    price:productPrice.value,
    category:productCate.value,
    desc:productDesc.value,
    img:`img/th.jpeg`
  }
  productList.push(product);

  localStorage.setItem("products",JSON.stringify(productList))
  display();
  console.log(productList);
  clearData();
 }
 else{
  Swal.fire({
    icon: "error",
    title: "Oops...",
    text: "Data Is Invalid!",
    
  });
  
 }
}
function clearData(){
  productName.value=null;
  productPrice.value=null;
  productDesc.value=null;
  productCate.value=null;
  productImage.value=null;
  productName.classList.remove("is-valid");
  productPrice.classList.remove("is-valid");
  productCate.classList.remove("is-valid");
  productDesc.classList.remove("is-valid");
}

function display(){
  var box=``
  for(var i=0; i<productList.length;i++){
     box +=`
  <div class="col-md-3">
    <div class="card text-center p-3">
      <img src=${productList[i].img}  alt="">
      <div class="card-body ">
        <h2>name:${productList[i].name}</h2>
        <h3>price:${productList[i].price}</h3>
        <h3>cate:${productList[i].category}</h3>
        <p>${productList[i].desc}</p>
        <button onclick="deleteProduct(${i})" class="btn btn-danger">delete</button>
        <button onclick="setValueInForm(${i})" class="btn btn-warning">update</button>
      </div>
    </div>
  </div>`
  }
  document.getElementById("rowData").innerHTML=box;
}
function deleteProduct(index){
  productList.splice(index,1);
  localStorage.setItem("products",JSON.stringify(productList));
  display();
}

function search(){
  var term=searchInput.value;
  var box=``
  for(var i=0; i<productList.length;i++){
    if(productList[i].name.toLowerCase().includes(term.toLowerCase())|| productList[i].category.toLowerCase().includes(term.toLowerCase())){
      box +=`
      <div class="col-md-3">
        <div class="card text-center p-3">
          <img src=${productList[i].img} alt="">
          <div class="card-body ">
            <h2>name:${productList[i].name}</h2>
            <h3>price:${productList[i].price}</h3>
            <h3>cate:${productList[i].category}</h3>
            <p>${productList[i].desc}</p>
            <button onclick="deleteProduct(${i})" class="btn btn-danger">delete</button>
            <button onclick="setValueInForm(${i})" class="btn btn-warning">update</button>
          </div>
        </div>
      </div>`
    }

  }
  if(box==""){
    box="<p class='fs-2 text-center text-danger' >No Product Found</p>"
  }
  document.getElementById("rowData").innerHTML=box;
}
var myIndex;
function setValueInForm(index){
  myIndex=index;
  productName.value=productList[index].name;
  productPrice.value=productList[index].price;
  productCate.value=productList[index].category;
  productDesc.value=productList[index].desc;
  addBtn.classList.add("d-none");
  updateBtn.classList.remove("d-none");
  display()
}
function update(){
  productList[myIndex].name=productName.value;
  productList[myIndex].price=productPrice.value;
  productList[myIndex].category=productCate.value;
  productList[myIndex].desc=productDesc.value;
  addBtn.classList.remove("d-none");
  updateBtn.classList.add("d-none");
  localStorage.setItem("products",JSON.stringify(productList));
  display();
  clearData();
}

function validationName(){
  var Regex=/^(\w|\s){3,15}$/;
  var testString=productName.value
  if(Regex.test(testString)){
    productName.classList.add("is-valid");
    productName.classList.remove("is-invalid");
    document.getElementById("alertName").classList.add("d-none");
    return true
  }else{
    productName.classList.add("is-invalid");
    productName.classList.remove("is-valid");
    document.getElementById("alertName").classList.remove("d-none");
    return false
  }
}
function validationPrice(){
  var Regex=/^[1-9]\d{2,6}$/
  var testPrice =productPrice.value;
  if(Regex.test(testPrice)){
    productPrice.classList.add("is-valid");
    productPrice.classList.remove("is-invalid");
    document.getElementById("alertPrice").classList.add("d-none")
    return true
  }
  else{
    productPrice.classList.add("is-invalid");
    productPrice.classList.remove("is-valid");
    document.getElementById("alertPrice").classList.remove("d-none")
    return false
  }
}
function validationCategory(){
  var Regex=/^(Labtop|Screen|Mobile|Tv)$/
  var testCate =productCate.value;
  if(Regex.test(testCate)){
    productCate.classList.add("is-valid");
    productCate.classList.remove("is-invalid");
    document.getElementById("alertCate").classList.add("d-none")
    return true
  }
  else{
    productCate.classList.add("is-invalid");
    productCate.classList.remove("is-valid");
    document.getElementById("alertCate").classList.remove("d-none")
    return false
  }
}
function validationDesc(){
  var Regex=/^.{3,1500}$/
  var testDesc =productDesc.value;
  if(Regex.test(testDesc)){
    productDesc.classList.add("is-valid");
    productDesc.classList.remove("is-invalid");
    document.getElementById("alertDesc").classList.add("d-none")
    return true
  }
  else{
    productDesc.classList.add("is-invalid");
    productDesc.classList.remove("is-valid");
    document.getElementById("alertDesc").classList.remove("d-none")
    return false
  }
}