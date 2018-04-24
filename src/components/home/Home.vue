<template>
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
</template>

<script>
    import HomeShowPagination from "./HomeShowPagination.vue";
    import HomeOurService from "./HomeOurService.vue";
    import HomeLatestProject from "./HomeLatestProject.vue";
    import HomeOurTeam from "./HomeOurTeam.vue";

    export default {
        components: {
            HomeOurTeam,
            HomeLatestProject,
            HomeOurService,
            HomeShowPagination},
        name: "home"
    }
</script>

<style scoped>

</style>