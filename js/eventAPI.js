/* Prakhar Sahay 03/03/2015

Added functions for the event modification interface. (calendar.js dependency)
*/


// create(18,"09/2015","sure we'll do stuff")
function create(day,month,descrip){
	var EV=new Event();
	if(month[0]=="0"){// chop the leading 0
		month=month.substring(1);
	}
	EV.set("day",day);
	EV.set("month",month);
	EV.set("descrip",descrip);
	EV.save();
	return EV;
}

// update(EV,"day",31)
function update(EV,key,value){
	EV.set(key,value);
	EV.save();
}

function destroy(EV){
	EV.destroy();
}