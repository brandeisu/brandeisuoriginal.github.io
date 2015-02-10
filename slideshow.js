// Outside of transition, images are hidden as overflow. Arrows can stimulate pic change.
// During transition, next image appears at left and slides right, current image slides right.

var pix=document.getElementById("slideshow_box").getElementsByClassName("slide_pic");
var imgIndex=0;
var nextIndex=1;
// itr:510->0
// next:510->0,img:0->-510 normal
// next:-510->0,img:0->510 reverse
var dir=1;
var itr,ongoingTimeout;


// INITIAL
ongoingTimeout=setTimeout(plantNext,6000);

function plantNext(){
	itr=dir*510;// goes to 0
	ongoingTimeout=setTimeout(inc,10);
}

function inc(){// recursion or return to plantNext
	itr+=dir*-17;
	pix[nextIndex].style.left=itr+"px";
	pix[imgIndex].style.left=(itr+dir*-510)+"px";
	if(itr*dir>0){
		ongoingTimeout=setTimeout(inc,10);
	}else{
		// manual correction
		pix[imgIndex].style.left=dir*-510+"px";
		pix[nextIndex].style.left="0px";
		// increment indices		
		imgIndex=nextIndex;
		nextIndex=(nextIndex+1)%pix.length;
		dir=1;
		ongoingTimeout=setTimeout(plantNext,6000);
	}
}

function force(arrow){
	if(pix[imgIndex].style.left!="0px"){// ensure slide not in progress
		return;
	}

	clearTimeout(ongoingTimeout);
	if(arrow=="left"){// transition reverse
		dir=-1;
		nextIndex=(imgIndex-1+pix.length)%pix.length;
		console.log("Goin' left!");
	}else if(arrow=="right"){// transition normal
		console.log("Goin' right!");
	}
	plantNext();
}

