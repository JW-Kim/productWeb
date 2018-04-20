<template>
    <div id="menu" v-bind:class="{collapse : menuOpenYn}"
         @mouseover="openMenu"
         @mouseleave="closeMenu"
    >
        <nav>
            <ul @click="closeMenu">
                <li id="menu-item-1308"
                    class="menu-item menu-item-type-post_type menu-item-object-page menu-item-home current-menu-item page_item page-item-10 current_page_item menu-item-1308">
                    <router-link to="/home">Home</router-link>
                </li>
                <li id="menu-item-1310"
                    class="menu-item menu-item-type-post_type menu-item-object-page menu-item-1310">
                    <router-link to="/portfolio">Portfolio</router-link>
                </li>
                <li id="menu-item-1309"
                    class="menu-item menu-item-type-post_type menu-item-object-page menu-item-1309">
                    <router-link to="/shop">Shop</router-link>
                </li>
                <li id="menu-item-1317"
                    class="menu-item menu-item-type-post_type menu-item-object-page menu-item-1317">
                    <router-link to="/contact">Contact</router-link>
                </li>
            </ul>
        </nav>
        <span id="menu-toggle"
              v-on:click="toogleMenu"
        ><em></em></span>
    </div>
</template>

<script>
    export default {
        name: "cp-header-menu",
        data() {
            return {
                menuOpenYn: false
            }
        },
        methods: {
            toogleMenu() {
                this.menuOpenYn = !this.menuOpenYn;
            },
            openMenu() {
                this.menuOpenYn = true;
            },
            closeMenu() {
                this.menuOpenYn = false;
            }
        }
    }
</script>

<style scoped>

</style>