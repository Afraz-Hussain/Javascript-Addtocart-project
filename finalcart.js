
let label=document.getElementById("label");

let shoppingcart=document.getElementById("shoppingcart");

let store =JSON.parse(localStorage.getItem("key"))||[];
let generatecart=()=>
 {
    if(store.length!==0)    
    {
   return (shoppingcart.innerHTML=store .map((x)=>{    
    let {id,quantity}=x;
    let findfromstore=shopdata.find((y)=>y.id===id)||[];
    return` 
    <div class="card" style="width: 20rem;" id=products-id${id}>
    <h3 class="cross btn btn-outline-dark" onclick="removeitem(${id})">X</h3>
    <img class="card-img-top" src="${findfromstore.img}" alt="Card image cap">

    <div class="card-body">
    <h5 class="card-title">${findfromstore.name}</h5>
    <h5 class="card-title">PRICE:-${findfromstore.price}</h5>
    <h5 class="card-text bg-outline-success">RS:${findfromstore.price*quantity}</h5>
    <button class="btn btn-outline-danger btn-lg" onclick="increment(${id})">+</button>
    <button class="btn btn-outline-dark btn-lg" id=${id}>
  ${quantity}
    </button>
    <button class="btn btn-outline-success btn-lg"onclick="decrement(${id})">-</button>

    </div>
        `
}))

}

    else {
        shoppingcart.innerHTML = ``;
        label.innerHTML = `
        <h2 class="text-center  text-info mt-5">Cart is Empty</h2>
        <a href="index.html" class=" HomeBtn">
          <button class="HomeBtn btn btn-danger text-white">Back to home</button>
        </a>
        `;
    }
    };

        generatecart();
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
             return;
            }
            else{
                findfromstore.quantity-=1;
            }
            update(id);
            store=store.filter((x)=>x.quantity!==0);
            localStorage.setItem("key",JSON.stringify(store)); 
            
        };
        let update=(id)=>{

            let findfromstore=store.find((x)=>x.id===id);
            document.getElementById(id).innerHTML=findfromstore.quantity;
            totaldataincart();
            generatecart();
            TotalAmount();
        };
         let totaldataincart=()=>{
        let cartquantity=document.getElementById("cartamount");
        cartquantity.innerHTML=store.map((x)=>x.quantity).reduce((x,y)=>x+y,0);
    }
    totaldataincart();

        let removeitem=(id)=>{
           store=store.filter((x)=>x.id!==id);
           generatecart();
           localStorage.setItem("key",JSON.stringify(store));
totaldataincart();
        }
        //total bill 
let TotalAmount=()=>{
    if (store.length !== 0) {
        let amount = store .map((x) => {
            let { quantity, id } = x;
            let findproductfromshopdata = shopdata.find((y) => y.id === id) || [];
            return quantity * findproductfromshopdata.price;
            }).reduce((x, y) => x + y, 0);
            label.innerHTML=`
            <h2>Total Bill : RS ${amount}</h2>        
            <button class="checkout btn btn-outline-dark btn-md">Checkout</button>
            <button onclick="clearCart()" class=" btn btn-outline-danger btn-md">Clear Cart</button>
            `;
}
else return;
};
TotalAmount();
        //clear all cart
        let clearCart=()=>
        {
            store =[];
            generatecart();
            localStorage.setItem("key",JSON.stringify(store));
        }
        