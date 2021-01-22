// import axios from 'axios';

const state = {
  project: {},
  projects: [],
};

const getters = {
  getProject: state => state.project,

  getProjects: state => state.projects,
};

const mutations = {
  SET_PROJECT: (state, payload) => {
    state.project = payload;
  },

  SET_PROJECTS: (state, payload) => {
    state.projects = payload;
  },
};

const actions = {
  LOAD_PROJECTS: ({ state, commit }) => {
    return new Promise( (resolve) => {
      console.log({ LOAD_PROJECTS_STATE: state})
      if (state.projects.length) resolve(state.projects);

      else {
        let projectVariants = [
          {
            name: "Porco Rosso",
            author: "Hayao Miadzaki",
            img: require("@/assets/porco-rosso.jpg"),
          },

          {
            name: "Gurren Laggan",
            author: "Studio Trigger",
            img: require("@/assets/posters/gurren-laggan.jpg"),
          },

          {
            name: "JoJo's Bizarre Adventure",
            author: "David Production",
            img: require("@/assets/posters/jojo.jpg"),
          },
        ];
        let projects = [];

        for (let i = 1; i < 10; i++) {
          let p = projectVariants[Math.floor(Math.random() * projectVariants.length)];
          p = {...p};
          p.id = i;
          p.description = `Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla ariatur?`;
          p.progress = Math.floor(Math.random() * 100);
          projects.push(p);
        }

        commit("SET_PROJECTS", [...projects]);
        resolve(projects);
      }
    })
  },
};


export default {
  state,
  getters,
  mutations,
  actions,
};