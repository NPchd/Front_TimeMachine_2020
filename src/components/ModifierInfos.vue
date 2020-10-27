<template>
    <div>
        <p class="infos">Username : {{infos_username}} <br/>Email : {{infos_email}}</p>
        <button class="titre_formulaire" v-on:click="hide_show_form()">Click to change my informations</button>
        <div id="d1" style="display:none" class="formulaire1">
            <font size="2">(don't fill the one you don't want to change)</font><br/>
            New username :  
            <input type="text" v-model="username">
            <tr>
                New email :
                <input type="text" v-model="email">
            </tr><br/>
            <button v-on:click="change_info(username, email)">Change</button>
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
    name:'ModifierInfos',

    data(){
        return{
            cookie_id : '',
            username:'',
            email:'',
            infos_email:'',
            infos_username:''
        }
    },
    mounted(){
        this.cookie_id=Cookies.get("id_cookies")
        Vue.axios.get('http://localhost:8080/api/users/'+this.cookie_id)
        .then(reponse=>{
            this.infos_email = reponse.data.data.attributes.email
            this.infos_username=reponse.data.data.attributes.username
        })
    },
    methods:{
        hide_show_form(){    
            let d1 = document.getElementById("d1");
            if(getComputedStyle(d1).display != "none"){
                d1.style.display = "none";
            } else {
                d1.style.display = "block";
            }
        },
        change_info(Username,Email){
            this.cookie_id=Cookies.get("id_cookies")
            var user={
                email : '',
                role_id : '',
                team_id : '',
                username : '',
            }
            Vue.axios.get('http://localhost:8080/api/users/'+this.cookie_id)
            .then(reponse=>{
                console.log(reponse)
                if(Email !=''){user.email= Email}
                else{user.email = reponse.data.data.attributes.email}
                if(Username != ''){user.username = Username}
                else{user.username=reponse.data.data.attributes.username}
                user.role_id=reponse.data.data.attributes['role-id']
                user.team_id=reponse.data.data.attributes['team-id']

                Vue.axios.put('http://localhost:8080/api/users/'+this.cookie_id,
                {
                    user
                }).then(reponse2=>console.log(reponse2))
            })
            this.username =''
            this.email=''
            this.$forceUpdate
        }    
    }
}
</script>

<style scoped>
.titre_formulaire{
    position: absolute;
    top: 150px; right: 85px; 
    color:green;
    font-weight: bold;
    font-size: 20px;
}
.formulaire1{
    position: absolute;
    top: 180px; right: 102px; 
    color:green;
}
.infos{
    position: absolute;
    top: 10px; left: 10px; 
    color:black;
}
</style>