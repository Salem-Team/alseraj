import { createRouter, createWebHistory } from "vue-router";
import Classes from "../views/The_Classes.vue";
import ClassPage from "../views/classs_page.vue";
import TheAdministrator from "../views/TheAdministrator.vue";
import HomeView from "../views/HomeView.vue";
import UserLogin from "../views/USerLogin.vue";
import profile_view from "../views/profile_view.vue";
import Top_Board from "../views/Top_Board.vue";
import Add_News from "../views/Add_News.vue";
import Add_job from "../views/Add_job.vue";
import jobs_more from "../views/jobs_more.vue";
import News_more from "../views/News_more.vue";
import Photos_more from "../views/Photos_more.vue";
import Photo_Gallery from "../views/Photo_Gallery.vue";
import Add_admin from "../views/Add_admin.vue";
import Add_teacher from "../views/Add_teachers.vue";
import ChildDetails from "../views/ChildDetails.vue";

const routes = [
    { path: "/", name: "home", component: HomeView },
    { path: "/UserLogin", name: "UserLogin", component: UserLogin },

    {
        path: "/ChildDetails/:id",
        name: "ChildDetails",
        component: ChildDetails,
        meta: { requiresAuth: true, requiredAuthority: "parent" },
    },

    {
        path: "/Top_Board",
        name: "Top_Board",
        component: Top_Board,
        meta: { requiresAuth: true, requiredAuthority: "admin" },
    },
    {
        path: "/Add_News",
        name: "Add_News",
        component: Add_News,
        meta: { requiresAuth: true, requiredAuthority: "admin" },
    },
    {
        path: "/Add_job",
        name: "Add_job",
        component: Add_job,
        meta: { requiresAuth: true, requiredAuthority: "admin" },
    },
    {
        path: "/profile",
        name: "profile_view",
        component: profile_view,
        meta: { requiresAuth: true },
    },
    {
        path: "/Photo_Gallery",
        name: "Photo_Gallery",
        component: Photo_Gallery,
        meta: { requiresAuth: true, requiredAuthority: "admin" },
    },
    {
        path: "/ClassRoom",
        name: "Class",
        component: Classes,
        props: true,
        meta: { requiresAuth: true },
    },
    {
        path: "/class/:year",
        name: "classPage",
        component: ClassPage,
        props: true,
        meta: { requiresAuth: true, requiredAuthority: "admin" },
    },
    {
        path: "/admin",
        name: "Admin",
        component: TheAdministrator,
        meta: { requiresAuth: true, requiredAuthority: "admin" },
    },
    {
        path: "/Add_admin",
        name: "Add_admin",
        component: Add_admin,
        meta: { requiresAuth: true, requiredAuthority: "admin" },
    },

    {
        path: "/Add_teacher",
        name: "Add_teacher",
        component: Add_teacher,
        meta: { requiresAuth: true, requiredAuthority: "admin" },
    },
    {
        path: "/jobs_more",
        name: "jobs_more",
        component: jobs_more,
    },
    {
        path: "/News_more",
        name: "News_more",
        component: News_more,
    },
    {
        path: "/Photos_more",
        name: "Photos_more",
        component: Photos_more,
    },
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
});
router.beforeEach(async (to, from, next) => {
    const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);
    const requiredAuthority = to.meta.requiredAuthority;

    // Check if route requires authentication
    // Check if route requires authentication
    if (requiresAuth) {
        try {
            // Fetch user info from local storage
            const userData = localStorage.getItem("user");

            // If local storage item does not exist or is not in JSON format
            if (!userData) {
                console.log("User data not found in local storage");
                next("/"); // Redirect to home or login page
                return;
            }

            // Parse user data from local storage
            let user;
            try {
                user = JSON.parse(userData); // Parse JSON string
            } catch (error) {
                console.error(
                    "Error parsing user data from local storage:",
                    error
                );
                next("/"); // Redirect to home or login page
                return;
            }

            // Check if user has required authority
            if (requiredAuthority && user.userType !== requiredAuthority) {
                console.log("User does not have required authority");
                next("/"); // Redirect to home or error page
                return;
            }

            // Proceed to the route
            next();
        } catch (error) {
            console.error("Error checking user:", error);
            next("/"); // Redirect to home or error page if there's an issue
        }
    } else {
        // If route does not require authentication, proceed
        next();
    }
});

export default router;
