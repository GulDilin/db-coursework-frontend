<template>
  <v-main>
    <v-navigation-drawer
      permanent
      dark
      expand-on-hover
      disable-route-watcher
      app
      class="z-30 d-flex flex-column justify-center"
      :mini-variant.sync="mini"
    >

      <template v-slot:img>
        <v-img
          :src="project.img"
          height="100%"
          gradient="#000000f0, #00000070"
        >
        </v-img>
      </template>

      <v-card
        tile
        flat
        class="d-flex flex-column justify-end"
        :height="mini ? '70%' : 'auto'"
        color="#00000000"
      >
        <v-card-title
          class=" text-uppercase font-weight-light"
          :class="{
            'rotated-270 text-no-wrap': mini,
            'pa-2': !mini,
          }"
        ><span>{{ projectName }}</span></v-card-title>

        <v-card-subtitle
          v-if="!mini"
          class="ma-2"
        >
          {{ project.author }}
        </v-card-subtitle>

        <v-card-text v-if="!mini">
          {{ project.description | shortDescription }}
        </v-card-text>

        <v-card-actions v-if="project.id">
          <div
            class="ma-2"
            v-if="!mini"
          >Progress</div>
          <v-progress-linear
            :value="project.progress"
            color="red"
            height="30"
          >
            {{ project.progress }} %
          </v-progress-linear>
        </v-card-actions>

      </v-card>
    </v-navigation-drawer>

    <v-fade-transition mode="out-in">
      <router-view name="content" class="pb-0 mb-0"></router-view>
    </v-fade-transition>

    <v-bottom-navigation
      app
      dark
      class="pa-0"
      active-class="blue"
    >
      <v-btn
        v-for="route in routes"
        :key="route.key"
        :to="route.to"
        :disabled="route.requireProject && !project.id"
        height="100%"
      >
        <span>{{ route.title }}</span>

        <v-icon>{{ route.icon }}</v-icon>
      </v-btn>

      <v-btn
        height="100%"
        :to="{ name: 'user' }"
      >
        <v-avatar>
          <v-img src="https://randomuser.me/api/portraits/men/85.jpg"></v-img>
        </v-avatar>
      </v-btn>

      <v-btn
        height="100%"
        @click="signOut"
      >
        <v-icon>
          mdi-logout
        </v-icon>
      </v-btn>

    </v-bottom-navigation>
  </v-main>
</template>

<script>
  import {
    FILTERS,
  } from "@/resourses/helpers";

  export default {
    name: "MainTemplate",

    data() {
      return {
        activeRoute: "",
        mini: true,
        routes: [
          {
            to: {
              name: "main"
            },
            key: "main",
            icon: "mdi-home",
            title: "Home",
            requireProject: false,
          },

          {
            to: {
              name: "project",
            },
            key: "project",
            icon: "mdi-google-circles-extended",
            title: "Project",
            requireProject: true,
          },

          {
            to: {
              name: "processes",
            },
            key: "processes",
            icon: "mdi-lumx",
            title: "Processes",
            requireProject: true,
          },
        ]

      }
    },

    computed: {
      project() {
        return this.$store.getters.getProject;
      },

      projectName() {
        return this.project.name ?? "select your project";
      },
    },

    filters: FILTERS,

    methods: {
      signOut() {
        this.$store.dispatch("SIGN_OUT");
        this.$router.push({ name: "login" });
      },
    },

    beforeRouteEnter(to, from, next) {
      next(vm => {
        vm.$store.dispatch("LOAD_PROJECTS");
      });
    }
  };
</script>