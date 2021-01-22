import Vue from 'vue';
import Router from 'vue-router';
import MainTemplate from "@/components/MainTemplate";
import MainAuthTemplate from "@/components/MainAuthTemplate";

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
    path: "/main",
    component: MainTemplate,
    meta: {
      title: 'Main',
    },
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

  else if (to.fullPath != from.fullPath) next();

  else next();
});

router.afterEach((to) => {
  document.title = to.meta.title;
});

export default router;
