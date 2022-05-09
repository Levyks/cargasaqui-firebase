
export const routes = {
    home: {
        path: "/",
        component: () => import("@/views/Home.svelte")
    },
    login: {
        path: "/login",
        component: () => import("@/views/Login.svelte")
    },
    profile: {
        path: "/profile",
        component: () => import("@/views/Profile.svelte")
    },
    notFound: {
        path: "*",
        component: () => import("@/views/NotFound.svelte")
    }
}