<script>
    import CpHeader from "./CpHeader.vue";
    import CpFooter from "./CpFooter.vue";

    export default {
        name: "app",

        components: {
            CpFooter,
            CpHeader
        }
    }
</script>

<template>
  <div>
    <!--<navbar></navbar> -->
    <cp-header></cp-header>
    <router-view></router-view>
    <cp-footer></cp-footer>
  </div>
</template>