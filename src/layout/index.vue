<template>
    <div :class="$options.name">
        <header>全局标题</header>
        <div class="main">
            <slot></slot>
        </div>
    </div>
</template>

<script>
export default {
    name: 'layout',
    data() {
        return {
        };
    }
};
</script>

<style lang="sass" scoped>

</style>