/* eslint-disable */
<template>
<div class="teamDisplay">
	  
	<form id="selectTeams" >
		Team ID : <select id="displaylist" v-model="selectedTeamId" placeholder="select team">
			<option v-for="item in TeamsId" :value="item"> {{item}} </option>

		</select>

	</form>
	
<div id="calendar" >

<p> 
{{dateFormated}}     
</p>
<button @click="getPreviousWeek({selectedTeamId})"> Previous week </button>
<button @click="getNextWeek({selectedTeamId})"> Next week </button>

<button @click="getTeamStats({selectedTeamId})">Retrieve times</button>
</div>



</div>
</template>

<script>

import axios from 'axios'
import {Datetime} from 'vue-datetime' 
import moment from 'moment'
const SERVER_URL = 'http://localhost:8080/' ; 

export default {
name: 'teamdisplay',
 
components:{
	datetime:Datetime 
},




 props: {	

},

data(){
	this.displayTeamId =[] ;  
	this.usersOfTeams = [] ;
	this.teamWorkingTimeMean = null ; 
	this.teamWorkingTimeSum = null;
	var end_week = moment().format();
	this.endWeek = moment(end_week); 
	var begin_week = moment().subtract(7 , 'days'); 
	this.beginWeek = moment(begin_week); 
	this.weekDates = [];
	for(var x = 0 ; x < 7 ; x++){
		var y = moment(begin_week).add(x , 'days') ;
		this.weekDates.push(y) ;		
	}
	this.workingTimesArray = {
		weekDates:this.weekDates,
		worktime : [] 

	}; 


	return {
		TeamsId : this.displayTeamId , 
		TeamsUsers : this.usersOfTeams ,  
		selectedTeamId : 0 , 
		displayTeam : null , 
		dateFormated : this.beginWeek.format('YYYY-MM-DD') + '    -    ' + this.endWeek.format('YYYY-MM-DD') 
	}

},



mounted(){
		
	var URL = SERVER_URL + '/api/teams' ;
	var header = 'Authorization : ' ; 
	
	axios.get(URL).then((response) => {
			var teamsId = [] ; 
			for(let x of response.data.data){
				teamsId.push(x.id);
				this.displayTeamId.push(x.id); 
			}
			this.usersOfTeams = this.getUsersOfTeams(teamsId);

	},(error)=>{console.log(error);}); 



},
 

methods:{
	getUsersOfTeams(teamIdArray){ // retire toutes les informations des users dans une team
		var teams = [] ; 
		var header = 'Authorization : ' ; 
		var URL = SERVER_URL + '/api/users/teams/' ; 
		for(let x of teamIdArray){
			axios.get(URL+x).then((response) => {
				var users = [] ; 
				for(let y of response.data.data){
					axios.get(SERVER_URL+"api/users?email="+y.attributes.email+"&username="+y.attributes.username).then((response) => {
							var user = {
							id : response.data.data.id ,
							email : y.attributes.email ,
							roleid : y.attributes['role-id'] , 
							teamid : y.attributes['team-id'] , 
							username: y.attributes.username 
							};
							users.push(user) ; 


				},(error)=>{console.log(error);});  
				}
				var team = {
					id:x , 
					users:users
				};

				teams.push(team); 

			},(error)=>{console.log(error);});


		}
		return teams ; 
	},
	getTeamStats(args) {
		var c = args['selectedTeamId']; ;
		var team = null ; 
		for(let x of this.usersOfTeams)
			if(x.id === c)
				team = x ; 
		var total_working_time = 0 ; 
		var mean_working_time = 0 ;
		var team_working_times = [] ;
		this.promises = [] ;
		for(let x of team.users){
			for(let y of this.weekDates){
				var arg = {
					begin:y.format('YYYY-MM-DD'),
					end:y.format('YYYY-MM-DD'),
					id:x.id};

				this.getWorkingTimesTeam(arg);		
			}
		
		}

		var temp=[] ;
		var process = this.processData;
		Promise.all(this.promises).then(function(result){//on recupère les données 
			result.forEach(function(response){
				temp.push(response) ; 
			
			});


			process(temp); 
		}); 


	},
	getWorkingTimesTeam(args){

		var utc_begin_date = args.begin+'T'+'00:00:00Z'; 
		var utc_end_date = args.end+'T'+'23:59:59Z';
		var start_time_arg ='startTime='+utc_begin_date+'&' ; 
		var end_time_arg = 'endTime='+utc_end_date ; 
		var id = args.id;
		var URL = SERVER_URL + 'api/workingtimes/'+id+'?'+start_time_arg+end_time_arg ; 

		this.promises.push(axios.get(URL)); // on traite en async 


	

	},
	getNextWeek(args){
		const m1 =  this.endWeek.add(7 , 'days');
		const m2 = this.beginWeek.add(7 , 'days');
		this.endWeek = m1 ; 
		this.beginWeek = m2 ;
		this.dateFormated = this.beginWeek.format('YYYY-MM-DD') + '    -    ' + this.endWeek.format('YYYY-MM-DD') ; 
		this.weekDates = [] ; 
		for(var x = 0 ; x < 7 ; x++){
			var y = moment(this.beginWeek).add(x , 'days') ;
			this.weekDates.push(y) ;		
		}


		this.getTeamStats(args); 
	},

	getPreviousWeek(args){
		const m1 =  this.endWeek.subtract(7 , 'days');
		const m2 = this.beginWeek.subtract(7 , 'days');
		this.endWeek = m1 ; 
		this.beginWeek = m2 ;
		this.dateFormated = this.beginWeek.format('YYYY-MM-DD') + '    -    ' + this.endWeek.format('YYYY-MM-DD') ; 
		this.weekDates = [] ; 
		for(var x = 0 ; x < 7 ; x++){
			var y = moment(this.beginWeek).add(x , 'days') ;
			this.weekDates.push(y) ;		
		}
		this.getTeamStats(args); 

	},

	processData(args){
		

			
		var work_stats = {
			week:this.weekDates,
			total_work:[0 , 0 , 0 , 0 , 0 , 0 , 0]

		};

		var users_work = [];
		for (let x of args){
			if(x.data.data.length){
				for(let y of x.data.data){
					var worktime = moment.duration(moment(y.attributes.endTime).diff(moment(y.attributes.startTime))).asHours();
					var found = false ; 
					for(let z of users_work){
						if(z.id === y.attributes["user-id"]){
							z.work.push(worktime) ; 
							z._date.push(moment(y.attributes.startTime)) ; 
							found = true ;


						}

					}
					if(found === false){
						users_work.push({id:y.attributes["user-id"] , work:[worktime] , _date:[moment(y.attributes.startTime)]}) ; 
					

					}

				}

			}

		}



		for(let user of users_work){
			var worksum = 0 ; 
					for(let z of user._date){
						var idx = this.getIndexFromValue(work_stats.week , z);
							if(idx != -1){
								work_stats.total_work[idx] += (user.work).reduce((a,b) => a+b, 0) ;	

							}
					}		
		}
	
		
		this.teamWorkingTimeSum = work_stats ; 
		this.$emit("workingTimesArray" ,this.teamWorkingTimeSum ) ; 

		
	},
	//get index of date 
	getIndexFromValue(arr , val){
		var i = 0 ; 
		for(let x of arr){
			if(moment(x).format('YYYY-MM-DD') === moment(val).format('YYYY-MM-DD'))
				return i ;
			i++; 

		}
		return -1 ; 

	},

  }, 
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>



#calendar{
	position:relative; 
	top:600px; 
	right:90px; 
}


.beginslot{
	position:absolute;
	margin-right:30%; 
	background-color:red; 

}


.endslot{
	position:absolute; 
	margin-left:30%;
	color:red;
}


#selectTeams{
	position:relative; 
	top:500px ; 

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
