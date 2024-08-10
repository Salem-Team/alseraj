<template>
    <!-- Display an img if internet is not available -->
    <div
        v-if="!isInternetAvailable"
        style="
            display: flex;
            align-items: center;
            flex-direction: column;
            gap: 10px;
            justify-content: center;
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 245px;
            height: 500px;
        "
    >
        <v-snackbar v-model="snackbar" timeout="4000" color="red">
            تحقق من إتصالك بالإنترنت!
            <template v-slot:actions>
                <v-btn color="white" variant="text" @click="snackbar = false">
                    إغلاق
                </v-btn>
            </template>
        </v-snackbar>
    </div>
</template>

<script>
import isOnline from "is-online";
export default {
    inject: ["Emitter"],
    data() {
        return {
            snackbar: false,
            isInternetAvailable: true, // Internet availability flag
        };
    },
    async created() {
        const online = await isOnline();
        if (!online) {
            console.log("انت غير متصل بالإنترنت");
            this.snackbar = true;
            this.isInternetAvailable = false;
            console.log("Internet disconnected");
        }
    },
    methods: {},
};
</script>
