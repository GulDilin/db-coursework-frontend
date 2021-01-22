<template>
  <v-main class="fill-height pa-0">

    <v-row
      class="pb-0"
    >
      <v-col
        cols="12"
        md="7"
        lg="7"
        xl="7"
        class="px-0 pb-0"
        align="center"
        justify="center"
      >
        <v-img
          dark
          src="@/assets/auth-background.jpg"
          height="100vh"
            content-class="my-auto"
          class="ma-0"
        >
          <v-spacer>
          <v-col
            cols="8"
            height="100%"
            align="center"
            justify="center"
          >
            <v-card
              class="text-center elevation-0 py-4"
              color="#00000070"
            >
              <h1 class="display-1 font-weight-thin mb-4">
                Multiplication production service
              </h1>
              <h4 class="subheading">
                Build your anime today!
              </h4>
            </v-card>
          </v-col>
        </v-spacer>
        </v-img>
      </v-col>

      <v-col
        cols="12"
        md="5"
        lg="5"
        xl="5"
        class="px-0 pb-0 black"
      >
        <v-fade-transition mode="out-in">
          <router-view name="content">
          </router-view>
        </v-fade-transition>
      </v-col>
    </v-row>

  </v-main>
</template>

<script>
  export default {
    name: "MainAuthTemplate",


  }
</script>