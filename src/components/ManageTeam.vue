<template>
    <div class="dashboardTeam">
        <table class="tableTeam">
            <tr>
                <td class="colTitle">Username</td>
            </tr>
            <tr v-for="item in list" v-bind:key="item.id">
                <label>{{item.attributes.username}}</label>
                <td><b-button v-on:click="Remove_User(item)">Remove user {{item.id}}</b-button></td>
            </tr>
        </table>
	    <div class="barchart">
		    <Bar :width="800" :height="400" :chart-data="datacollection" ref="barchartref"></Bar>
	        <b-button @click="updateScalePlus" id="plus">Increase Scale</b-button>
	        <b-button @click="updateScaleMinus" id="minus">Decrease Scale</b-button>
	    </div>
	    <WorkingTimesTeam @workingTimesArray="updateChart" id="workingtimes"/>
	</div>
</template>

<script>
    import Vue from 'vue'
    import axios from 'axios'
    import VueAxios from 'vue-axios'
    import Cookies from 'js-cookie'
    import WorkingTimesTeam from '../components/WorkingTimesTeam.vue'
	import Bar from '../components/Bar.vue'

    Vue.use(VueAxios,axios)

    export default {
        name: 'ManageTeam',
        components: {
            Bar,
			WorkingTimesTeam
        },
        data() {
            return {
                datacollection : {
					labels:[],
					datasets:[]
				},
              list:'',
              team:'',
              empty: true,
            }
        },
        mounted() {
            var team_id = Cookies.get("user_id");
            Vue.axios.get('http://localhost:8080/api/users/teams/' + team_id)
            .then(reponse => {
                if (response.status === 200) {
                    empty = false;
                    this.list = reponse.data.data
                }
            })
        },
        methods: {
            Remove_User(item) {
                var user = {
                    email: item.attributes.email,
                    role_id: item.attributes.role_id,
                    team_id: null,
                    username: item.attributes.username
                }
                Vue.axios.put('https://localhost:4001/api/users/' + item.id,
                {
                    user
                })
                .then(reponse => console.log(reponse))
            },
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
        }
    }
</script>

<style scoped>
    label {
        font-size: 26px;
    }
    .colTitle {
        font-size: 26px;
        font-weight: bold;
    }
    .tableTeam {
        float:right;
        margin-right: 0px;

    }
    .barchart {
        padding: 2%;
    }
</style>