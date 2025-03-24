<template>
  <q-layout view="hHh lpR fFf">

<q-header height-hint="98" id="header">
 <q-toolbar>
   <q-toolbar-title id="titleBar">
     <q-avatar>
     </q-avatar>
     Factus
   </q-toolbar-title>
 </q-toolbar>

 <q-tabs align="left">

 </q-tabs>
</q-header>

<q-page-container>
 <router-view />
</q-page-container>

</q-layout>



</template>

<script setup>
import { ref } from 'vue'

const leftDrawerOpen = ref(false)

const toggleLeftDrawer = () => {
 leftDrawerOpen.value = !leftDrawerOpen.value
}
</script>

<style>

#titleBar{
 display: flex;
 justify-content: center;
}
#headerHome{
 background-color: rgb(0,62,133)  ;
 color: white;
}

</style>