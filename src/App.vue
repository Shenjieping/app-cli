<template>
    <div id="app">
        <layout>
            <transition name="fade-in" mode="out-in" appear>
                <router-view :key="routeKey"></router-view>
            </transition>
        </layout>
    </div>
</template>

<script>
import Layout from '@/layout';

export default {
    name: 'App',
    components: {
        Layout
    },
    computed: {
        routeKey() {
            return this.$route.fullPath && this.$route.fullPath.split('?')[0];
            // return this.$route.fullPath;
        }
    }
};
</script>
<style lang="sass" scoped>

</style>

