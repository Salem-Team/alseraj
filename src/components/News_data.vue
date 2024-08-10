<template>
    <div style="width: 100% !important; margin: auto; padding: 40px 0px">
        <!-- News Section -->
        <div class="use">
            <div class="title">
                <div class="right">الأخبار</div>
            </div>
        </div>

        <!-- News Cards Container -->
        <Empty_error v-if="empty === true" :text="text0" />
        <v-container
            class="box d-flex align-center justify-space-around"
            v-if="(!loading1, empty === false)"
        >
            <!-- News Card Loop -->
            <v-card
                class="feat"
                v-for="New in News"
                :key="New.id"
                width="20%"
                @click.="news.New_Information(New)"
                @click="dialog_6 = true"
            >
                <v-skeleton-loader v-if="loading2" type="image">
                </v-skeleton-loader>
                <!-- Image -->
                <v-img
                    :src="New.image"
                    height="300"
                    cover
                    loading="lazy"
                    @load="handleImageLoad"
                ></v-img>

                <!-- Title -->
                <v-card-text
                    class="card_title d-flex justify-center flex-wrap"
                    style="z-index: 100"
                >
                    {{ New.title }}
                </v-card-text>

                <!-- Time -->
                <v-card-subtitle style="margin-top: 20px">
                    {{ New.time.toDate().toLocaleString() }}
                </v-card-subtitle>

                <!-- Description -->
                <v-card-text>
                    <div style="width: 90% !important; margin: auto">
                        <p
                            v-html="New.description"
                            style="color: var(--therd-color) !important"
                        ></p>
                    </div>
                </v-card-text>
            </v-card>
            <!-- Display each photo -->
            <v-dialog v-model="dialog_6" width="90%">
                <v-card width="100%" class="popup">
                    <div
                        class="d-flex justify-space-between align-center title"
                    >
                        <div style="color: var(--main-color)">الصور</div>
                        <v-btn
                            icon="mdi-close"
                            @click="dialog_6 = false"
                        ></v-btn>
                    </div>
                    <v-carousel
                        :show-arrows="showArrows"
                        hide-delimiters
                        height="100%"
                    >
                        <v-carousel-item
                            class="pa-5 text-center"
                            :src="news.Image_Information"
                            height="400"
                        ></v-carousel-item>
                        <v-carousel-item
                            class="pa-5 text-center"
                            v-for="New in News"
                            :key="New.id"
                            :src="New.image"
                            height="400"
                        ></v-carousel-item>
                        <template v-slot:next="{ props }">
                            <v-icon
                                style="
                                    text-align: center;
                                    color: var(--main-color);
                                "
                                @click="props.onClick"
                                class="pa-10 carousel-arrow next-arrow"
                                >mdi-menu-right</v-icon
                            >
                        </template>
                        <template v-slot:prev="{ props }">
                            <v-icon
                                style="
                                    text-align: center;
                                    color: var(--main-color);
                                "
                                @click="props.onClick"
                                class="pa-10 carousel-arrow prev-arrow"
                                >mdi-menu-left</v-icon
                            >
                        </template>
                    </v-carousel>
                </v-card></v-dialog
            >
        </v-container>

        <!-- Button to Load More News -->
        <div v-if="News.length < 4" class="btn">
            <v-btn
                style="
                    background-color: var(--main-color) !important;
                    color: white !important;
                    width: 20%;
                "
                @click="$router.push('/News_more')"
                >المزيد</v-btn
            >
        </div>
    </div>
</template>

<script>
import { storeToRefs } from "pinia";
import { defineComponent } from "vue";
import { useNews } from "@/store/News.js";
import Empty_error from "@/components/Empty_error.vue";
export default defineComponent({
    inject: ["Emitter"],
    components: {
        Empty_error,
    },
    setup() {
        // Access the News store
        const news = useNews();

        // Initialize or fetch data on component setup
        news.Get_splice();

        // Destructure reactive references and methods from News store
        const {
            New,
            loading,
            text0,
            empty,
            loading1,
            Get_data,
            News,
            dialog_6,
            New_Information,
        } = storeToRefs(news);

        // Return the necessary reactive properties and methods
        return {
            New,
            text0,
            empty,
            dialog_6,
            New_Information,
            loading,
            loading1,
            Get_data,
            news,
            News,
        };
    },
    data() {
        return {
            showArrows: true,
            loading2: true,
        };
    },
    mounted() {
        this.updateArrowVisibility();
        window.addEventListener("resize", this.updateArrowVisibility);
    },
    methods: {
        handleImageLoad() {
            // This method is called when the image has fully loaded
            this.loading2 = false;
        },
        updateArrowVisibility() {
            this.showArrows = window.innerWidth >= 700;
        },
    },
});
</script>

<style lang="scss" scoped>
.use {
    width: fit-content !important;
    margin: auto;

    /* Title Styling */
    .title {
        text-transform: uppercase;
        color: var(--main-color);
        margin: 0 auto 80px;
        border: 2px solid var(--main-color);
        padding: 10px 20px;
        font-size: 30px;
        width: fit-content;
        position: relative;
        z-index: 1;
        transition: 0.3s;
    }

    /* Title Pseudo-elements */
    .title::before {
        content: "";
        width: 12px;
        height: 12px;
        background-color: var(--main-color);
        position: absolute;
        border-radius: 50%;
        top: 50%;
        right: -30px;
        transform: translateY(-50%);
    }
    .title::after {
        content: "";
        width: 12px;
        height: 12px;
        background-color: var(--main-color);
        position: absolute;
        border-radius: 50%;
        top: 50%;
        left: -30px;
        transform: translateY(-50%);
    }
    .title:hover::before {
        z-index: -1;
        animation: right-move 0.5s linear forwards;
    }
    .title:hover::after {
        z-index: -1;
        animation: left-move 0.5s linear forwards;
    }
    .title:hover {
        color: white;
        border: 2px solid white;
        transition-delay: 0.5s;
    }
}

/* Box and Card Styling */
.box {
    flex-wrap: wrap !important;
    gap: 10px !important;
    align-items: stretch !important;
}
.card_title {
    color: var(--main-color);
    margin: auto;
    width: fit-content;
    border-bottom: 2px solid var(--main-color);
    font-weight: bold;
    font-size: 20px;
}
.v-card {
    text-align: center !important;
    box-shadow: 5px 10px var(--secound-color);
    margin-left: 6px !important;
}

/* Media Queries */
@media (min-width: 769px) {
    .v-container {
        flex-direction: row;
        gap: 15px;
        align-items: stretch !important;
    }

    .feat {
        width: 32% !important;
    }
}

/* Keyframe Animations */
@keyframes left-move {
    50% {
        left: 0;
        width: 12px;
        height: 12px;
    }
    100% {
        left: 0;
        border-radius: 0;
        width: 50%;
        height: 100%;
    }
}
@keyframes right-move {
    50% {
        right: 0;
        width: 12px;
        height: 12px;
    }
    100% {
        right: 0;
        border-radius: 0;
        width: 50%;
        height: 100%;
    }
}

/* Button Styling */
.btn {
    margin: auto !important;
    text-align: center;
    margin-top: 40px !important;
}
.popup .title {
    padding: 20px 20px 0 !important;
    font-size: 23px;
    font-weight: bold;
    color: var(--main-color);
    position: relative;
    margin-bottom: 15px;
    &::before {
        content: "";
        position: absolute;
        bottom: -15px;
        height: 3px;
        width: calc(100% - 40px);
        background: var(--secound-color);
        left: 50%;
        transform: translateX(-50%);
    }
}
.v-btn--icon.v-btn--density-default {
    color: var(--main-color);
    width: auto;
    height: auto;
    box-shadow: none;
    &:hover {
        background: #fff;
    }
}
@media (max-width: 700px) {
    .box {
        flex-direction: column !important;
    }
    .feat {
        width: 100% !important;
    }
}

@media (min-width: 700px) and (max-width: 950px) {
    .feat {
        width: 47% !important;
    }
}
@media (min-width: 1080px) {
    .v-img::before {
        content: "";
        position: absolute;
        bottom: 0;
        right: 0;
        border-style: solid;
        border-width: 0px 0px 130px 300px;
        border-color: transparent transparent white transparent;
        transition: 0.3s;
    }
    .v-card:hover .v-img::before {
        border-width: 0px 580px 270px 0;
    }
}
</style>
