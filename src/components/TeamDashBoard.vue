/* eslint-disable */
<template>
<div class="TeamDashBoard">
  

	<div class="linechart">
		<lineC :width="200" :height="200" ref="linechartref" :chart-data="datacollection" ></lineC>
	</div>	
	<div class="barchart">
		<bar :width="800" :height="400" :chart-data="datacollection" ref="barchartref" v-if="selectedChartBar === true"></bar> 
	<button @click="updateScalePlus" id="plus">Increase Scale </button>
	<button @click="updateScaleMinus" id="minus" >Decrease Scale </button>
	</div>
	<teamdisplay class="teamview" @workingTimesArray="updateChart" id="workingtimes"/>

</div>
</template>

<script>

import axios from 'axios'
import bar from './Bar.vue' 
import doughnut from './Doughnut.vue' 
import lineC from './Line.vue'
import teamdisplay from './TeamDisplay.vue' 
import moment from 'moment'
const SERVER_URL = 'http://localhost:8080/' ; 

export default {
  name: 'teamdashboard',
 
  components:{
	bar,
	doughnut, 
	lineC,
	teamdisplay

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
	
		
		console.log(args); 
		var temp_week = [] ; 
		for (let x of args.week) 
			temp_week.push(moment(x).format('YYYY-MM-DD')); 
		
		this.datacollection = {
			labels: temp_week , 
			datasets: [{
				label:'Total Working time', 
				backgroundColor:'#900300' , 
				data:args.total_work 
				}]};	
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


.teamview{
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
