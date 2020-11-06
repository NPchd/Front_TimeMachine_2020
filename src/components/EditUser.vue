<template>
    <div class="container-fluid">
        <div class="row">
            <b-form class="col-sm-8 col-md-6 col-lg-4" id="form">
                <h1>User details</h1>
                <b-form-group
                    id="input-group-1"
                    label="Username"
                    label-for="input-1"
                    label-align="left"
                >
                    <b-form-input
                        id="input-1"
                        v-model="form.username"
                        v-if="editView"
                        type="username"
                        required
                        placeholder="Enter username"
                    ></b-form-input>
                    <label
                        v-if ="!editView"
                        label-align="left"
                    >{{ form.username }}</label>
                </b-form-group>

                <b-form-group
                    id="input-group-2"
                    label="Email"
                    label-for="input-2"
                    label-align="left"
                >
                    <b-form-input
                        id="input-2"
                        v-model="form.email"
                        v-if="editView"
                        type="email"
                        required
                        placeholder="Email"
                    ></b-form-input>
                    <label v-if ="!editView"
                    label-align="left"
                    > {{ form.email }} </label>
                </b-form-group>

                <b-button
                    block v-on:click="toggleView"
                    id="button"
                    v-if="!editView"
                >Edit user</b-button>

                <b-button
                    block v-on:click="saveEdit"
                    id="button"
                    v-if="editView"
                >Save change</b-button>

                <b-button
                    block v-on:click="toggleView"
                    id="button"
                    v-if="editView"
                >Cancel</b-button>
            </b-form>
        </div>
    </div>

</template>

<script>
import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import Cookies from 'js-cookie'

Vue.use(VueAxios,axios)
export default {
    name:'EditUser',

    data(){
        return{
            cookie : {
                username:null,
                user_id:null
            },
            form : {
                username:null,
                email:null
            },
            editView:false
        }
    },

    mounted(){
        this.cookie.user_id = Cookies.get("user_id");
        Vue.axios.get('https://localhost:4001/api/users/' + this.cookie.user_id)
        .then(reponse => {
            this.form.username = reponse.data.data.attributes.username
            this.form.email = reponse.data.data.attributes.email
        })
    },

    methods:{
        toggleView() {
            this.editView = !this.editView
        },
        saveEdit() {
            this.cookie.user_id = Cookies.get("user_id")
            Vue.axios.get('https://localhost:4001/api/users/' + this.cookie.user_id)
            .then(response => {
                Vue.axios.put('https://localhost:4001/api/users/' + this.cookie.user_id,
                {
                    user : {
                        username: this.form.username,
                        email: this.form.email,
                        role_id: response.data.data.attributes['role-id'],
                        team_id: response.data.data.attributes['team-id']
                    }
                })
            })
        },
        disconnect() {
            Cookies.remove('username');
            Cookies.remove('user_id');
            Cookies.remove('role_id');
        }
    }
}
</script>

<style scoped>
    #form {
        margin: auto;
        border: 1px solid rgba(0, 0, 0, 0.2);
        border-radius: 10px;
        padding: 5%;
        box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
    }
    b-button {
        background-color: rgb(19, 112, 112);
    }
    b-form-group {
        display: block;
    }
    label {
        text-align: left;
        display: block;
        font-size: 26px;
    }
    .container-fluid {
        position: relative;
        margin: 5%;
    }
</style>
