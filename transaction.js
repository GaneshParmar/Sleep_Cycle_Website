// localStorage.removeItem("Transaction");
// Global Variables
var transaction={
    "date":"17 October 2021",
    "detail":"Money got from Dukan",
    "amount":"-20Rs"
};
var transaction_list=[];

// Creating the local storage
if (localStorage.getItem("Transaction")==null) {

    
    // console.log(temp);
    localStorage.setItem("Transaction",JSON.stringify(transaction_list));
}

function get_ele(ele) {
    return document.getElementById(ele);
}
var confirm_msg=get_ele("confirm");

// Show clear transaction confirmation message

// Function to hide confirm msg
function hide_confirm(params) {
    confirm_msg.classList.add("hide");
}


function cl_tran_show_conf(params) {
    confirm_msg.classList.remove("hide");
}

function clear_tran(params) {
    localStorage.setItem("Transaction","[]");
    // localStorage.setItem("Balance","0 Rs");
    show_transaction();
    hide_confirm();    
}


// 





function show_transaction(){
    var transaction_record=JSON.parse(localStorage.getItem("Transaction"));
    // selecting the transaction_container to insert the html particular date transaction
    var transaction_container=document.getElementById("transaction_container");
    var no_of_records=transaction_record.length;
    var date_of_record="";
    // temp is for selecting the class particular_date
    // var temp=-1;
    transaction_container.innerHTML='';
    for(var i=0;i<no_of_records;i++){
        var transaction_selected=transaction_record[i];
        var amount=transaction_selected["amount"];
        // Check for date change
        if(date_of_record!=transaction_selected["date"]){
    
            date_of_record=transaction_selected["date"];
            if(parseInt(amount)<0){
            transaction_container.insertAdjacentHTML('afterbegin',` 
            <div class="particular_date">
                <h4>${transaction_selected["date"]}</h4>
                <div class="money_info">
                    <div class="info red">
                        <div class="detail">${transaction_selected["detail"]}</div>
                        <div class="amt">${transaction_selected["amount"]}</div>
                    </div>
                </div>    
            </div>
            `);}
            else{
                date_of_record=transaction_selected["date"];
                transaction_container.insertAdjacentHTML('afterbegin',` 
                <div class="particular_date">
                    <h4>${transaction_selected["date"]}</h4>
                    <div class="money_info">
                        <div class="info green">
                            <div class="detail">${transaction_selected["detail"]}</div>
                            <div class="amt">${transaction_selected["amount"]}</div>
                        </div>
                    </div>    
                </div>`);
                }
            // Selecting particular date container
            var particular_date=document.querySelectorAll(".particular_date");
            console.log("In if statement ");
            console.log(particular_date);
        }
        else{
            var particular_date=document.querySelectorAll(".particular_date");
            console.log("In else part");
            if(parseInt(amount)<0){
                particular_date[0].innerHTML+=`        
                <div class="money_info">
                    <div class="info red">
                        <div class="detail">${transaction_selected["detail"]}</div>
                        <div class="amt">${transaction_selected["amount"]}</div>
                    </div>
                </div>`;
            }
            else{
            console.log(particular_date);
            particular_date[0].innerHTML+=`        
                <div class="money_info">
                    <div class="info green">
                        <div class="detail">${transaction_selected["detail"]}</div>
                        <div class="amt">${transaction_selected["amount"]}</div>
                    </div>
                </div>`;
            }
        }
    }
}

function update_t_balance(params) {
    document.getElementById("balance").innerHTML=localStorage.getItem("Balance");
}
show_transaction();
update_t_balance();