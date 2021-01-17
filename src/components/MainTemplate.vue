<template>
  <v-main>

    <router-view name="content">
    </router-view>

    <v-bottom-navigation
      v-model="activeRoute"
      dark
      shift
    >
      <v-btn
        v-for="route in routes"
        :key="route.to"
      >
        <span>{{ route.title }}</span>

        <v-icon>{{ route.icon }}</v-icon>
      </v-btn>
    </v-bottom-navigation>

  </v-main>
</template>

<script>
  export default {
    name: "MainTemplate",

    data() {
      return {
        activeRoute: "",
        routes: [
          {
            to: "/main",
            icon: "mdi-home",
            title: "Home"
          }
        ]

      }
    },
  };
</script>