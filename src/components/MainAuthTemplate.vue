<template>
  <v-main>

    <v-col
      cols="12"
      md="7"
      lg="7"
      xl="7"
    >
    </v-col>

    <v-col
      cols="12"
      md="5"
      lg="5"
      xl="5"
    >
      <router-view name="content">
      </router-view>
    </v-col>

  </v-main>
</template>

<script>
  export default {
    name: "MainAuthTemplate",


  }
</script>