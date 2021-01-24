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
            :key="`${role}-header`"
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

        <v-btn
          absolute
          fab
          right
          dark
          top
          color="blue lighten-1"
          class="mt-10"
          @click="addDialog = true"
        >
          <v-icon>
            mdi-plus
          </v-icon>
        </v-btn>

      </v-col>
    </v-container>

    <v-dialog
      v-model="addDialog"
      max-width="800"
    >
      <AddProcessCard
        :productId="productId"
        @done="addDialog = false"
      />
    </v-dialog>

  </v-img>
</template>

<script>
  import { FILTERS } from "@/resourses/helpers";
  import AddProcessCard from "@/components/AddProcessCard";

  export default {
    name: "Processes",

    components: {
      AddProcessCard,
    },

    data() {
      return {
        addDialog: false,
      };
    },

    computed: {
      userProcesses() {
        return this.$store.getters.getUserProcesses;
      },

      productId() {
        return `${this.$store.getters.getProject.projectId}`;
      },
    },

    filters: FILTERS,

    methods: {

    }
  }
</script>