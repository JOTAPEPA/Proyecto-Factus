<template>
  <q-layout view="hHh lpR fFf">

<q-header bordered class="bg-primary text-white" id="header">
  <q-toolbar id="titleBar">
    <q-btn dense flat round icon="menu" @click="toggleLeftDrawer" />

    <q-toolbar-title id="title">
      <q-avatar>
      </q-avatar>
      Factus
    </q-toolbar-title>
  </q-toolbar>
</q-header>

<q-drawer show-if-above v-model="leftDrawerOpen" side="left" id="leftDrawer">
  <!-- drawer content -->
</q-drawer>

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
  background-color: rgb(161,185,207);
  display: flex;
  justify-content: center;
  

}

#title{
  display: flex;
  justify-content: center;
}

#leftDrawer{
  background-color:rgb(213,227,240);
  

}

header{
  background-color:rgb(161,185,207);
  border-bottom: rgb(161,185,207);
}

.q-header--bordered{
  border-bottom: 0
}

</style>

