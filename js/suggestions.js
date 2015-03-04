/* Prakhar Sahay 01/13/2015

This produces the suggestions. Clicking on a suggestion sends it out and loads the attributed page.
*/

var body=document.getElementsByTagName("body")[0];
body.style.overflow="hidden";

// text
var suggs=[
	"club leader? check out our new guides for funding",
	"get involved with dining initiatives!",
	"what days is the boston/cambridge shuttle running?",
	// "missed an email? see the events calendar",
	"who's in the Student Union?"
];
var targets=[
	"html/club_support/treasury.html",
	"html/senate/dining.html",
	"html/transportation/boston_cambridge.html",
	"html/meet_the_team/index.html"
];

function newImg(src){
	var elem=document.createElement("img");
	elem.src=src;
	elem.className=src[4]+"_arrow";// l_arrow or r_arrow
	return elem;
}
var l_arrow=newImg("res/left_arrow.svg");
var l_arrow_r=newImg("res/left_arrow.svg");// hover
var r_arrow=newImg("res/right_arrow.svg");
var r_arrow_r=newImg("res/right_arrow.svg");// hover


// generate suggestion divs
function generate(){
	var stack=document.getElementById("sugg_stack");
	stack.style.height=(200*suggs.height+40)+"px";

	for(var g=0;g<suggs.length;g++){
		var sugg=document.createElement("div");
		sugg.textContent=suggs[g];
		sugg.dataset.ind=g;
		if(g%2==0){//right
			sugg.appendChild(setListeners(r_arrow));
		}else{
			sugg.appendChild(setListeners(l_arrow));
		}
		sugg.className="suggestion";
		sugg.style.top=(g*85+20)+"px";
		stack.appendChild(sugg);
	}
}

// slide left or right, then load target
function slideOut(){
	var DELAY=25;
	var STEPS=10;
	var sugg=this.parentNode;
	var ind=sugg.dataset.ind;
	var offset=findOffset(sugg);// offset=63 -> slide to -63px
	offset+=50;
	console.log(offset);
	var i=0;
	setTimeout(slide,DELAY);
	var body=document.getElementsByTagName("body")[0];

	function slide(){
		i++;
		if(i>STEPS){
			// document.getElementsByTagName("body")[0].style.cursor="progress";
			location.href=targets[ind];
			return;
		}
		// body.style.opacity=1-i/STEPS/2;
		sugg.style.opacity=1-i/STEPS;
		if(ind%2==0){
			sugg.style.marginLeft=(i/STEPS*offset)+"px";
		}else{
			sugg.style.marginLeft=(-i/STEPS*offset)+"px";
		}
		setTimeout(slide,DELAY);
	}
}


function setListeners(elem){
	var elem=elem.cloneNode();
	elem.addEventListener("mouseover",goOrange);
	elem.addEventListener("mouseout",goGray);
	elem.addEventListener("click",slideOut);
	elem.addEventListener("touchstart",slideOut);

	return elem;
}
function goOrange(){
	var src=this.src;
	var ind=src.length-4;
	src=src.substring(0,ind)+"_r"+src.substring(ind);
	this.src=src;
}
function goGray(){
	var src=this.src;
	var ind=src.length-4;
	src=src.substring(0,ind-2)+src.substring(ind);
	this.src=src;
}

function findOffset(elem){
	var offset=elem.offsetLeft;
	while(elem.offsetParent!=null){
		elem=elem.offsetParent;
		offset+=elem.offsetLeft;
	}
	return offset;
}

generate();