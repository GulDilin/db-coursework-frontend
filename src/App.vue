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

<style lang="scss">
  .absolute {
    position: absolute !important;
  }

  .fixed {
    position: fixed !important;
  }

  .bg-0 {
    background-color: #00000000;
  }

  .transitioned {
    transition: 1s;
  }

  $angle-vals: 30, 45, 60, 90, 120, 135, 180, 210, 225, 240, 270, 300, 315, 330, 360;
  @each $i in $angle-vals {
    .rotated-#{$i} {
      transform: rotate(#{$i}deg) !important;
    }
  }

  $z-vals: 10, 20, 30, 40, 50, 100, 200, 400, 500, 1000, 2000, 3000;
  @each $i in $z-vals {
    .z-#{$i} {
      z-index: #{$i};
    }
  }
</style>