<template>
    <div id="app">
        <table>
            <tr>
                <td>Username</td>
            </tr>
            <tr v-for="item in listUsers" v-bind:key="item.id">
                <a v-bind:href="'http://localhost:8081/api/users/' + item.id">{{item.attributes.username}}</a>
                <td><button v-on:click="removeUser(item.id)">Remove user {{item.id}} </button></td>
                <td v-if="item.attributes['role-id'] == 3"><button v-on:click="updateRole(item)">Upgrade</button></td>
            </tr>
        </table>
    </div>
</template>

<script>
import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'

Vue.use(VueAxios,axios)

export default {
    name: 'app',
    data() {
        return {
          listUsers:null,
          roleSelected:null,
          user_id:null
        }
    },
    mounted() {
        Vue.axios.get('http://localhost:8081/api/users/all')
        .then(response => {
            this.listUsers = response.data.data
        })
    },
    methods: {
        removeUser: function(user_id) {
            Vue.axios.delete('http://localhost:8081/api/users/' + user_id)
            .then(reponse => console.log(reponse))
        },
        updateRole: function(item) {
            Vue.axios.put('http://localhost:8081/api/users/' + item.id,
            {
                user : {
                    username: item.attributes.username,
                    email: item.attributes.email,
                    role_id: 2,
                    team_id: 1
                }
            },
            {
                headers : {
                    "Content-type": "application/json"
                }
            })
            .then(response => {
                this.$forceUpdate();
                console.log(response);
            })
            this.$forceUpdate();
        }
    }
}
</script>