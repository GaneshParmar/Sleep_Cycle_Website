// Global Variables
var win_width=innerWidth;
var last_month_sleep="";
var average_sleep=0;
// If local storage is not created
        
if(localStorage.getItem("sleep_status")==null){
    // Creating the local storages
    var sleep_schedule=[];
    // 0 --> Wake up;1--->Sleep ;2-->Total-->Sleep
    var daily_routine={
        0:"00:00",
        1:"23:59",
        2:"notrecorded@notrecorded"
    }
    for(var i=0;i<=31;i++){
        if(i==31){
            sleep_schedule.push({"last_day_month_sleep":"23:00"});
        }
        else{
            sleep_schedule.push(daily_routine);
        }
    }
    localStorage.setItem("sleep_status",JSON.stringify(sleep_schedule));   

}

if(localStorage.getItem("last_month_sleep_status")==null){
    // Creating the empty array
    // var lmonth_sleep=[];
    var sleep_stat_lMonth={
        "Avg_Sleep":"Not Recorded",
        "L_Sleep":"Not Recorded",
        "H_Sleep":"Not Recorded"
    }
    // lmonth_sleep.push(sleep_stat_lMonth);
    // Inserting the empty value in local storage
    localStorage.setItem("last_month_sleep_status",JSON.stringify(sleep_stat_lMonth));
}
var last_month_sleep_status=JSON.parse(localStorage.getItem("local_month_sleep_status"));
// if date is equal to 1
function localstorage_update() {
    // Coping the lat date sleep time
    var sleep_time_last_date=JSON.parse(localStorage.getItem("sleep_status"))[31]["last_day_month_sleep"];
    // Creating the local storages
    var sleep_schedule=[];
    // 0 --> Wake up;1--->Sleep ;2-->Total-->Sleep
    var daily_routine={
        0:"00:00",
        1:"23:59",
        2:"notrecorded@notrecorded"
    }
    for(var i=0;i<=31;i++){
        if(i==31){
            sleep_schedule.push({"last_day_month_sleep":`${sleep_time_last_date}`});
        }
        else{
            sleep_schedule.push(daily_routine);
        }
    localStorage.setItem("sleep_status",JSON.stringify(sleep_schedule));     
}}


// Selecting the input (Navbar)

function select_nav(i){
    
    
    // document.querySelectorAll("#container_item")[2].classList.remove('active');

    var nav_selection=document.querySelectorAll('input')[i].value;
    
    if(nav_selection=="curr_habits" || i==0) {
        document.querySelector(".Cur_habits").classList.add('active');
        document.querySelector(".Feat").classList.remove('active');
        // document.querySelectorAll("#container_item")[1].style.display="none";
        // document.querySelectorAll("#container_item")[0].classList.add('active');
    }
    // if(nav_selection=="add_habit"){
    //     document.querySelectorAll("#container_item")[1].classList.add('active');
    // }
    if(nav_selection=="feat" || i==1){
        document.querySelector(".Cur_habits").classList.remove('active');
        // document.querySelectorAll("#container_item")[1].style.display="flex";
        document.querySelector(".Feat").classList.add('active');
    }
}

// function to get total sleep time
function get_sleep_time(sleep_time,waking_time) {
    // Total sleep time
    // more info https://stackoverflow.com/questions/10804042/calculate-time-difference-with-javascript/27484203
    return dif =(( new Date("1970-1-2 " + waking_time) - new Date("1970-1-1 " + sleep_time) ) / 1000 / 60 /60).toFixed(2);
}


// Function for calculating last month Average sleep
function Average_Sleep(schedule,num) {
    for(var i=0;i<num;i++){
        if(i==0){
            var sleep_time=get_sleep_time(schedule[31]["last_day_month_sleep"],schedule[i][0]);
        }
        else{
            var sleep_time=get_sleep_time(schedule[i-1][1],schedule[i][0]);
        }
        var sleep_h_l=get_l_h_slp_time(sleep_time,num);
        average_sleep=average_sleep+parseInt(sleep_time);
    }
    // sleep_l_m["L_Sleep"]=sleep_h_l["l"];
    // sleep_l_m["H_Sleep"]=sleep_h_l["h"];
    // var average_sleep =;
    console.log(average_sleep);
    average_sleep=average_sleep/num;
    return {"1": (parseInt(average_sleep)).toString()+":"+((parseInt(average_sleep))-((parseInt(average_sleep*60))).toString()),
    "2":sleep_h_l["l"],"3":sleep_h_l["h"]};
}
var l_slp_time=10;
var h_slp_time=5;
function get_l_h_slp_time(t_sleep_time,num) {    
    if(h_slp_time<t_sleep_time){
        h_slp_time=t_sleep_time;
    }
    if(l_slp_time>t_sleep_time){
        if(t_sleep_time > 1){
            l_slp_time=t_sleep_time;
        }        
    }
    return {"l":l_slp_time,"h":h_slp_time};
}

// Function for form slide
function show_form(form) {
    // document.querySelector(form).style.animation="slide 1s forwards";
    document.querySelector(form).style.transform="translateX(0%)";
}

// Function for form slide
function hide_form(form) {
    document.querySelector(form).style.transform="translateX(-300%)";
}
// Get time
var date=new Date();
var year=date.getFullYear();
var month=date.getMonth()+1;
var time=date.getHours();
var min=date.getMinutes();
// LAST DATE OF THE MONTH
var last_date=get_month_last_date(year,month);

// Date in string
var date_string=new Date().toString();
const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"];
var today_date=new Date().getDate();


// Show update
function show() {
    document.getElementById("show_update").style.animation="hide 2s forwards";
    setTimeout(() => {
        document.getElementById("show_update").style.animation="none";
    }, 2200)        
    
}


function Update_stats(date,time,awake){    
    var no_=date-1;
    // For recording the sleep
    var yesterday=no_-1

    var schedule=JSON.parse(localStorage.getItem("sleep_status"));
    if (awake) {    
        //updating the wake up time 
        schedule[no_][0]=time;
        if(date==1){
            var sleep_time=schedule[31]["last_day_month_sleep"];
        }
        else{
            var sleep_time=schedule[yesterday][1];
        }
        
        // Total sleep time
        // more info https://stackoverflow.com/questions/10804042/calculate-time-difference-with-javascript/27484203
        var dif =(( new Date("1970-1-2 " + time) - new Date("1970-1-1 " + sleep_time) ) / 1000 / 60 /60).toFixed(2);
        
        var hour_slept=parseInt(dif);
        var minute_slept=parseInt((dif-parseInt(dif))*60);

        // For adding 0 before the minute if less than 0 Like 09 08 07....
        if (minute_slept<10){
            minute_slept="0"+minute_slept;
        }
        var slept_time=hour_slept+":"+minute_slept
        // console.log(slept_time);

        // Storing the dif and sleep_time in localstorage
        schedule[no_][2]=dif+"@"+slept_time;
        localStorage.setItem("sleep_status",JSON.stringify(schedule));
        show();
        highlight_date_bg(schedule);
    }
    else{
        if(last_date==date){
            schedule[31]["last_day_month_sleep"]=time;
        }
        // Updating the sleep time
        schedule[no_][1]=time;
        localStorage.setItem("sleep_status",JSON.stringify(schedule));
        show();
    }
}

// Show Warning
function Say_Warning() {
    alert("This is not the time to sleep Or Wake Up :(");
}

// Activate Button Awke and sleep(Update)
function Activate_btn(){
    // var enter=false;
    var morning=false;
    var night=false;
    var schedule=JSON.parse(localStorage.getItem("sleep_status"));

    // To check if the btn is clicked

    if(schedule[today_date-1][0]=="00:00"){
        var morning=true;
    }
    if(schedule[today_date-1][1]=="23:59"){
        var night=true;
    }
    var update_btn= document.getElementById("update");
    var current_hrn_min_time=time.toString()+":"+min.toString();
    
    // Change update btn to working
    function work_btn_show(night=false) {
        update_btn.style.opacity="0.5";
        update_btn.style.pointerEvents="all";
        update_btn.addEventListener('click',Say_Warning);
        if(!night){            
            update_btn.innerHTML="<img src='https://c.tenor.com/KE-pri_ubCUAAAAC/work-from-home-wfh.gif' width='40' height='30'>";            
        }
        else{
            update_btn.innerHTML="<img src='https://c.tenor.com/hJDuRStH_cYAAAAM/cat-sleeping.gif' width='50' height='40'>";
        }
    }

    if(time==5 || time==6 || time==7 || time==22 || time==23){
        // Foe waking up
        if(time==5 || time==6|| time==7 && morning){
            update_btn.style.opacity="1";
            update_btn.style.pointerEvents="all";
            update_btn.innerHTML="I Woke Up<img src='./Images/woke_up.png' width='40' height='30'>";
            update_btn.addEventListener('click',function () {
                Update_stats(today_date,current_hrn_min_time,true);
                work_btn_show();
            });
        }
        if(!morning){
            work_btn_show();
        }
        if(time==22 || time==23 && night){
            // console.log("I am in");
            update_btn.style.opacity="1";
            update_btn.style.pointerEvents="all";
            update_btn.innerHTML="Now Sleep<img src='./Images/sleep.png' width='40' height='30'>";
            update_btn.addEventListener('click',function () {
                Update_stats(today_date,current_hrn_min_time,false);
                work_btn_show(true);
            });
        }
        if(!night){
            work_btn_show(true);
        }
        
    }
    else{
            work_btn_show();
        }
}

// Function for showing details
function show_details(btn) {
    var details_box=document.querySelector("#details_sm");
    details_box.classList.toggle("hide");
    var length=details_box.classList.length;
    if (length==1) {
        btn.innerHTML="Hide Details";
        btn.style.background="#ff512f";
    }  
    else{
        btn.innerHTML="View Details";
        btn.style.background="#8e7ff2";
    }  
}
// Get last date of the month
function get_month_last_date(year,month) {
    return new Date(year,month,0).getDate();
}
// Get the first day of the month
function get_first_day(date_) {
    return new Date(date_).getDay();
}
// Showing the sleep schedule
function show_sleep_schedule(ele){
    var schedule=JSON.parse(localStorage.getItem("sleep_status"));
    var date_selected=ele.innerText;
    var schedule_date=schedule[date_selected-1];
    var sleep_stat=schedule_date[2].split("@");
    // console.log(sleep_stat);
    var total_sleep=sleep_stat[1];
    var sleep_health=sleep_stat[0];
    // console.log(`I slept ${schedule[date_selected-1][1]} on date ${date_selected}`);
    // Selecting the doiv to shoe the sleep hour of particular date
    var sleep_stat_show=document.getElementById("sleep_hour");
    if (date_selected==today_date){
        var header="Today Sleep Cycle";
    }
    else{
        var header=`My Sleep Schedule On Date <span class='date'>${date_selected}/${month}/${year}</span>`;
    }
    sleep_stat_show.innerHTML=`        
        <h5>${header}</h5>
        <p style="color:gray;">Waking Time <span class="special">${schedule_date[0]}</span></p>\
        <p style="color:gray;">Sleeping Time <span class="special">${schedule_date[1]}</span></p>\
        <h3 style="color:black; font-size:1.1em;">Total Sleep ${total_sleep}</h3>
    `;
}

// For highlighting the date bg based on sleep
function highlight_date_bg(schedule) {
    var dates_selct=document.querySelectorAll(".date");
    for(var j=0;j<last_date;j++){
        // Selecting the date
        var date_=dates_selct[j];
        
        var schedule_date=schedule[j];
        var sleep_stat=schedule_date[2].split("@");
        
        var total_sleep=parseInt(sleep_stat[1]);

        // var sleep_health=sleep_stat[0];
        if(isNaN(total_sleep)){
            console.log(true);
            date_.style.background="rgba(0, 0, 0, 0.026)";
        }
        else{
            // console.log(j);
            // console.log(typeof(total_sleep));
            if (total_sleep==5) {
                date_.style.background="#fcd403";
            };
            if(total_sleep==6){
                date_.style.background="#03fe86";
            }
            if(total_sleep>=7){
                date_.style.background="#ff512f";
            }
        }
}}

// Functoion get Month
function set_month() {
    var last_date=get_month_last_date(year,month);
    var year_month_str=year.toString()+" "+month.toString();
    var empty_date=get_first_day(year_month_str);
    var sunday_date=7-empty_date;
    var month_name=document.getElementById("month_name");
    month_name.innerHTML=monthNames[month-1];
    var first_sunday=1+sunday_date;
    
    // Load localstorage sleep data
    var schedule=JSON.parse(localStorage.getItem("sleep_status"));

    // Todays Date
    // var today_date=date.getDate();


    // Get month container
    var mon_box=document.getElementById("month_container");
    if(empty_date>0){
        for(var i=1;i<=empty_date;i++){
            mon_box.innerHTML+="<div class='month_items'></div>";
        }
    }
    // Dynamicaaly show dates
    for(var j=1;j<=last_date;j++){

        // Highlight today date 
        if (today_date==j) {
            if(first_sunday==j){
                mon_box.innerHTML+="<div class='month_items  date active_date sun_date' onclick='show_sleep_schedule(this)'>"+j+"</div>";
                first_sunday+=7;
            }
            else{
                mon_box.innerHTML+="<div class='month_items  date active_date' onclick='show_sleep_schedule(this)'>"+j+"</div>";
            }
           
        }
        // Else print normal
        else{
            if(first_sunday==j){
                mon_box.innerHTML+="<div class='month_items  date sun_date' onclick='show_sleep_schedule(this)'>"+j+"</div>";
                first_sunday+=7;
            }
            else{
                mon_box.innerHTML+="<div class='month_items date' onclick='show_sleep_schedule(this)'>"+j+"</div>";
            }
            
        }
    }
    highlight_date_bg(schedule);

    // Updating the last  month sleep status

    if(last_date==today_date){

        last_month_avg_l_h=Average_Sleep(schedule,last_date);
        last_month_sleep_status["Avg_Sleep"]=last_month_avg_l_h["1"];
        last_month_sleep_status["L_Sleep"]=last_month_avg_l_h["2"];
        last_month_sleep_status["H_Sleep"]=last_month_avg_l_h["3"];
        // console.log(last_month_sleep_status);
        localStorage.setItem("last_month_sleep_status",JSON.stringify(last_month_sleep_status));
        // location.reload();
    }

    }
// Close stats
function close_(stat_id,blur) {
    var stat_container=document.getElementById(stat_id);
    var blur_bg=document.getElementById(blur);
    // console.log(stat_container);

    // Display none
    stat_container.style.display="none";
    blur_bg.style.display="none";
}
// Show stats
function show_stat(stat_id,blur) {
    var stat_container=document.getElementById(stat_id);
    var blur_bg=document.getElementById(blur);
    // console.log(stat_container);

    // Display none
    stat_container.style.display="inline-block";
    blur_bg.style.display="block";
}

// Relload Function
// function reload() {
//     location.reload();
// }


// Clear Local
function clear_local(){
    localStorage.removeItem('sleep_status');
    location.reload();
}

// Last month sleep status update here
function last_month_status_update(l_month) {
    var l_month_slp=document.getElementById("l_month_stat");
    var avg_sleep=last_month_sleep_status["Avg_Sleep"];
    var l_sleep=last_month_sleep_status["L_Sleep"];
    var h_sleep=last_month_sleep_status["H_Sleep"];
    l_month_slp.innerHTML=`
        <div class="month" id="month_name">${monthNames[l_month-1]}</div>
        <div class="close" onclick="close_('l_month_stat','blurry_bg')">X</div>
        <div class="l_month_info">
            <h4>Average Sleep <span id="l_month_avg_slp">${avg_sleep}</span></h4>
            <h5>Lowest Sleep <span id="l_month_l_slp">${l_sleep}</span></h5>
            <h5>Highest Sleep <span id="l_month_h_slp">${h_sleep}</span></h5>
        </div>
        <footer>you see <i>last month states</i></footer>
    `;
//         One time
        localStorage.setItem("last_month_sleep_status",JSON.stringify(last_month_sleep_status));
        
}
// Function to show the update transaction 
function show_form(ele){
    document.getElementsByClassName(ele)[0].style.display="flex";
}
function hide_form(ele) {
    document.getElementsByClassName(ele)[0].style.display="none";
}

// Add transaction and update localstorage
function update_transaction_localstorage() {
    var balance_show=document.getElementById("money_amt");    
    var balance_amt=balance_show.innerHTML;
    var date= new Date().toLocaleDateString();
    var amount=document.getElementById("amount").value;
    var details=document.getElementById("detail").value;
    var balance_=parseInt(balance_amt.split(" ")[0])+parseInt(amount);
    console.log(amount);
    console.log(details);
    if (localStorage.getItem("Transaction")==null) {   
        // console.log(temp);
        localStorage.setItem("Transaction",JSON.stringify(transaction_list));
    }
    if (localStorage.getItem("Balance")==null) {   
        // console.log(temp);
        localStorage.setItem("Balance",balance_amt);
    }
    var transaction_record=JSON.parse(localStorage.getItem("Transaction"));
    var update_transaction={
        "date":`${date}`,
        "detail":`${details}`,
        "amount":`${amount}Rs`
    }
    if(amount!=null && details!=null){
        transaction_record.push(update_transaction);
        balance_show.innerHTML=`${balance_} Rs`;
        // var balance_amt=balance_show.innerHTML;
        localStorage.setItem("Balance",`${balance_} Rs`);
    }
    // show_transaction();
    localStorage.setItem("Transaction",JSON.stringify(transaction_record));
}

// update balance
function update_balance() {
    var balance_show=document.getElementById("money_amt"); 
    if (localStorage.getItem("Balance")==null) {   
        // console.log(temp);
        localStorage.setItem("Balance","0 Rs");
    }
    balance_show.innerHTML=localStorage.getItem("Balance");
}


// Calling the function
// If date is equal to 1
if(today_date==1){ localstorage_update();
}
select_nav(0);
Activate_btn();
set_month();
// for(var i=0;i<31;i++){
//     if(i<10){
//         Update_stats(i+1,"5:30",true);
//     }
//     else{
//         Update_stats(i+1,"5:00",true);
//     }    
// }
// Getting the active_date element
var active_date_ele=document.querySelector(".active_date");
show_sleep_schedule(active_date_ele);

last_month_status_update(month-1);

update_balance();
// Update_stats(14,"22:00",false);
