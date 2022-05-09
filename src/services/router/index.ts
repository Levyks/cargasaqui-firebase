import type { Company } from "@/typings"

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
    companies: {
        path: "/companies",
        component: () => import("@/views/Companies.svelte")
    },
    company: {
        path: "/companies/:id",
        component: () => import("@/views/Company.svelte"),
        getPath: (company: Company) => `/companies/${company.id}`
    },
    notFound: {
        path: "*",
        component: () => import("@/views/NotFound.svelte")
    }
}