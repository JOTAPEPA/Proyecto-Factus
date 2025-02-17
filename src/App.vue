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
        <q-route-tab to="/page1" label="Page One" />
        <q-route-tab to="/page2" label="Page Two" />
        <q-route-tab to="/page3" label="Page Three" />
      </q-tabs>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>

  </q-layout>

</template>


<script setup>

</script>

<style>
#titleBar {
  display: flex;
  justify-content: center;
}

#header {
  background-color: rgb(170, 196, 230);
  color: black;
}
</style>
>>>>>>> 883e1ed352f387d44fce60f83e4a2082972e8d09
