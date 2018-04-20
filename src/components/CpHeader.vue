<template>
    <header id="header" class="container">
        <div class="wrapper">
            <div class="cell cell-left textleft">
                <cp-header-menu></cp-header-menu>
            </div>
            <div class="cell cell-middle textcenter">
                <div id="logo"><h1><a href="http://liviucerchez.com/cross/" rel="home"><img
                        src="/images/logo1.png" width="250"
                        height="106" alt="Cross"></a></h1></div>
            </div>
            <div class="cell cell-right textright">
                <!--                <div id="shopping-bag-panel"><a id="shopping-bag-toggle" href="http://liviucerchez.com/cross/cart/"><em
                                        class="icon-bag"></em> <strong><span class="woocommerce-Price-amount amount"><span
                                        class="woocommerce-Price-currencySymbol">$</span>0</span></strong></a></div>-->
            </div>
        </div>
    </header>
</template>

<script>
    import CpHeaderMenu from "./CpHeaderMenu.vue";

    export default {
        components: {CpHeaderMenu},
        name: "cp-header"
    }
</script>

<style scoped>

</style>