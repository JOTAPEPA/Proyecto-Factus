
<template>
  <q-layout view="hHh lpR fFf">

    <q-header class="bg-primary text-white" height-hint="98" id="header">
      <q-toolbar  id="headerTitle">
        <q-toolbar-title>
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

#headerTitle {
  display: grid;
  justify-content: center;
  background-color: #9dacc7;
}

#header {
  display: grid;
  background-color: #9dacc7;
}

bg-primary {
  background-color: #9dacc7;
}
</style>