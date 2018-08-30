
//apply a 20ms linear fadein/out to the buffer given in the argument to a js object in Max
//Ian Stevenson 30-08-2018

var buff = new Buffer(jsarguments[1]);
var ramp=[882];

for (var i=0; i<882; i++){
	ramp[i]=1/882*i; //generate 0-1 ramp over 882 samples
}
	

function bang(){
	var top=[882];
	var tail=[882];
	
	for (var i=1; i<=buff.channelcount(); i++) {
	//peek/poke args: channel [int], frame [int], count [int] 			
		top = buff.peek(i, 0, 882);
		tail = buff.peek(i, buff.framecount()-882, 882);
		for (var n=0; n<882; n++){
			top[n]=top[n]*ramp[n];
			tail[882-n]=tail[882-n]*ramp[n];
		}
		buff.poke(i, 0, top);
		buff.poke(i, buff.framecount()-882, tail);
	}
	post("ramp in/out applied to buffer:" +  jsarguments[1]);
}
			
			
			

		
