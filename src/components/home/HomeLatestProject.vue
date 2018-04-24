<template>
    <div>
        <h2 class="section-title"><span>Latest Projects</span></h2>
        <div class="col grid3 pct" :class="i.grid" style="" v-for="(i, index) in projectList" :key="index">
            <div class="thumb">
                <a href="http://liviucerchez.com/cross/wp-content/uploads/sites/10/2014/02/typography-set.jpg"
                   class="lightbox" data-fancybox-group="projects">
                    <img :src="i.thumbnail"
                         width="450" height="300" alt="">
                    <span class="mask"><span class="action"><em
                            class="icon-cross3"></em><strong>Details</strong></span></span>
                    <span class="bottom-arrow"></span>
                </a>
                <div class="thumb-info"><h3>{{i.thumbnailInfo}}</h3>
                    <a class="likes" data-id="105"
                       data-singular="like"
                       data-plural="likes"><span class="no">11</span><em></em>
                    </a>
                </div>
            </div>
        </div>

        <div class="clear"></div>
        <br>
        <div class="clear"></div>
        <br>
    </div>
</template>

<script>

    let projectList;

    setInit();

    export default {
        name: "home-latest-project",
        data () {
            return {
                projectList : projectList
            }
        }
    }

    function setInit() {
        projectList = [
            {
                url: "http://liviucerchez.com/cross/wp-content/uploads/sites/10/2014/02/typography-set.jpg",
                thumbnail: "http://liviucerchez.com/cross/wp-content/uploads/sites/10/2014/02/typography-set-900x600_c.jpg",
                thumbnailInfo: "Typography Set",
                grid: "alpha"

            },
            {
                url: "http://liviucerchez.com/cross/wp-content/uploads/sites/10/2014/02/sketch.jpg",
                thumbnail: "http://liviucerchez.com/cross/wp-content/uploads/sites/10/2014/02/sketch-900x600_c.jpg",
                thumbnailInfo: "Clean Sketch",
                grid : ""
            },
            {
                url: "http://liviucerchez.com/cross/wp-content/uploads/sites/10/2014/02/logo-collection.jpg",
                thumbnail: "http://liviucerchez.com/cross/wp-content/uploads/sites/10/2014/02/logo-collection-900x600_c.jpg",
                thumbnailInfo: "Logotypes",
                grid : ""
            },
            {
                url: "http://liviucerchez.com/cross/wp-content/uploads/sites/10/2014/02/logos-2012.jpg",
                thumbnail: "http://liviucerchez.com/cross/wp-content/uploads/sites/10/2014/02/logos-2012-900x600_c.jpg",
                thumbnailInfo: "Logo Mockup",
                grid : "omega"
            },
            {
                url: "http://liviucerchez.com/cross/wp-content/uploads/sites/10/2014/02/bugs.jpg",
                thumbnail: "http://liviucerchez.com/cross/wp-content/uploads/sites/10/2014/02/bugs-900x600_c.jpg",
                thumbnailInfo: "Sweet Bugs",
                grid : "alpha"
            },
            {
                url: "http://liviucerchez.com/cross/wp-content/uploads/sites/10/2014/02/lettering.jpg",
                thumbnail: "http://liviucerchez.com/cross/wp-content/uploads/sites/10/2014/02/lettering-900x600_c.jpg",
                thumbnailInfo: "Lettering",
                grid : ""
            },
            {
                url: "http://liviucerchez.com/cross/wp-content/uploads/sites/10/2014/02/ipad-game.jpg",
                thumbnail: "http://liviucerchez.com/cross/wp-content/uploads/sites/10/2014/02/ipad-game-900x600_c.jpg",
                thumbnailInfo: "Game Preview",
                grid : ""
            },
            {
                url: "http://liviucerchez.com/cross/wp-content/uploads/sites/10/2014/02/talents.jpg",
                thumbnail: "http://liviucerchez.com/cross/wp-content/uploads/sites/10/2014/02/talents-900x600_c.jpg",
                thumbnailInfo: "Sketched Idea",
                grid : "omega"
            }
        ]
    }
</script>

<style scoped>

</style>