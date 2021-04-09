<template>
  <div id="app">
    <router-view v-if="isRounterAlive"></router-view>
  </div>
</template>

<script>
export default{
  name: 'App',
  provide(){
	  return{
		  reload:this.reload
	  }
  },
  data(){
	 return{
		 isRounterAlive:true
	 } 
  },
  methods:{
	  reload(){
		  this.isRounterAlive = false
		  this.$nextTick(function(){
			  this.isRounterAlive = true
		  })
	  }
  }
}
</script>
