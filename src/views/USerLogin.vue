<template>
    <v-container class="login-container">
        <v-card>
            <v-card-title class="text-center">Login</v-card-title>
            <v-card-text>
                <v-form @submit.prevent="handleLogin">
                    <v-select
                        v-model="userType"
                        :items="userTypes"
                        label="User Type"
                        required
                    ></v-select>
                    <v-text-field
                        v-model="National_id"
                        label="National ID"
                        type="text"
                        required
                    ></v-text-field>
                    <v-text-field
                        v-model="password"
                        label="Password"
                        type="password"
                        required
                    ></v-text-field>

                    <v-btn
                        type="submit"
                        :loading="loading"
                        :disabled="loading"
                        color="primary"
                    >
                        Login
                    </v-btn>
                    <v-alert v-if="error" type="error" class="mt-2">
                        {{ error }}
                    </v-alert>
                </v-form>
            </v-card-text>
        </v-card>
    </v-container>
</template>

<script>
import { mapState, mapActions } from "pinia";
import { useAuthStore } from "../store/userStore";
import { initializeApp } from "@firebase/app";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { useSecureDataStore } from "@/store/secureData.js";

const firebaseConfig = {
    apiKey: "AIzaSyBdk3sqIHjXvB2C-O-lvkRgMFpg8pemkno",
    authDomain: "alseraj--almoner.firebaseapp.com",
    projectId: "alseraj--almoner",
    storageBucket: "alseraj--almoner.appspot.com",
    messagingSenderId: "462211256149",
    appId: "1:462211256149:web:a03ace3c70b306620169dc",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default {
    data() {
        return {
            National_id: "",
            password: "",
            userType: "",
            userTypes: ["parent", "admin", "student"],
            error: "",
        };
    },
    computed: {
        ...mapState(useAuthStore, ["loading"]),
    },
    methods: {
        ...mapActions(useAuthStore, ["login"]),
        async Check_User() {
            const decryption = useSecureDataStore();
            let authenticatedUser = null;
            try {
                if (this.userType === "parent") {
                    const querySnapshot = await getDocs(
                        collection(db, "parents")
                    );
                    querySnapshot.forEach((doc) => {
                        if (
                            doc.id === this.National_id &&
                            doc.data().parent_pass === this.password
                        ) {
                            authenticatedUser = {
                                id: doc.id,
                                name: doc.data().name,
                                userType: "parent",
                            };
                        }
                    });
                    return authenticatedUser;
                }

                if (this.userType === "admin") {
                    const querySnapshot = await getDocs(
                        collection(db, "users")
                    );
                    querySnapshot.forEach((doc) => {
                        const decryptedNational_id = decryption.decryptData(
                            doc.data().National_id,
                            "12345a"
                        );
                        if (
                            decryptedNational_id === this.National_id &&
                            doc.data().password === this.password
                        ) {
                            authenticatedUser = {
                                id: doc.id,
                                email: decryption.decryptData(
                                    doc.data().email,
                                    "12345a"
                                ),
                                name: decryption.decryptData(
                                    doc.data().name,
                                    "12345a"
                                ),
                                userType: doc.data().userType,
                                National_id: decryptedNational_id,
                                roles: doc.data().roles,
                                password: doc.data().password,
                            };
                        }
                    });
                    return authenticatedUser;
                }

                if (this.userType === "student") {
                    const querySnapshot = await getDocs(
                        collection(db, "students")
                    );
                    querySnapshot.forEach((doc) => {
                        if (
                            doc.id === this.National_id &&
                            doc.data().password === this.password
                        ) {
                            authenticatedUser = {
                                id: doc.id,
                                name: doc.data().student_name,
                                userType: "student",
                            };
                        }
                    });
                    return authenticatedUser;
                }
            } catch (error) {
                console.error("Error fetching users:", error);
                this.error = "An error occurred while fetching user data.";
            }
        },
        async handleLogin() {
            this.error = ""; // Clear previous error
            try {
                const authenticatedUser = await this.Check_User();
                if (authenticatedUser && authenticatedUser.id) {
                    await this.login(
                        authenticatedUser.id,
                        authenticatedUser.email || "",
                        authenticatedUser.userType,
                        authenticatedUser.roles || [],
                        authenticatedUser.name
                    );

                    // Redirect based on user type
                    if (authenticatedUser.userType === "parent") {
                        this.$router.push({ name: "Parent_Dashboard" });
                    } else if (authenticatedUser.userType === "admin") {
                        this.$router.push({ name: "profile_view" });
                    } else {
                        this.$router.push({
                            name: "Student_Dashboard",
                            params: { id: authenticatedUser.id },
                        });
                    }
                } else {
                    this.error = "Invalid National ID or Password.";
                }
            } catch (error) {
                console.error("Login error:", error);
                this.error = "An error occurred during login.";
            }
        },
    },
    watch: {
        userType(newValue) {
            if (newValue === "parent") {
                this.National_id = "852";
                this.password = "111";
            } else if (newValue === "admin") {
                this.National_id = "1210987654321";
                this.password = "123456";
            } else if (newValue === "student") {
                this.National_id = "1233214569585202";
                this.password = "111";
            }
        },
    },
};
</script>

<style scoped>
.login-container {
    max-width: 300px;
    margin: 0 auto;
    padding: 1rem;
    border: 1px solid #ccc;
    border-radius: 5px;
}
</style>
