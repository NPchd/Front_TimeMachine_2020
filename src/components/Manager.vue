<template>
    <div class: Manager>
        <h1>Welcome in your manager's dashboard !</h1>
        <ManageTeam/>
        <ModifierInfos/>
	<teamdashboard/>
	<button class="navbutton" @click='goBack'>Retourner a l'accueil</button>
    </div>
</template>

<script>
    import ManageTeam from '../components/ManageTeam.vue'
    import ModifierInfos from '../components/ModifierInfos.vue'
    import teamdashboard from './TeamDashBoard.vue'

    export default {
        name:'Manager',
        components: {
            ManageTeam,
            ModifierInfos,
	    teamdashboard
        }, 

	methods:{
		goBack(){
			this.$router.push({name:'login'}) ; 
		}


	}
    }
</script>

<style>
.navbutton {
	background-color:red; 
	position:relative; 
	bottom:50% ; 

}



</style>
