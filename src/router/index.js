import Vue from "vue";
import VueRouter from "vue-router";
import HomeView from "../views/HomeView.vue";
import CreateEmp from "../views/CreateEmp.vue";
import EditEmp from "../views/EditEmp.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/create",
    component: CreateEmp,
  },
  {
    path: "/edit-emp/:id",
    component: EditEmp,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
