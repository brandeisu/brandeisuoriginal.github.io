/* Prakhar Sahay 01/18/2015

Use node_heap[] and edge_heap[] to produce the graphical map on network.html.
Position nodes over the SVG of edges.
*/

var content=document.getElementById("content_body");
var offset=getOffset(content);
var canvas=document.getElementById("canvas");
var ctx=canvas.getContext('2d');
// console.log(offset);


function PNetNode(name,img_name,picX,picY,x,y){// person net node
	// picX and picY slide background image as appropriate
	this.element=document.createElement("div");
	this.element.title=this.name=name;
	this.element.className="net_node";
	this.element.style.backgroundImage="url('res/members/"+img_name+"')";

	this.element.style.backgroundPosition=(picX||0)+"px "+(picY||0)+"px";
	this.element.style.left=x-70;
	this.element.style.top=y-50;
	content.appendChild(this.element);
}
function TNetNode(txt,x,y){// text net node
	this.element=document.createElement("div");
	// this.element.title=this.name=name;
	this.element.className="net_node";
	this.element.style.textAlign="center";
	this.element.style.lineHeight="100px";
	this.element.textContent=txt;

	this.element.style.left=x-70;
	this.element.style.top=y-50;
	content.appendChild(this.element);
}


function getOffset(elem){
	var offset=elem.offsetLeft;
	while(elem.offsetParent!=null){
		elem=elem.offsetParent;
		offset+=elem.offsetLeft;

	}
	return offset;
}


var node_heap=[
	new TNetNode("E-board",500,225),
	new TNetNode("Senate",500,500),
	new TNetNode("A-board",225,200),
	new TNetNode("Residential",300,735),
	new TNetNode("Year",775,750),
	new PNetNode("Mitchell Beers","Beers.jpg",-25,-5,190,590),
	new PNetNode("Ari Ben-Elazar","BenElazar.jpg",-35,-10,100,160),
	new PNetNode("Anna Bessendorf","Bessendorf.jpg",-100,-45,885,600),
	new PNetNode("Dor Cohen","Cohen.jpg",-25,0,100,675),
	new PNetNode("Emily Conrad","Conrad.jpg",-5,-10,700,300),	// new PNetNode("Brian Dorfman","Dorfman.jpg",-10,0,0,0),
	new PNetNode("Lorenzo Finamore","Finamore.jpg",-5,-15,210,900),
	new PNetNode("Brittany Finney","Finney.jpeg",-215,-25,910,830),
	new PNetNode("Charlotte Franco","Franco.jpg",-80,-25,795,375),
	new PNetNode("Skye Golann","Golann.jpg",-22,-20,800,905),	// new PNetNode("Gali Gordon","Gordon.png",-120,-55,0,0),
	new PNetNode("David Heaton","Heaton.jpg",-120,-50,960,260),
	new PNetNode("David Herbstritt","Herbstritt.jpg",-25,-15,310,570),
	new PNetNode("Brian Hough","Hough.jpg",-50,-5,500,360),
	new PNetNode("Meher Irani","Irani.png",-15,-20,950,710),
	new PNetNode("Helen Lee","Lee.jpg",-53,-33,865,190),
	new PNetNode("Xinyu (Annie) Li","Li.jpg",-270,-90,240,80),
	new PNetNode("Ben Margolin","Margolin.jpg",-43,-5,690,840),
	new PNetNode("Ruth Messele","Messele.jpg",-60,-10,655,450),
	new PNetNode("Mary Michalos","Michalos.png",0,-80,460,850),
	new PNetNode("Andrew Miller","Miller.jpg",-120,-25,375,180),
	new PNetNode("Judy Nam","Nam.jpg",-8,-2,130,300),	// new PNetNode("Leah Newman","Newman.png",-60,-25,0,0),
	new PNetNode("Lauren Phillips","Phillips.jpg",-40,0,335,900),
	new PNetNode("Prakhar Sahay","Sahay.jpg",-25,-75,640,120),
	new PNetNode("Kira Setren","Setren.jpg",0,-5,115,805),
	new PNetNode("Mohamed Sidique","Sidique.jpg",-80,-55,760,130),
	new PNetNode("Sneha Walia","Walia.jpg",-140,-70,500,75),
	new PNetNode("Luxi Wen","Wen.jpg",-10,0,640,740),
	new PNetNode("Millie Wu","Wu.jpg",-46,-31,310,300),
	new PNetNode("Shukai Zhang","Zhang.jpg",-20,-10,910,410),
	new PNetNode("Caiwei (Alison) Zheng","Zheng.jpg",-20,0,770,575)
];

var edges_heap=[
	[0,32,25],// eboard
	[2,25,21,34],// aboard
];

function drawEdge(a,b){
	var node_a=node_heap[a].element;
	console.log(a);
	var node_b=node_heap[b].element;
	console.log(b);
	// console.log(node_a);

	x1=parseInt(node_a.style.left,10);
	y1=parseInt(node_a.style.top,10);
	x2=parseInt(node_b.style.left,10);
	y2=parseInt(node_b.style.top,10);
	ctx.beginPath();
	ctx.moveTo(x1,x2);
	ctx.lineTo(x2,y2);
	ctx.stroke();
}
function visitEdges(){// called after node_heap[] and edges_heap[] init
	// call drawEdge on everything
	for(var i in edges_heap){
		for(var j=1;j<edges_heap[i].length;j++){
			// console.log(edges_heap[][]);
			drawEdge(edges_heap[i][0],edges_heap[i][j]);
		}
	}
}

document.onload=visitEdges();
