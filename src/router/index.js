import Vue from "vue";
import VueRouter from "vue-router";
import Menu from "../components/Menu/Menu";

Vue.use(VueRouter);

const routes = [
    {
        path: "/",
        name: "Menu",
        component: Menu
    },
    {
        path: "/join-party",
        name: "JoinPartyStep1",
        component: () =>
            import("../components/Menu/JoinPartyStep1.vue")
    },
    {
        path: "/join-party/party/:partyId",
        name: "JoinPartyStep2",
        component: () =>
            import("../components/Menu/JoinPartyStep2.vue")
    },
    {
        path: "/create-party",
        name: "CreateParty",
        component: () =>
            import("../components/Menu/CreateParty.vue")
    },
    {
        path: "/party/:partyId",
        name: "Party",
        component: () =>
            import("../components/Party/Party.vue")
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
