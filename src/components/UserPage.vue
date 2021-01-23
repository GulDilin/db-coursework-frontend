<template>
  <v-img
    src="@/assets/backgrounds/anime-bg-4.png"
    gradient="#fffffff0, #ffffff90"
    height="100vh"
    width="100vw"
    class="absolute"
    eager
  >
    <v-container>
      <v-col>
        <v-row class="pa-8">
          <v-avatar
            height="200"
            width="200"
            class="mr-8"
          >
            <v-img src="https://randomuser.me/api/portraits/men/85.jpg"></v-img>
          </v-avatar>

          <v-card
            tile
            flat
            max-width="500"
          >
            <v-card-title class="font-weight-light">
              Login: {{ username }}
            </v-card-title>

            <v-card-text>
              Roles
              <div>
              <v-chip
                v-for="role in userRoles"
                :key="role"
                dark
                small
                color="blue-grey"
                class="ma-1"
              >
                {{ role | roleName }}
              </v-chip>
            </div>
            </v-card-text>
          </v-card>
        </v-row>
      </v-col>
    </v-container>
  </v-img>
</template>

<script>
  import { FILTERS } from "@/resourses/helpers";

  export default {
    name: "UserPage",

    data() {
      return {

      }
    },

    computed: {
      username() {
        return this.$store.getters.getUserName;
      },

      userRoles() {
        return this.$store.getters.getUserRoles;
      },

      userRolesJoined() {
        return this.userRoles.join(", ");
      }
    },

    filters: FILTERS,
  }
</script>