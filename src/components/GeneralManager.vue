<template>
    <div id="app">
         <table class="tableAll">
            <tr>
                <td class="colTitle">Username</td>
            </tr>
            <tr v-for="item in list" v-bind:key="item.id">
                <label>{{item.attributes.username}}</label>
                <td>
                    <b-button v-on:click="Remove_User(item)">Remove user {{item.id}}</b-button>
                </td>
                <td v-if="item.attributes['role-id'] == 4">
                    <b-button v-on:click="updateRole(item)">Upgrade</b-button>
                </td>
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
          list:null,
          roleSelected:null,
          user_id:null
        }
    },
    mounted() {
        Vue.axios.get('http://localhost:8081/api/users/all')
        .then(response => {
            this.list = response.data.data
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

<style scoped>
    label {
        font-size: 26px;
    }
    .colTitle {
        font-size: 26px;
        font-weight: bold;
    }
    .tableAll {
        margin: 5%;

    }
</style>