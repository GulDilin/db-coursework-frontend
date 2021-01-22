<template>
  <v-img
    src="@/assets/backgrounds/anime-bg-3.jpg"
    class="fill-height"
    min-height="100vh"
    gradient="#00000070, #00000030"
  >
    <v-col
      cols="12"
      class="fill-height d-flex flex-column justify-center align-center"
    >
      <v-col
        cols="12"
        lg="8"
      >
        <v-card
          class="elevation-0"
          color="grey lighten-4"
        >
          <v-card-title>Login</v-card-title>

          <v-card-text class="pb-0">
            <v-text-field
              v-model="username"
              :rules="[ rules.required ]"
              label="Username"
              outlined
              dense
            >
            </v-text-field>

            <v-text-field
              v-model="password"
              :rules="[ rules.required ]"
              :type="fieldTypePassword"
              :append-icon="appendIconPassword"
              @click:append="showPassword = !showPassword"
              label="Password"
              outlined
              dense
            >
            </v-text-field>

          </v-card-text>

          <v-card-actions class="pa-4">
            <v-btn
              outlined
              color="primary"
              :to="{ name: 'main' }"
            >
              Sign in
            </v-btn>

            <v-btn
              text
              :to="{ name: 'registration' }"
              color="secondary"
            >
              Sign up
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-col>
  </v-img>
</template>

<script>
  import {
    RULES,
  } from "@/resourses/helpers";

  export default {
    name: "Login",

    data() {
      return {
        username: "",
        password: "",
        showPassword: false,

        rules: {
          ...RULES,
        }
      };
    },

    computed: {
      appendIconPassword() {
        return this.showPassword ? 'mdi-eye' : 'mdi-eye-off';
      },

      fieldTypePassword() {
        return this.showPassword ? 'text' : 'password';
      }
    }
  };
</script>
