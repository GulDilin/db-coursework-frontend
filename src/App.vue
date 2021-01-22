<template>
  <v-app id="app">
    <NotificationsGroup/>

    <router-view></router-view>
  </v-app>
</template>

<script>
  import NotificationsGroup from "@/components/NotificationsGroup";

  export default {
    name: "App",

    components: {
      NotificationsGroup,
    },
  };
</script>

<style>
  .absolute {
    position: absolute !important;
  }

  .z-3000 {
    z-index: 3000;
  }
</style>