<template>
    <div ref="swiper" class="swiper-container">
        <div class="swiper-wrapper">
            <div class="swiper-slide" v-for="item in items">
                <img class="w-full" :src="item" style="height: 400px" />
            </div>
        </div>

        <div class="swiper-pagination"></div>

        <div @click="prev" class="swiper-button-prev"></div>
        <div @click="next" class="swiper-button-next"></div>

        <div class="swiper-scrollbar"></div>
    </div>
</template>

<script>
import Swiper from "swiper";
import "swiper/dist/css/swiper.css";

export default {
    props: {
        itemsx: {
            default: () => []
        }
    },
    data: () => ({
        swiper: null,
        items: [
            "/dist/images/banner/index0.jpg",
            "/dist/images/banner/index1.jpg",
            "/dist/images/banner/index2.jpg",
            "/dist/images/banner/index3.jpg"
        ]
    }),

    mounted() {
        this.swiper = new Swiper(this.$refs.swiper, {
            speed: 400,
            // autoHeight: true,
            autoplay: {
                delay: 3000
            }
        });
    },

    methods: {
        prev() {
            this.swiper.slidePrev();
        },

        next() {
            this.swiper.slideNext();
        }
    }
};
</script>
