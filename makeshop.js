
 // generate shop used to get data from APIS
 //increment function->if nothing then push item in array in obj form
 //decremnt function removes the item/products
//show incremented/decremented values ,show toal on cart icon
//save them using local storage.



//let shop=document.getElementById("shop");
    let store =JSON.parse(localStorage.getItem("key"))||[];
   
    let getshop =()=>
    {
        return ( shop.innerHTML=shopdata.map((x)=>{
           
            let {name,desc,price,img,id}=x;
            let findfromstore=store.find((x)=>x.id===id)||[];
    return ` 
    <table class="table">
    <thead>
    <tr>
<td>

    <div class="card" style="width: 20rem;" id=products-id${id}>
    <img class="card-img-top" src="${img}" alt="Card image cap">
    <div class="card-body">
    <h5 class="card-title">${name}</h5>
    <h5 class="card-title">$${price}</h5>
    <h5 class="card-text">${desc}</h5>
    <button class="btn btn-outline-danger btn-lg" onclick="increment(${id})">+</button>
    <button class="btn btn-outline-dark btn-lg" id=${id}>
    ${findfromstore.quantity==undefined?0:findfromstore.quantity}
    </button>
    <button class="btn btn-outline-success btn-lg"onclick="decrement(${id})">-</button>
    </div>
    </div>
    </td>
    </tr>
    <br>
    <br>
  </thead>
  <tbody>`
            })
            .join(""))
    }
    getshop();
    let increment=(id)=>
    {
    let findfromstore=store.find((x)=>x.id===id);
    if(findfromstore==undefined)

    {
        store.push({
    
        id:id,
        quantity:1,
    }
    )}
    else if(findfromstore.quantity>6){
    alert("cannot add 1 item more than 7 ");
    }
    else
    {
        findfromstore.quantity+=1;
    }
    localStorage.setItem("key",JSON.stringify(store));
    update(id);
   
    };

    let decrement=(id)=>{
        let findfromstore=store.find((x)=>x.id===id);
        
        if(findfromstore===undefined){

        return ;
         }
        else if(findfromstore==0)
        {
         return alert("cannot be less than 0");
        }
        else{
            findfromstore.quantity-=1;
        }
        update(id);
        store=store.filter((x)=>x.quantity!==0);
        localStorage.setItem("key",JSON.stringify(store)); 
    };
//this will show the incremented and decremented value of products 
    let update=(id)=>{
        let findfromstore=store.find((x)=>x.id===id);
        document.getElementById(id).innerHTML=findfromstore.quantity;
        totaldataincart();
    };
    //this function will do total sum of all products and show them on cart as total amount
    let totaldataincart=()=>{
        let cartquantity=document.getElementById("cartamount");
        cartquantity.innerHTML=store.map((x)=>x.quantity).reduce((x,y)=>x+y,0);
    }
    totaldataincart();