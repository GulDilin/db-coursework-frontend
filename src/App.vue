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