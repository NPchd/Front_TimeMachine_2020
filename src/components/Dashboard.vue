/* eslint-disable */
<template>
	<div class="dashboard">
		<div class="barchart">
			<bar :width="800" :height="400" :chart-data="datacollection" ref="barchartref"></bar>
		<b-button @click="updateScalePlus" id="plus">Increase Scale</b-button>
		<b-button @click="updateScaleMinus" id="minus">Decrease Scale</b-button>
		</div>
		<workingtimes @workingTimesArray="updateChart" id="workingtimes"/>
	</div>
</template>

<script>
	import axios from 'axios'
	import moment from 'moment'
	import workingtimes from './WorkingTimes.vue'
	import pointer from './Pointer.vue'
	import bar from './Bar.vue'

	const SERVER_URL = 'http://localhost:8080/' ;

	export default {
	  name: 'dashboard',
	  components: {
			bar,
			workingtimes,
			pointer,
	  },
		props: {
		},

	  data() {
			return {
				datacollection : {
					labels:[],
					datasets:[]
				},
			}
		},

		mounted() {
			this.update([]);
		},

	  methods: {
			update(args){
				this.datacollection = {
					labels: args.date,
					datasets: [
					{
						label:'Working time',
						backgroundColor:'#900300',
						data:args.hours
					}]
				}
				console.log(this.datacollection);
			},

			updateChart(args) {
				this.update(args);
			},

			updateScalePlus() {
				this.$refs.barchartref.scalePlus();
				this.$refs.linechartref.scalePlus();
			},

			updateScaleMinus() {
				this.$refs.barchartref.scaleMinus();
				this.$refs.linechartref.scaleMinus();
			}
	  },
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	.button-change-chart {
		position: relative;
		right: 60%;
		bottom: 100px;
	}
	.userview {
		position: relative;
		left: 40%;
		bottom: 500px;
	}
	.barchart {
		position: relative;
		bottom: 20%;
		left: 20%;
		width:min-content ;
		margin:5%;
	}
	.linechart {
		position: absolute;
		width: min-content;
	}
	.navbutton{
		position:relative ;
		top:100px;

	}
	button {
		background-color:rgb(19, 112, 112);
	}
</style>
