/* Prakhar Sahay 01/18/2015

Use node_heap[] and edge_heap[] to produce the graphical map on network.html.
Position nodes over the SVG of edges.
*/

var content=document.getElementById("content_body");
// var offset=getOffset(content);
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
	this.element.style.left=x-54;
	this.element.style.top=y-54;
	content.appendChild(this.element);
}
function TNetNode(txt,x,y){// text net node
	this.element=document.createElement("div");
	// this.element.title=this.name=name;
	this.element.className="net_node";
	this.element.style.textAlign="center";
	this.element.style.lineHeight="100px";
	this.element.style.backgroundColor="rgb(191,207,220)";
	this.element.textContent=txt;

	this.element.style.left=x-54;
	this.element.style.top=y-54;
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
	// new PNetNode("Brian Dorfman","Dorfman.jpg",-10,0,0,0),
	// new PNetNode("Gali Gordon","Gordon.png",-120,-55,0,0),
	// new PNetNode("Leah Newman","Newman.png",-60,-25,0,0),






var node_heap=[
	new TNetNode("E-board",485,230),
	new TNetNode("Senate",485,505),
	new TNetNode("A-board",210,205),
	new TNetNode("Residential",285,740),
	new TNetNode("Year",760,755),
	new PNetNode("Mitchell Beers","Beers.jpg",-25,-5,175,595),
	new PNetNode("Ari Ben-Elazar","BenElazar.jpg",-35,-10,85,165),
	new PNetNode("Anna Bessendorf","Bessendorf.jpg",-100,-45,870,605),
	new PNetNode("Dor Cohen","Cohen.jpg",-25,0,85,680),
	new PNetNode("Emily Conrad","Conrad.jpg",-5,-10,685,305),
	new PNetNode("Lorenzo Finamore","Finamore.jpg",-5,-15,195,905),
	new PNetNode("Brittany Finney","Finney.jpeg",-215,-25,895,835),
	new PNetNode("Charlotte Franco","Franco.jpg",-80,-25,780,380),
	new PNetNode("Skye Golann","Golann.jpg",-22,-20,785,910),
	new PNetNode("David Heaton","Heaton.jpg",-120,-50,945,265),
	new PNetNode("David Herbstritt","Herbstritt.jpg",-25,-15,295,575),
	new PNetNode("Brian Hough","Hough.jpg",-50,-5,485,365),
	new PNetNode("Meher Irani","Irani.png",-15,-20,935,715),
	new PNetNode("Helen Lee","Lee.jpg",-53,-33,850,195),
	new PNetNode("Xinyu (Annie) Li","Li.jpg",-270,-90,225,85),
	new PNetNode("Ben Margolin","Margolin.jpg",-43,-5,675,845),
	new PNetNode("Ruth Messele","Messele.jpg",-60,-10,640,455),
	new PNetNode("Mary Michalos","Michalos.png",0,-80,445,855),
	new PNetNode("Andrew Miller","Miller.jpg",-120,-25,360,185),
	new PNetNode("Judy Nam","Nam.jpg",-8,-2,115,305),
	new PNetNode("Lauren Phillips","Phillips.jpg",-40,0,320,905),
	new PNetNode("Prakhar Sahay","Sahay.jpg",-25,-75,625,125),
	new PNetNode("Kira Setren","Setren.jpg",0,-5,100,810),
	new PNetNode("Mohamed Sidique","Sidique.jpg",-80,-55,745,135),
	new PNetNode("Sneha Walia","Walia.jpg",-140,-70,485,80),
	new PNetNode("Luxi Wen","Wen.jpg",-10,0,625,745),
	new PNetNode("Millie Wu","Wu.jpg",-46,-31,295,305),
	new PNetNode("Shukai Zhang","Zhang.jpg",-20,-10,895,415),
	new PNetNode("Alison (Caiwei) Zheng","Zheng.jpg",-20,0,755,580)
];

var edges_heap=[
	[0,9,12,14,16,18,23,26,28,29,32],// eboard
	[1,3,4,16,21],// senate
	[2,6,19,23,24,31],// aboard
	[3,5,8,10,15,22,25,27,31],// residential
	[4,7,11,13,17,20,30,33]// year
];

function drawEdge(a,b){
	var node_a=node_heap[a].element;
	// console.log(node_a);
	var node_b=node_heap[b].element;
	// console.log(b);
	// console.log(node_a);

	// node coordinates rel to (50,50) on content, (40,40) on canvas
	// subtract 10 for #content padding
	x1=parseInt(node_a.style.left,10)+46;
	y1=parseInt(node_a.style.top,10)+46;
	x2=parseInt(node_b.style.left,10)+46;
	y2=parseInt(node_b.style.top,10)+46;
	ctx.beginPath();
	ctx.moveTo(x1,y1);
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
