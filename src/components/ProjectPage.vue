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

    <h3 class="font-weight-light my-4">All project processes</h3>
    <v-row class="px-2">
      <v-card
        v-for="process in processes"
        :key="process.mainProcessId"
          width="300"
          class="ma-2"
      >
        <v-card-text
          class="font-weight-regular"
        >
          <div
            v-for="(v, k) in process"
            :key="k"
          > {{ k }} : {{ v }} <br></div>
        </v-card-text>
      </v-card>
    </v-row>

  </v-container>
</v-img>
</template>

<script>
import { URL_API } from "@/settings";
  import axios from 'axios';

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
        processes: [],
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

    methods: {
      loadProcesses() {
        axios({
          method: "get",
          url: `${URL_API}/api/products/${this.project.productId}`,
        })
        .then( response => {
          if (Array.isArray(response.data)) this.processes = response.data;
        })
      }
    },


    created() {
      this.loadProcesses();
    }

  }
</script>