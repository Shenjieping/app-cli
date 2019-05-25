<template>
    <div :class="$options.name">
        测试页面
        <van-button>button</van-button>
    </div>
</template>

<script>
export default {
    name: 'hello-world',
    data() {
        return {
        };
    }
};
</script>

<style lang="sass" scoped>
.hello-world
    font-size: 28px
</style>