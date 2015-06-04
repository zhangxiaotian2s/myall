CanvasRenderingContext2D.prototype.dashedLineTo = function (fromX, fromY, toX, toY, pattern) {
 // default interval distance -> 5px
 if (typeof pattern === "undefined") {
  pattern = 5;
 }
 // calculate the delta x and delta y
 var dx = (toX - fromX);
 var dy = (toY - fromY);
 var distance = Math.floor(Math.sqrt(dx*dx + dy*dy));
 var dashlineInteveral = (pattern <= 0) ? distance : (distance/pattern);
 var deltay = (dy/distance) * pattern;
 var deltax = (dx/distance) * pattern;
	
 // draw dash line
 this.beginPath();
 for(var dl=0; dl< dashlineInteveral; dl++) {
   if(dl%2) {
     this.lineTo(fromX + dl*deltax, fromY + dl*deltay);
   } else {    				 
     this.moveTo(fromX + dl*deltax, fromY + dl*deltay);    				
   }    			
 }
  this.stroke();
};
