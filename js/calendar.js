/* Prakhar Sahay 03/03/2015

Hover to select a year and month. All days with their events are loaded.
*/

var YEARS=[2015,2016];
var MONTHS=["Jan","Feb","Mar","Apr","May","June","July","Aug","Sep","Oct","Nov","Dec"];
var MONTH_DAYS=[31,28,31,30,31,30,30,31,30,31,30,31];
var CURRENT=getCurrent();
var ev_list=document.getElementById("ev_list");

var ys=document.getElementById("year_disp");
var yops=document.getElementById("year_ops");
ys.textContent=CURRENT.year;
var ms=document.getElementById("month_disp");
var mops=document.getElementById("month_ops");
ms.dataset.index=CURRENT.month-1;
ms.textContent=MONTHS[CURRENT.month-1];


Parse.initialize("Cuas22UcYNTKSp8cOsjdmo471TONYDzPvcVQEgET","W8Yl2X3sfDh9hg70tJOzqnXIt7dMKwCloQcrHqoh");
var Event=Parse.Object.extend("Event");
var query=new Parse.Query("Event");
var events;



// FUNCTION LIBRARY

function retrieve(month){
	query.ascending("day");
	if(month){
		query.equalTo("month",month);// search for "03/2015"
	}else{
		query.doesNotExist("bogus");// matches all events
	}
	query.find({
		success:function(res){
			events=res;
			console.log(month);
			console.log(events.length);
			listEvents(events);
		}
	});
}

function isLeapYear(y){
	return y%4==0 && (y%100!=0 || y%400==0);
}


// INITIALIZATION AUTOCALLS

for(var i=0;i<YEARS.length;i++){
	var next=document.createElement("div");
	next.className="date_option";
	next.textContent=YEARS[i];
	next.dataset.index=i;
	next.addEventListener("click",select);
	yops.appendChild(next);
}
for(var j=0;j<MONTHS.length;j++){
	var next=document.createElement("div");
	next.className="date_option";
	next.textContent=MONTHS[j];
	next.dataset.index=j;
	next.addEventListener("click",select);
	mops.appendChild(next);
}

function getCurrent(){
	var m=new Date().getMonth()+1;
	var y=new Date().getYear()+1900;
	return {month:m,year:y};
}

function toggleDisp(ops){
	if(ops.style.display=="inline-block"){
		ops.style.display="none";// if inline-block
	}else{
		ops.style.display="inline-block";// if null or none
	}
}

function select(ev){
	var index=ev.target.dataset.index;
	if(ev.target.parentNode.id=="year_ops"){
		ys.textContent=YEARS[index];
		ys.dataset.index=index;
	}else{
		ms.textContent=MONTHS[index];
		ms.dataset.index=index;
	}

	retrieve((parseInt(ms.dataset.index,10)+1)+"/"+ys.textContent);
}

function listEvents(events){
	if(events.length==0){
		ev_list.textContent="There are no events for this month";
		return;
	}
	var data_str="";
	for(var i=0;i<events.length;i++){
		data_str+=eventToString(events[i])+"\n";
	}
	ev_list.textContent=data_str;
}

function eventToString(ev){
	return ev.get("day")+"/"+ev.get("month")+ev.get("descrip");
}
ys.addEventListener("click",function(){toggleDisp(yops)});
ms.addEventListener("click",function(){toggleDisp(mops)});