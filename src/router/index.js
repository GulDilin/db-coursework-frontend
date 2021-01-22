import Vue from 'vue';
import Router from 'vue-router';
import MainTemplate from "@/components/MainTemplate";
import MainAuthTemplate from "@/components/MainAuthTemplate";
import store from "@/store";

Vue.use(Router);

const routes = [
  {
    path: "/authentification",
    component: MainAuthTemplate,

    children: [
      {
        path: "login",
        name: "login",
        components: {
          content: () => import("@/components/Login"),
        },
        meta: {
          requireAuth: false,
          title: "Login"
        }
      },

      {
        path: "registration",
        name: "registration",
        components: {
          content: () => import("@/components/Registration"),
        },
        meta: {
          requireAuth: false,
          title: "Registration"
        }
      },
    ]
  },


  {
    path: "/",
    component: MainTemplate,
    children: [
      {
        path: "main",
        name: "main",
        components: {
          content: () => import("@/components/HomePage")
        },
        props: {
          content: {
            title: "Main page"
          }
        },
        meta: {
          requireAuth: false,
          requireProject: false,
          title: 'Main',
        },
      },

      {
        path: "processes",
        name: "processes",
        components: {
          content: () => import("@/components/Plug")
        },
        props: {
          content: {
            title: "Processes page"
          }
        },
        meta: {
          requireAuth: false,
          requireProject: true,
          title: 'Processes',
        },
      },

      {
        path: "project",
        name: "project",
        components: {
          content: () => import("@/components/ProjectPage")
        },
        props: {
          content: {
            title: "Project page"
          }
        },
        meta: {
          requireAuth: false,
          requireProject: true,
          title: 'Project',
        },
      },

      {
        path: "",
        redirect: {
          name: "main",
        },
      },

    ]
  }

];

const router = new Router({
  routes: routes,
  mode: "history",
})

router.beforeEach((to, from, next) => {

  if (to.meta.requireAuth && to.name != 'login' && !to.query.next) {
    next({
        name: "login",
        query: {
          next: to.fullPath,
        }
    })
  }

  else if (
    to.meta.requireProject &&
    !Object.keys(store.getters.getProject).length
  ) {

    store.dispatch("PUSH_NOTIFICATION", {
      type: "warning",
      message: "Select project at first"
    })

    next({
      name: "main",
    });
  }

  else if (to.fullPath != from.fullPath) next();
});

router.afterEach((to) => {
  document.title = to.meta.title;
});

export default router;
