<template>
  <div id="app">
    <router-view v-if="isRouterAlive"/>
  </div>
</template>

<script>
export default {
    provide() {
        return {
            reloadAll: this.reloadAll
        }
    },
    data() {
        return {
            isRouterAlive: true
        }
    },
    methods: {
        reloadAll() {
            this.isRouterAlive = false
            this.$nextTick(() => {
                this.isRouterAlive = true
            })
        }
    }
}
</script>

<style lang="less">
</style>
