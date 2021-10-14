// Global Variables
var win_width=innerWidth;

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
    document.querySelectorAll("#container_item")[0].classList.remove('active');
    document.querySelectorAll("#container_item")[1].classList.remove('active');
    // document.querySelectorAll("#container_item")[2].classList.remove('active');

    var nav_selection=document.querySelectorAll('input')[i].value;
    
    if(nav_selection=="curr_habits") {
        document.querySelectorAll("#container_item")[0].classList.add('active');
    }
    // if(nav_selection=="add_habit"){
    //     document.querySelectorAll("#container_item")[1].classList.add('active');
    // }
    if(nav_selection=="feat"){
        document.querySelectorAll("#container_item")[1].classList.add('active');
    }
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
        
        console.log(dif);
        var hour_slept=parseInt(dif);
        var minute_slept=parseInt((dif-parseInt(dif))*60);

        // For adding 0 before the minute if less than 0 Like 09 08 07....
        if (minute_slept<10){
            minute_slept="0"+minute_slept;
        }
        var slept_time=hour_slept+":"+minute_slept
        console.log(slept_time);

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
            console.log("I am in");
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
    console.log(sleep_stat);
    var total_sleep=sleep_stat[1];
    var sleep_health=sleep_stat[0];
    console.log(`I slept ${schedule[date_selected-1][1]} on date ${date_selected}`);
    // Selecting the doiv to shoe the sleep hour of particular date
    var sleep_stat_show=document.getElementById("sleep_hour");
    sleep_stat_show.innerHTML=`        
        <h5>${date_selected==today_date?'Todays Sleep Cycle': `My Sleep Schedule On Date <span class="date">${date_selected}/${month}/${year}</span>`}</h5>
        <p>Waking Time <span class="special">${schedule_date[0]}</span></p>
        <p>Sleeping Time <span class="special">${schedule_date[1]}</span></p>
        <h3>Total Sleep ${total_sleep}</h3>
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
            // console.log(true);
            date_.style.background="rgba(0, 0, 0, 0.026)";
        }
        else{
            console.log(j);
            console.log(typeof(total_sleep));
            if (6>total_sleep>=5) {
                date_.style.background="greenyellow";
            };
            if(7>total_sleep || total_sleep>=6){
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


    }
// Close stats
function close_(stat_id,blur) {
    var stat_container=document.getElementById(stat_id);
    var blur_bg=document.getElementById(blur);
    console.log(stat_container);

    // Display none
    stat_container.style.display="none";
    blur_bg.style.display="none";
}
// Show stats
function show_stat(stat_id,blur) {
    var stat_container=document.getElementById(stat_id);
    var blur_bg=document.getElementById(blur);
    console.log(stat_container);

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



// Calling the function
// If date is equal to 1
if(today_date==1){ localstorage_update();}
select_nav(0);
Activate_btn();
set_month();

// Getting the active_date element
var active_date_ele=document.querySelector(".active_date");
show_sleep_schedule(active_date_ele);



// Update_stats(1,"5:30",true);
// Update_stats(31,"22:00",false);