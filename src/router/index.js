import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
    {
        path: "/",
        name: "Home",
        component: () =>
            import("../components/Home.vue")
    },
    {
        path: "/startGame",
        name: "StartGame",
        component: () =>
            import("../components/StartGame.vue")
    },
    {
        path: "*",
        redirect: "/"
    }
];

const router = new VueRouter({
    mode: "history",
    base: "/",
    routes
});

export default router;
