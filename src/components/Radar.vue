
<script>

import {Line , mixins} from 'vue-chartjs'



export default {
 name: 'lineC',
 extends: Line , 
 type: Line , 
 props:[] ,
 mixins: [mixins.reactiveProp] ,
mounted(){
this.options = {
backgroundColor:'#009800',
responsive:false ,
scales:{
yAxes:[{
ticks:{
min:0 , 
max:100, 
stepSize:2 , 
callback: function(label , index , labels){
	return label+"H" ;

}
}

}] 
},
layout:{
	  padding:{
		left:1 , 
		right:0 , 
		bottom: 0 , 
		top : 0 , 
	  }
	}
 }	
	this.renderChart(this.data  ,this.options)


 },
 data(){

	return {
	}
	

 },




  methods:{
	onResize(chart , size){
		

	},
  }
}</script>

