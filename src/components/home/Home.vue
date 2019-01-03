<template>
    <div>
        <cp-header></cp-header>
        <section id="content" class="container">
            <div class="col grid12" style="">
                <div class="ajax-post-container">
                    <home-show-pagination></home-show-pagination>
                    <home-our-service></home-our-service>
                    <home-latest-project></home-latest-project>
                    <home-our-team></home-our-team>
                </div>
            </div>
        </section>
        <cp-footer></cp-footer>
    </div>
</template>

<script>
    import CpHeader from "../CpHeader.vue";
    import CpFooter from "../CpFooter.vue";
    import HomeShowPagination from "./HomeShowPagination.vue";
    import HomeOurService from "./HomeOurService.vue";
    import HomeLatestProject from "./HomeLatestProject.vue";
    import HomeOurTeam from "./HomeOurTeam.vue";

    export default {
        components: {
            CpFooter,
            CpHeader,
            HomeOurTeam,
            HomeLatestProject,
            HomeOurService,
            HomeShowPagination},
        name: "home"
    }
</script>

<style scoped>

</style>