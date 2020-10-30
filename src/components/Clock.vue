<template>
	<div id ="stopwatch">	
	{{formatElapsedTime}}
	</div>
	
</template>

<script>

import axios from 'axios' 

const SERVER_URL = 'http://localhost:4000/' ; 

export default {
  name: 'clock',

  props: {
  
  },
  data(){
	this.date = undefined; 
	this.dateFromPointer = undefined ; 
	this.timer = 0 ; 
return {
	elapsedTime:0 , 

 }
 
},


 computed:{
	formatElapsedTime(){
		if(this.dateFromPointer === undefined)
			this.date = new Date(null) ; 
		else
			this.date = this.dateFromPointer ;  
		this.date.setSeconds(this.elapsedTime/1000) ;	
		var milliseconds = this.elapsedTime ; 
	   	var day, hour, minute, seconds;
   		 seconds = Math.floor(milliseconds / 1000);
  		 minute = Math.floor(seconds / 60);
 		 seconds = seconds % 60;
   		 hour = Math.floor(minute / 60);
   		 minute = minute % 60;
    		 day = Math.floor(hour / 24);
  		 hour = hour % 24;
 		var format_sec = seconds < 10 ? '0'+seconds : seconds ; 
		var format_min = minute < 10 ? '0'+minute : minute ; 
		var format_hour = hour < 10 ? '0'+hour : hour ; 
		return format_hour+':'+format_min+':'+format_sec ; 	

		}
 },


  methods:{
  	startTimer(){
		if(this.dateFromPointer === undefined){
			this.elapsedTime = 0 ; 
			console.log('datefrompointer undefined') ; 
			}
		else{
			var presentDateMs = new Date().getTime() ; //time in MS 
			var clockDateMS = this.dateFromPointer.getTime(); 
			var diff = presentDateMs - clockDateMS ; 
			this.elapsedTime = diff ; 

		}
		if(this.timer === 0){
			this.timer = setInterval(() => {
				this.elapsedTime += 1000 ; 

			} , 1000) ; 
		}	
	},
	
	
	stopTimer(){
		clearInterval(this.timer) ; 
		this.elapsedTime=0 ;
		this.timer = 0 ;  
		this.dateFromPointer = undefined ; 
	},
	setDateFromPointer(date){
		this.dateFromPointer = date ; 


	}
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

#stopwatch{
	position: relative ; 
	 top : 5% ; 
}

ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
