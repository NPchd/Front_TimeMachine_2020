<template>
    <div>
        <table border="1px">
            <tr>
                <td>Username</td>
            </tr>
            <tr v-for="item in list" v-bind:key="item.id">
                <a href='http://localhost:4000/api/users'>{{item.attributes.username}}</a>
                <td><button v-on:click="Remove_User(item)">Remove user {{item.id}}</button></td>
            </tr>
        </table>
    </div>
</template>

<script>
    import Vue from 'vue'
    import axios from 'axios'
    import VueAxios from 'vue-axios'
    import Cookies from 'js-cookie'

    Vue.use(VueAxios,axios)

    export default {
        name: 'ManageTeam',
        data() {
            return {
              list:'',
              team:''
            }
        },
        mounted() {
            var cookie_id = Cookies.get("id_cookies");
            Vue.axios.get('http://localhost:4000/api/users/teams/' + cookie_id)
            .then(reponse => {
                console.log(reponse)
                this.list = reponse.data.data
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
                Vue.axios.put('http://localhost:4000/api/users/' + item.id,
                {
                    user
                })
                .then(reponse => console.log(reponse))
            }
        }
    }
</script>
