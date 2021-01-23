<template>
  <v-img
    src="@/assets/backgrounds/anime-bg-5.png"
    gradient="#fffffff0, #ffffff90"
    eager
  >
    <v-container>
      <h1 class="font-weight-light mb-8">Processes</h1>

      <v-col
        cols="12"
        md="10"
        lg="9"
        xl="7"
      >
        <template
          v-for="(processNames, role) in userProcesses"
        >
          <h3
            :key="role"
            class="font-weight-light"
          >{{ role | roleName }}</h3>

          <v-expansion-panels
            :key="role"
            class="mb-8 mt-2"
          >
            <v-expansion-panel
              v-for="processName in processNames"
              :key="processName"
            >
              <v-expansion-panel-header>
                {{ processName }}
              </v-expansion-panel-header>

              <v-expansion-panel-content>
                {{ processName }}
              </v-expansion-panel-content>
            </v-expansion-panel>

          </v-expansion-panels>

        </template>
      </v-col>
    </v-container>
  </v-img>
</template>

<script>
  import { FILTERS } from "@/resourses/helpers";

  export default {
    name: "Processes",

    data() {
      return {

      };
    },

    computed: {
      userProcesses() {
        return this.$store.getters.getUserProcesses;
      }
    },

    filters: FILTERS,

    methods: {

    }
  }
</script>