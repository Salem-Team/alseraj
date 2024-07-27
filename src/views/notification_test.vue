<template>
    <div>
        <div class="text-center ma-2">
            <v-btn @click="send_Notification(this.title, this.text)"
                >test
            </v-btn>
        </div>
    </div>
</template>
<script>
import { mapActions } from "pinia";
import { usenotification } from "../store/notification.js";
export default {
    data() {
        return {
            text: "test",
            title: "add",
        };
    },
    methods: {
        ...mapActions(usenotification, ["send_Notification"]),
    },
};
</script>
<style lang="sass" scoped></style>
