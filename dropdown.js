/* Prakhar Sahay 01/26/2015

This is used on every page to add the HTML and event listeners for the dropdown menu.
*/

// First, add the dropdown. Previously implemented through PHP.
var php='<div id="blue_strip">'+
	'<img id="blue_img" src="res/blue_text.png" width="150" onclick="location.href=\'html/index.html\'">'+
	'<span id="blue_text" onclick="location.href=\'html/index.html\'">Student Union</span>'+
	'<div id="menu_strip">'+
	'	<div class="menu_tab" data-num="0" onclick="location.href=\'html/meet_the_team/index.html\'">MEET THE TEAM</div>'+
	'	<div class="menu_tab" data-num="1" onclick="location.href=\'html/club_support/index.html\'">CLUB SUPPORT</div>'+
	'	<div class="menu_tab" data-num="2" onclick="location.href=\'html/senate/index.html\'">SENATE</div>'+
	'	<div class="menu_tab" data-num="3" onclick="location.href=\'html/transportation/index.html\'">TRANSPORTATION</div>'+
	'	<!--<div class="menu_tab" data-num="4" onclick="location.href=\'html/resources/index.html\'">RESOURCES</div>'+
	'	<div class="menu_tab" data-num="5" onclick="location.href=\'html/events/index.html\'">EVENTS</div>-->'+
	'	<!--<div class="green_tab" onclick="location.href=\'html/committees/index.html\'">COMMITTEES</div>-->'+
	'</div>'+
	'<div class="horiz_margin" style="position:absolute;top:80px;width:1020px"></div>'+
'</div>';
document.getElementsByTagName("body")[0].innerHTML=php;


var menu_strip=document.getElementById("menu_strip");
var tabs=menu_strip.getElementsByClassName("menu_tab");
var dropdowns=menu_strip.getElementsByClassName("green_dropdown");
var NUM_TABS=tabs.length;

// Produce and append dropdowns
(function(){
	var labels=[
		["Union Branches","Graphical Network"],// meet the team
		["Allocations","Treasury","Creating a Club"],// club support
		[/*"COW-G",*/"Dining","Club Support","Services & Outreach",
			/*"SJ and Diversity","Sustainability","Ways and Means"*/],// senate
		// mitchell,margolin,herbstritt,michalos
		// marla,anna,brian
		["Boston/Cambridge","Riverside T-station","Turkey"],// transportation
		// ["Forms","Constitution"],// resources
		// ["Calendar","DeisDay","DeisImpact"]// events
		// ceef
	];
	var label_folders=[
		"meet_the_team","club_support","senate","transportation"//,"resources","events"
	];
	var label_hrefs=[
		["branches","network","deans"],
		["allocations","treasury","club_support_comm"],
		[/*"cowg",*/"dining","club_support","services_and_outreach",
			/*"sj_and_diversity","sustainability","ways_and_means"*/],
		["boston_cambridge","riverside","turkey"]
		// ["forms","constitution"],
		// ["calendar","deisday","deisimpact"]
	];

	var label_widths=[161,143,170,175,126,96];
	var dd_template=document.createElement("div");
	dd_template.className="green_dropdown";

	for(var f1=0;f1<labels.length;f1++){// for each dropdown menu
		var new_dd=dd_template.cloneNode();
		new_dd.style.width=label_widths[f1];
		new_dd.style.left=tabs[f1].offsetLeft+"px";
		new_dd.style.overflow="auto";
		new_dd.dataset.num=f1;

		for(var f2=0;f2<labels[f1].length;f2++){// for each menu option
			var new_span=document.createElement("span");
			new_span.textContent=labels[f1][f2];
			new_span.dataset.href=label_folders[f1]+"/"+label_hrefs[f1][f2];
			new_span.className="green_label";
			new_span.style.paddingLeft="15px";
			new_span.addEventListener("click",function(){location.href="html/"+this.dataset.href+".html"});
			new_dd.appendChild(new_span);
		}

		//new_dd.style.width=new_dd.scrollWidth;
		new_dd.style.display="none";

		menu_strip.appendChild(new_dd);
		tabs[f1].addEventListener("mouseover",overTab);
		tabs[f1].addEventListener("mouseout",outOfTab);
		new_dd.addEventListener("mouseover",overDropDown);
		new_dd.addEventListener("mouseout",outOfDropDown);
	}
	collapseAll();
})();

// display menu
function overTab(ev){
	var index=parseInt(ev.target.dataset.num,10);
	var menu=menu_strip.children[index+NUM_TABS];
	collapseAll();
	menu.style.display="block";
	// ev.target.style.backgroundColor="rgba(2,64,116,0.25)";
	ev.target.style.color="#FFF";
}
// hide menu if from top or sides
function outOfTab(ev){
	var left_space=ev.target.offsetLeft+180+(window.innerWidth-1020)/2;
	if(ev.x>=left_space && ev.x<=left_space+ev.target.offsetWidth && ev.y>=80){
		// exited from bottom, so quit
		return;
	}
	if(ev.pageX>=left_space && ev.pageX<=left_space+ev.target.offsetWidth && ev.pageY>=80){
		// exited from bottom, so quit
		return;
	}
	// console.log("Not the bottom!");
	var index=parseInt(ev.target.dataset.num,10);
	collapseAll();
	ev.target.style.color="#CCC";
}
// display menu
function overDropDown(ev){
	ev.target.style.display="block";
	var index=parseInt(ev.target.parentNode.dataset.num,10);
	var tab=menu_strip.children[index];
	tab.style.color="#FFF";
}
// hide menu if from bottom or sides
function outOfDropDown(ev){
	var left_space=ev.target.parentNode.offsetLeft+180+(window.innerWidth-1020)/2;
	if(ev.x>=left_space && ev.x<=left_space+ev.target.offsetWidth && ev.y<=80+ev.target.parentNode.offsetHeight){
		// exited from top, so quit
		return;
	}
	if(ev.pageX>=left_space && ev.pageX<=left_space+ev.target.offsetWidth && ev.pageY<=80+ev.target.parentNode.offsetHeight){
		// exited from top, so quit
		return;
	}
	collapseAll();
	var index=parseInt(ev.target.parentNode.dataset.num,10);
	var tab=menu_strip.children[index];
	tab.style.color="#CCC";
}


// fix for overTab, safeguard for outOfTab and outOfDropDown
function collapseAll(){
	for(var i=0;i<NUM_TABS;i++){
		dropdowns[i].style.display="none";
		tabs[i].style.color="#CCC";// inactive
	}
}