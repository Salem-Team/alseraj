import { defineStore } from "pinia";

export const useAuthStore = defineStore("auth", {
    state: () => ({
        user: {
            id: "",
            email: "",
            National_id: "",
            password: "",
            userType: "",
            roles: [],
            name: "",
            phone: "",
        },
        loading: false,
        error: null,
    }),
    actions: {
        get_Cookies() {
            // Retrieve the user data from local storage
            const user_data = localStorage.getItem("user");

            // Check if user_data is not null or undefined
            if (user_data) {
                try {
                    // Attempt to parse the JSON string
                    this.user = JSON.parse(user_data);
                } catch (error) {
                    console.error(
                        "Failed to parse user data from local storage:",
                        error
                    );
                    // Handle the error as needed, for example, set `this.user` to a default value or an empty object
                    this.user = {
                        id: "",
                        email: "",
                        Parent_national_id: "",
                        National_id: "",
                        password: "",
                        userType: "",
                        roles: [],
                        name: "",
                        phone: "",
                    };
                }
            } else {
                // Handle cases where the local storage item does not exist or is empty
                this.user = {
                    id: "",
                    email: "",
                    Parent_national_id: "",
                    National_id: "",
                    password: "",
                    userType: "",
                    roles: [],
                    name: "",
                    phone: "",
                };
            }
        },

        async login(
            id,
            email,
            Parent_national_id,
            National_id,
            userType,
            roles,
            name,
            password,
            phone
        ) {
            this.loading = true;
            try {
                // Verify email and password (implementation not shown here)
                if (userType === "student") {
                    this.user = {
                        id,
                        email,
                        Parent_national_id,
                        National_id,
                        userType,
                        roles,
                        name,
                        password,
                        phone,
                    };
                    this.error = null;
                } else {
                    this.user = {
                        id,
                        email,
                        National_id,
                        userType,
                        roles,
                        name,
                        password,
                        phone,
                    };
                    this.error = null;
                }

                // Store user data in localStorage
                localStorage.setItem("user", JSON.stringify(this.user));
            } catch (error) {
                this.error = error.message;
            } finally {
                this.loading = false;
            }
        },
        logout() {
            this.user = {
                id: "",
                email: "",
                Parent_national_id: "",
                National_id: "",
                password: "",
                userType: "",
                roles: [],
                name: "",
                phone: "",
            };

            // Remove user data from local storage
            localStorage.removeItem("user");
        },
        // لإخفاء الخطأ بعد 5 ثوانٍ
        clearError() {
            setTimeout(() => {
                this.error = null;
            }, 5000);
        },
    },
});
