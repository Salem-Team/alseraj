<template>
    <!-- Overlay -->
    <div
        v-if="loading1"
        style="
            z-index: 10000000000;
            background-color: white !important;
            display: flex;
            justify-content: center !important;
            align-items: center !important;
            margin: 0 auto !important;
            text-align: center !important;
            width: 100% !important;
            height: 100% !important;
            position: fixed;
            top: 0;
            left: 0;
        "
    >
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 200 200"
            class="loading"
            style="width: 20% !important"
        >
            <circle
                fill="#336699"
                stroke="#336699"
                stroke-width="2"
                r="15"
                cx="40"
                cy="65"
            >
                <animate
                    attributeName="cy"
                    calcMode="spline"
                    dur="2"
                    values="65;135;65;"
                    keySplines=".5 0 .5 1;.5 0 .5 1"
                    repeatCount="indefinite"
                    begin="-.4"
                ></animate>
            </circle>
            <circle
                fill="#336699"
                stroke="#336699"
                stroke-width="2"
                r="15"
                cx="100"
                cy="65"
            >
                <animate
                    attributeName="cy"
                    calcMode="spline"
                    dur="2"
                    values="65;135;65;"
                    keySplines=".5 0 .5 1;.5 0 .5 1"
                    repeatCount="indefinite"
                    begin="-.2"
                ></animate>
            </circle>
            <circle
                fill="#336699"
                stroke="#336699"
                stroke-width="2"
                r="15"
                cx="160"
                cy="65"
            >
                <animate
                    attributeName="cy"
                    calcMode="spline"
                    dur="2"
                    values="65;135;65;"
                    keySplines=".5 0 .5 1;.5 0 .5 1"
                    repeatCount="indefinite"
                    begin="0"
                ></animate>
            </circle>
        </svg>
    </div>

    <section class="parallax">
        <h1 id="text">مدرسة السراج المنير</h1>
        <img
            class="img_1"
            src="../assets/m_3.png"
            id="street"
            loading="lazy"
            @load="handleImageLoad"
        />
    </section>
    <div visible>
        <Photo_Gallery_data />
        <News_data />
        <Q_A />
        <job_data />
    </div>

    <v-layout class="footer" visible>
        <v-footer
            class="d-flex flex-column"
            style="width: 100% !important; margin: auto; padding: 0px"
        >
            <div
                class="c_footer px-4 w-100 d-flex align-center"
                style="background: var(--main-color); color: white"
            >
                <strong class="c_footer"
                    >تواصل معنا من خلال مواقع التواصل الاجتماعي</strong
                >

                <v-spacer></v-spacer>
                <div class="icons mx-4 d-flex align-center">
                    <v-btn
                        v-for="icon in icons"
                        :key="icon"
                        :icon="icon"
                        size="small"
                        variant="plain"
                    ></v-btn>
                </div>
            </div>

            <div
                class="px-4 py-2 text-center w-100"
                style="background: var(--secound-color)"
            >
                <strong>سالم تيم</strong> - {{ new Date().getFullYear() }}
            </div>
        </v-footer>
    </v-layout>
</template>

<script>
import job_data from "../components/job_data.vue";
import News_data from "../components/News_data.vue";
import Q_A from "../components/Q_A.vue";
import Photo_Gallery_data from "../components/Photo_Gallery_data.vue";
import { defineComponent } from "vue";
export default defineComponent({
    components: {
        job_data,
        Q_A,
        News_data,
        Photo_Gallery_data,
    },

    data() {
        return {
            loading1: true, // Show the overlay initially
            icons: [
                "mdi-facebook",
                "mdi-twitter",
                "mdi-linkedin",
                "mdi-instagram",
            ],
        };
    },
    mounted() {
        this.moveText();
    },
    methods: {
        handleImageLoad() {
            // This method is called when the image has fully loaded
            setTimeout(() => {
                this.loading1 = false;
            }, 3000);
        },
        moveText() {
            let text = document.getElementById("text");
            let street = document.getElementById("street");
            window.addEventListener("scroll", () => {
                let value = window.scrollY;
                text.style.marginTop = value * 1.5 + `px`;
                street.style.bottom = value * -0.3 + `px`;
                let scale = 1 + value * 0.002; // Adjust the scaling factor as needed
                street.style.transform = `scale(${scale})`;
            });
        },
    },
});
</script>
<style lang="scss" scoped>
body {
    overflow: hidden;
}
.parallax {
    position: relative;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background: url("../assets/m_1.png") no-repeat;
    background-size: cover;
    background-position: center;
    background-attachment: fixed;
    overflow: hidden;
    #text {
        position: absolute;
        font-size: 5em;
        color: white;
        text-shadow: 2px 4px 5px #1b283a;
        margin-top: 0px;
        top: 15%;
        transform: translate(-50%, -50%);
        left: 60%;
        width: 100%;
        text-align: center;
    }
    img {
        position: absolute;
        width: 100%;
        bottom: 0;
        left: 0;
        pointer-events: none;
    }
}
.content_header {
    color: white;
    width: 100%;
    position: relative;
    bottom: 720px;
    right: 910px;
    z-index: -1887;
    background-attachment: fixed;
}
form {
    width: 90%;
    margin: auto;
}

.use {
    width: 95% !important;
    margin: auto;
    .title {
        margin-top: 40px;
        background: var(--secound-color);
        padding: 15px 20px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 3px;
        border-radius: 5px;
        color: var(--main-color);
        font-weight: bold;
        font-size: 20px;
        & > div {
            display: flex;
            align-items: center;
            gap: 4px;
            &.left {
                .icon,
                svg {
                    cursor: pointer;
                    transition: 0.3s;
                    background: #fff;
                    padding: 10px;
                    border-radius: 5px;
                    &:hover {
                        color: var(--therd-color);
                    }
                }
                .icon {
                    padding: 20px;
                }
            }
        }
    }
}
.job {
    width: 100% !important;
    margin-bottom: 10px;
    .title {
        background: var(--main-color);
        padding: 10px 15px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 5px;
        border-radius: 5px;
        color: white;
        font-weight: bold;
        font-size: 20px;
        & > div {
            display: flex;
            align-items: center;
            gap: 10px;
            &.left {
                svg {
                    color: var(--main-color);
                    cursor: pointer;
                    transition: 0.3s;
                    background: #fff;
                    padding: 10px;
                    border-radius: 5px;
                    &:hover {
                        color: var(--therd-color);
                    }
                }
            }
        }
    }
}
.box {
    width: 95% !important;
    margin: 0 auto;
    padding: 10px 0px;
}
.visible {
    opacity: 0;
    animation: fadeIn 1s ease-in-out forwards;
}
@keyframes fadeIn {
    from {
        opacity: 0;
    }
    to {
        opacity: 1;
    }
}
@media (max-width: 700px) {
    .c_footer {
        padding-top: 10px !important;
        flex-direction: column !important;
    }
    .icons {
        flex-direction: row !important;
    }
    .parallax {
        height: 40vh !important;
        #text {
            font-size: 3rem;
            top: 20%;
        }
    }
}

@media (min-width: 700px) and (max-width: 950px) {
    .parallax {
        height: 70vh !important;
        #text {
            font-size: 3rem;
            top: 20%;
        }
    }
}
</style>
