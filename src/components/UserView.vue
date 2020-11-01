<template>
  <div class="userView">
		<form id="adduser">
			<p>
				username: <input type="text" v-model="username"><br>
				password: <input type="text" v-model="password"><br>
				email: <input type="text" v-model="email"><br>
				<select id="displaylist" v-model="rolelist" placeholder="select role">
					<option v-for="item in roles" v-bind:key="item"> {{ item }} </option>
				</select>
			</p>
		</form>
		<button @click="getUser({username ,email})">Connect</button>
		<button @click="createUser({username , email , rolelist})">Create User</button>

		<div v-if=" error === 'ok'" :key="error">
			<form id="updateuser">
				<p> ID :{{user_id}} <br>
		    	Team ID : <input type="text" v-model= "changeTeamID" ><br>
		    	Username : <input type="text" v-model= "changeUsername"><br>
		    	Mail Address : <input type="text" v-model="changeMail"><br>
		    	Role : {{changeRole}}
		    	<select id = "displayChangeList" v-model="changeRoleList" placeholder="select role">
		    		<option v-for="item in roles" v-bind:key="item"> {{ item }} </option>
					</select><br>
					<button @click="updateUser({changeUsername, changeMail, changeRoleList, changeTeamID, user_id})">Update User</button>
					<button @click="deleteUser({user_id})"> Delete the user</button><br>
					{{response}}
				</p>
			</form>
		</div>
		<div v-else>
			{{response}}<br>
		</div>
	</div>
</template>

<script>
	import axios from 'axios'

	const SERVER_URL = 'http://localhost:4000/';

	export default {
	  name: 'userView',
	  props: {
	  },
	  data() {
	  	this.create_user = false;
			this.response = '';
			this.username = '';
			this.password = '';
			this.error = 'ko';
			this.roles = ['Employee', 'Manager', 'General Manager'];
			this.user_id = null;
			this.role_id = null;
			this.team_id = null;
			this.user_role = null;
			this.changeTeamID = null;
			this.changeUsername = null;
			this.changeMail = null;
			this.changeRoleList = null;
			this.changeRole = null;
			return {
				username: '',
				password: '',
				email: '',
				response: '',
				rolelist: '',
				changeTeamID: null
			}
	  },
	  methods: {
			createUser(args) {
				if(args.rolelist === 'General Manager')
					this.userRole = 3;
				else if (args.rolelist === 'Manager')
					this.userRole = 2;
				else
					this.userRole = 1;
				var data = '{"user" : {"username":"' + args.username + '" , "email":"' + args.email + '","role_id":"' + this.userRole + '"}}';
				var header = {
					headers: {'Content-Type': 'application/json'}
				};
				var URL = SERVER_URL + 'api/users';
				axios.post(URL, data, header)
				.then(response => {
					this.response = "User " + args.username + " has been added";
					this.error = 'ok';
					this.changeUsername = response.data.data.attributes.username;
					this.changeMail = response.data.data.attributes.email;
					this.changeRole = this.roles[response.data.data.attributes['role-id']-1];
					this.user_id = response.data.data.id;
					console.log(response);
				})
				.catch(error => {
					response = error;
					this.error = 'ko';
					console.log(error)
				});
			},

			updateUser(args) {
				if(args.changeRoleList === 'General Manager')
					this.userRole = 3;
				else if (args.changeRoleList === 'Manager')
					this.userRole = 2;
				else
					this.userRole = 1;
				var data = '{"user" : {"username":"' + args.changeUsername + '" , "email":"' + args.changeMail + '","role_id":"' + this.userRole + '","team_id":' + this.changeTeamID + '}}';
				var header = {
					headers: {'Content-Type': 'application/json'}
				};
				var URL = 'http://localhost:4000/api/users/' + args.user_id;
				axios.put(URL , data , header)
				.then(response => {
					this.response = "User " + response.data.data.attributes.username + " has been modified";
					this.error = 'ok';
					console.log(response);
				})
				.catch(error => {
					this.response = error;
					this.error = 'ko';
					console.log(error)
				});
			},

			getUser(struct) {
				var URL = SERVER_URL;
				axios.get(URL + "api/users?email=" + struct.email + "&username=" + struct.username)
				.then(response => {
					this.response = "Connected as user : " + response.data.data.attributes.username;
					this.user_id = response.data.data.id ;
					this.user_role =  this.roles[response.data.data.attributes['role-id'] - 1];
					this.team_id = response.data.data.attributes['team-id'];
					this.changeTeamID = this.team_id;
					this.changeUsername = this.username;
					this.changeMail = this.email;
					this.changeRole = this.user_role;
					this.$router.push({name: 'dashboard', params: {userId: this.user_id}})
					.catch(error => {
						if(error.name != 'NavigationDuplicated')
							throw error;
					});
					this.error = 'ok';
					console.log(response);
				})
				.catch(error => {
					this.response = "User :" + struct.username + " does not exist";
					this.error = 'ko';
					console.log(error);
				});
			},

			deleteUser(args) {
				var URL = SERVER_URL + '/api/users/' + args.user_id;
				axios.delete(URL)
				.then(response => {
					this.error = 'ko';
					this.response = "User ID :" + args.user_id + " deleted";
					console.log(response);
				})
				.catch(error => {
					this.response = "User not found , cannot delete";
					this.error = 'ko';
					console.log(error);
				});
			},
		}
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	button {
		background-color: red;
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
