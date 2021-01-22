<template>
  <v-card
    dark
    color="blue-grey"
    class="ma-8"
  >
    <v-card-title>
      {{ title }}
    </v-card-title>
    <v-card-text>
      Not available now
    </v-card-text>
  </v-card>
</template>

<script>
  export default {
    name: "Plug",

    props: {
      title: {
        type: String,
        default: "Temporary"
      }
    }
  }
</script>