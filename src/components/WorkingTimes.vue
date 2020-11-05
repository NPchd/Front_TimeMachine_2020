/* eslint-disable */
<template>
	<div id="calendar">
		<datetime type="datetime" id="beginslot" v-model="begin" format="yyyy-MM-dd HH:mm:ss">
		<label for="startDate" slot="before">Start Date</label>
		</datetime>
		<datetime type="datetime" id="endslot" v-model="end" format="yyyy-MM-dd HH:mm:ss">
		<label for="endDate" slot="after">End Date</label>
		</datetime>
		<button @click="getWorkingTimes({begin, end})">Retrieve times</button>
	</div>
</template>

<script>
	import moment from 'moment'
	import axios from 'axios'
	import {Datetime} from 'vue-datetime'
	const SERVER_URL = 'http://localhost:4000/';


	const diff_hours = 'hours' ; 
	const diff_minutes= 'minutes' ; 
	export default {
	name: 'workingtimes',
	props: {
	},
	data() {
			this.userId = null;
			this.workingTimes = null;
			return {
				begin: '',
				end: '',
				dates: "2013-10-10",
			}
	},
	components: {
		datetime: Datetime
	},
		methods: {
			getWorkingTimes(args) {
				var utc_begin_date = moment.utc(args.begin).format();
				var utc_end_date = moment.utc(args.end).format();
				var start_time_arg = 'startTime=' + utc_begin_date + '&';
				var end_time_arg = 'endTime=' + utc_end_date;
				var id = this.$route.params.userId;
				if(id === undefined)
					id = null;
				var URL = SERVER_URL + 'api/workingtimes/' + id + '?' + start_time_arg + end_time_arg;
				axios.get(URL).then(response => {
					this.workingTimes = this.processData(response.data.data);

					this.$emit("workingTimesArray", this.workingTimes);
					this.$router.push({name:'dashboard', params:{userId:id}})
					.catch(error => {
						if(error.name != 'NavigationDuplicated')
							throw error;
					});
				})
				.catch(error => {
					console.log(error);
				})
			},

			processData(args){
				var date_array_end = [];
				var date_array_begin = [];
				var date_array_diff = [];
			
				console.log(args); 
				var total_work = {
					date:[], 
					work:[], 

				};
				for(let x of args){
					var index = total_work.date.indexOf(moment(x.attributes.startTime).format('YYYY-MM-DD')); 
					var startTime = moment(x.attributes.startTime);
					var endTime = moment(x.attributes.endTime); 
					var diff = endTime.diff(startTime , diff_hours) ; 
					if(index === -1){
						total_work.date.push(startTime.format('YYYY-MM-DD')) ; 
						total_work.work.push(diff); 
					}
					else{
						total_work.work[index] += diff ; 

					}
				}

				var sorted = this.sortWorkTime(total_work.date , total_work.work); 
				return {date_begin : sorted.sorted_date , date_diff:sorted.sorted_work};
			},


			
			sortWorkTime(date , work){
				var isSorted = function(arr){
					for(var i = 0 ; i < arr.length - 1 ; i++){
						if(moment(arr[i]).isAfter(moment(arr[i+1]))) 
							return false ; 
					}
					return true ; 

				}; 

				while(!isSorted(date)){
					for(var i = 0 ; i < date.length-1 ; i++){
						 if(moment(date[i]).isAfter(moment(date[i+1]))) {
							var after_date = date[i] ;
							date[i] = date[i+1] ; 
							date[i+1] = after_date; 
							
							var after_work = work[i] ; 
							work[i] = work[i+1] ; 
							work[i+1] = after_work ; 

						 }

					}
				}
				return {sorted_date: date , sorted_work : work} ; 

			},
	},
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	.beginslot {
		position: absolute;
		margin-right: 30%;
		background-color: red;
	}
	.endslot {
		position: absolute;
		margin-left: 30%;
		color: red;
	}
	button {
		background-color:red; 
	}
	h3 {
	  margin: 40px 0 0;
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
