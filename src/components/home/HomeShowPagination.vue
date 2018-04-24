<template>
    <div class="cerchez-slider-container show-pagination">
        <div class="cerchez-slider cerchez-slider-init" data-autoslide="1" data-autoslide-timer="8000">
            <slider animation="fade" class="slider" height="100%">
                <slider-item class="item" v-for="(i, index) in imgList" :key="index">
                    <div :style="i.style">
                        <img :src="i.src"
                             width="512" height="288">
                        <div class="caption">
                            <div class="text">{{i.text}}</div>
                        </div>
                    </div>
                </slider-item>
            </slider>
        </div>
    </div>
</template>

<script>
    import { Slider, SliderItem } from 'vue-easy-slider'

    let imgList;

    setInit();

    export default {
        name: "home-show-pagination",
        components: {
            Slider,
            SliderItem
        },
        data() {
            return {
                imgList : imgList
            }
        },
        methods : {
        }
    }

    function setInit() {
        imgList = [
            {   src : 'http://liviucerchez.com/cross/wp-content/uploads/sites/10/2014/03/slide1.jpg'
                ,text : 'Hello, my minimal friends!'
            }
            ,{  src : 'http://liviucerchez.com/cross/wp-content/uploads/sites/10/2014/03/slide2.jpg'
                ,text : 'Give it to me clean and raw.'
            }
            ,{  src : 'http://liviucerchez.com/cross/wp-content/uploads/sites/10/2014/03/slide3.jpg'
                ,text : 'Keep it simple, keep it stupid.'
            }
        ]
    }
</script>

<style scoped>
    .cerchez-slider-container {
        position: relative;
        width: 100%;
        height: 0;
        overflow: hidden;
        padding-bottom: 56.26%;
    }

    .cerchez-slider {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
    }
</style>