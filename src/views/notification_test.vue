<template>
    <div>
        <div class="text-center ma-2">
            <v-btn @click.="send_Notification" @click="snackbar = true"
                >test
            </v-btn>
            <v-snackbar sytle="text-align:left" v-model="snackbar">
                {{ notification.body }}

                <template v-slot:actions>
                    <v-btn variant="text" @click="snackbar = false">
                        Close
                    </v-btn>
                </template>
            </v-snackbar>
        </div>
    </div>
</template>
<script>
import { mapActions, mapState } from "pinia";
import { usenotification } from "../store/notification.js";
export default {
    data() {
        return {
            snackbar: false,
        };
    },
    computed: {
        ...mapState(usenotification, ["notification"]),
    },
    methods: {
        ...mapActions(usenotification, ["send_Notification"]),
    },
};
</script>
<style></style>
