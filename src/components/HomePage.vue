<template>
  <v-container>
    <v-card
      flat
      tile
      color="white"
      class="fixed z-40"
      width="100%"
      style="top: 0"
    >
      <h1 class="font-weight-light text-capitalize ma-2">{{ studioName }}</h1>
    </v-card>

    <v-img
      height="100%"
      class="mt-8"
      gradient="217deg, #E67C6470, #9198e570"
    >
        <v-row
          justify="center"
          class="py-4 ma-0"
        >
          <v-card
            v-for="project in projects"
            :key="project.id"
            max-width="300"
            class="ma-4 d-flex flex-column"
            @click="setProject(project.id)"
            :class="{
              'elevation-6': isProjectActive(project.id)
            }"
            :dark="isProjectActive(project.id)"
          >
            <v-img
              :src="project.img"
            >
            </v-img>

            <v-card-title>
              {{ project.name }}
            </v-card-title>

            <v-card-subtitle>
              {{ project.author }}
            </v-card-subtitle>

            <v-card-text>
              {{ project.description | shortDescription }}
            </v-card-text>

            <v-spacer/>

            <v-card-actions class="ma-2">
              <div
                class="mr-2"
              >Progress</div>
              <v-progress-linear
                :value="project.progress"
                color="red"
                height="20"
              >
              </v-progress-linear>
            </v-card-actions>
          </v-card>
        </v-row>
      <!-- </v-simple-table> -->
    </v-img>
  </v-container>
</template>

<script>
  import {
    FILTERS,
  } from "@/resourses/helpers";

  export default {
    name: "HomePage",

    data() {
      return {
        studioName: "Studio New media",
      }
    },

    computed: {
      projects() {
        return this.$store.getters.getProjects;
      },

      selectedProject() {
        return this.$store.getters.getProject;
      },

      selectedProjectId() {
        return this.selectedProject.id;
      },
    },

    filters: FILTERS,

    methods: {
      setProject(id) {
        const { projects } = this;
        let project = projects.find( p => p.id === id);
        this.$store.commit("SET_PROJECT", project);
      },

      isProjectActive(id) {
        return this.selectedProjectId === id;
      },
    }

  }
</script>