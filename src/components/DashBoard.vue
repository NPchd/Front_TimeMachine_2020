<template>
<div class="dashBoard">
  

	<div class="linechart">
		<lineC :width="200" :height="200" ref="linechartref" :chart-data="datacollection" ></lineC>
	</div>	
	<div class="barchart">
		<bar :width="800" :height="400" :chart-data="datacollection" ref="barchartref" v-if="selectedChartBar === true"></bar> 
	<button @click="updateScalePlus" id="plus">Increase Scale </button>
	<button @click="updateScaleMinus" id="minus" >Decrease Scale </button>
	</div>
	<pointer class="pointer"/>
	<workingtimes @workingTimesArray="updateChart" id="workingtimes"/>
	<userView class="userview"/> 



</div>
</template>

<script>

import axios from 'axios'
import workingtimes from './WorkingTimes.vue'
import bar from './Bar.vue' 
import doughnut from './Doughnut.vue' 
import lineC from './Line.vue'

import moment from 'moment'
import userView from './UserView.vue'
import pointer from './Pointer.vue' 
const SERVER_URL = 'http://localhost:4000/' ; 

export default {
  name: 'dashboard',
 
  components:{
	bar,
	doughnut, 
	lineC, 
	workingtimes,
	userView,
	pointer,

  },

 props: {	

  },
  data(){
  	this.selectedChartBar = true ;
	this.selectedChartDoughnut = false ; 
	return {
		datacollection : { labels:[] , datasets:[]}  , 
	}

},
mounted(){
	this.update([]); 

},
 

  methods:{
  	update(args){
		var date_array_end = [] ; 
		var date_array_begin = [] ;
		var date_array_diff = [] ; 
		for(let x of args){
			const regx = /-/gi; 
			var x1 = x.attributes.startTime.replace(regx, '/') ;//change format from YYYY-MM-DD to YYYY/MM/DD  
			var x2 = x.attributes.endTime.replace(regx , '/') ; 
			var begin_temp = new Date(x.attributes.startTime) ; 
			var end_temp = new Date(x.attributes.endTime) ; 

			var ms = end_temp.getTime() - begin_temp.getTime(); 
			var d = moment.duration(ms); 
			var diff = Math.floor(d.asHours()) ;//+ moment.utc(ms).format(":mm:ss");
			if(d.asMinutes() >= 2){ // temps de travail supérieur a X min 
				date_array_end.push(moment(x.attributes.endTime).format('L'));
				date_array_begin.push(moment(x.attributes.startTime).format('L')) ; 
				date_array_diff.push(diff); 
				}
		}
	 	this.datacollection = {
			labels: date_array_begin , 
			datasets: [{
				label:'Working time', 
				backgroundColor:'#900300' , 
				data:date_array_diff
				}]};	
		console.log(this.datacollection); 
	},
	updateChart(args){
		this.update(args); 
	},

	changeChart(){
		if(this.selectedChartBar === true){
			this.selectedChartBar = false ;
			this.selectedChartDoughnut = true; 
			}
		else
			this.selectedChartBar = true ;
			this.selectedChartDoughnut = false ; 
	},
	updateScalePlus(){
		this.$refs.barchartref.scalePlus() ; 
		this.$refs.linechartref.scalePlus(); 
	},
	updateScaleMinus(){
		this.$refs.barchartref.scaleMinus();
		this.$refs.linechartref.scaleMinus(); 
	}

  }, 
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>


.button-change-chart{
	position:relative ; 
	right:60%;
	bottom:100px;
}


.userview{
	position: relative ; 
	left : 40%; 
	bottom : 500px ;

}

.pointer{
	position: relative ; 
	 top : 150px ; 
}
.barchart{
	position: relative;
	bottom: 20%; left: 20%;
}

.linechart{
	position: absolute ; 
	width:min-content;
	

}


button {
	background-color:red ; 

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
