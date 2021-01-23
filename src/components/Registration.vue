<template>
  <v-img
    src="@/assets/backgrounds/anime-bg-2.png"
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
          <v-card-title>Registration</v-card-title>

          <v-card-text class="pb-0">
            <v-form ref="form">
              <v-text-field
                v-model="username"
                :rules="[ rules.required, rules.azString, rules.eightLength, rules.counter ]"
                label="Username"
                outlined
                dense
              >
              </v-text-field>

              <v-text-field
                v-model="email"
                :rules="[ rules.required, rules.email ]"
                label="Email"
                outlined
                dense
              >
              </v-text-field>

              <v-text-field
                v-model="password"
                :rules="[ rules.required, rules.azString, rules.eightLength, rules.counter ]"
                label="Password"
                outlined
                dense
              >
              </v-text-field>

              <v-text-field
                v-model="confirmPassword"
                :rules="[ rules.required, rules.confirmPassword ]"
                :type="fieldTypePassword"
                :append-icon="appendIconPassword"
                @click:append="showPassword = !showPassword"
                label="Confirm password"
                outlined
                dense
              >
              </v-text-field>

              <v-select
                v-model="roles"
                :rules="[ rules.required, rules.oneLength ]"
                :items="availableRoles"
                label="Choose roles"
                outlined
                small-chips
                multiple
                select-all
                searchable
              >
              </v-select>

              <h4 class="font-weight-light">Personal Data</h4>

              <v-text-field
                v-model="firstName"
                :rules="[ rules.required, rules.azString, rules.counter ]"
                label="First name"
                outlined
                dense
              >
              </v-text-field>

              <v-text-field
                v-model="lastName"
                :rules="[ rules.required, rules.azString, rules.counter ]"
                label="Last name"
                outlined
                dense
              >
              </v-text-field>

              <v-select
                v-model="gender"
                :rules="[ rules.required ]"
                :items="genders"
                label="Gender"
                outlined
                dense
              >
              </v-select>

              <v-text-field
                v-model="placeOfBirth"
                :rules="[ rules.required, rules.azString ]"
                label="Place of birth"
                outlined
                dense
              >
              </v-text-field>

            </v-form>
          </v-card-text>

          <v-card-actions class="pa-4">
            <v-btn
              :loading="loading"
              outlined
              color="primary"
              @click="signUp"
            >
              Sign up
            </v-btn>

            <v-btn
              text
              :to="{ name: 'login' }"
              color="secondary"
            >
              Sign in
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
    name: "Registration",

    data() {
      return {
        username: "",
        password: "",
        confirmPassword: "",
        email: "",
        roles: [],

        firstName: "",
        lastName: "",
        gender: "",
        placeOfBirth: "",

        genders: ["male", "female"],

        rules: {
          ...RULES,
          confirmPassword: v => v == this.confirmPassword || "Need to be same as password",
        },

        loading: false,
        showPassword: false,
      };
    },

    methods: {
      signUp() {
        if (!this.$refs.form.validate()) return;

        const { username, password, email, roles, firstName, lastName, gender, placeOfBirth } = this;
        this.loading = true;


        this.$store.dispatch("SIGN_UP", {
          username,
          password,
          email,
          roles,
          firstName,
          lastName,
          gender,
          placeOfBirth,

        })
        .then( () => {
          this.loading = false;
          this.$router.push({ name: "login"});
        })
        .catch( () => {
          this.loading = false;
        });
      }
    },

    computed: {
      appendIconPassword() {
        return this.showPassword ? 'mdi-eye' : 'mdi-eye-off';
      },

      fieldTypePassword() {
        return this.showPassword ? 'text' : 'password';
      },

      availableRoles() {
        return this.$store.getters.getAvailableRoles;
      },
    },

    beforeRouteEnter(to, from, next) {
      next( vm => {
        vm.$store.dispatch("LOAD_AVAILABLE_ROLES");
      })
    }
  };
</script>
