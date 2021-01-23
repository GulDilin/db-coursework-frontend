<template>
  <v-img
    src="@/assets/backgrounds/anime-bg-3.jpg"
    gradient="#fffffff0, #ffffff90"
    height="100vh"
    width="100vw"
  >
  <v-container
    class="fill-height align-start"
  >

    <h1 class="font-weight-light">Project</h1>
    <v-row>
        <v-card
          width="400"
          class="ma-4 d-flex flex-column"
        >
          <v-img
            :src="project.img"
          >
          </v-img>

          <v-card-title>
            {{ projectName }}
          </v-card-title>

          <v-card-subtitle>
            {{ project.author }}
          </v-card-subtitle>

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
              {{ project.progress }} %
            </v-progress-linear>
          </v-card-actions>
        </v-card>

        <v-card
          width="400"
          class="ma-4"
        >
          <v-card-title>
            Project description
          </v-card-title>

          <v-card-text>
            {{ project.description }}
          </v-card-text>
        </v-card>
    </v-row>

  </v-container>
</v-img>
</template>

<script>
  export default {
    name: "ProjectPage",

    props: {
      projectId: {
        type: String,
        default: ""
      }
    },

    data() {
      return {
      };
    },

    computed: {
      project() {
        return this.$store.getters.getProject;
      },

      projectName() {
        return this.project.name ?? "select your project";
      },
    },

  }
</script>