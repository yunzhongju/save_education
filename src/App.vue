<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
		components:{
		},
    provide() {	
        return {
            reloadAll: this.reloadAll,
        }
    },
    data() {
        return {
            isRouterAlive: true,
						loading:null
        }
    },
    methods: {
        reloadAll() {
            this.isRouterAlive = false
            this.$nextTick(() => {
                this.isRouterAlive = true
            })
        },
				
    },
		created() {
			this.$store.commit('initUser')
		}
}
</script>

<style >
	@import url("./utils/css/bootstrap.min.css");
	.point{
		cursor: pointer;
	}
	.hide-scollBar{
		overflow-y: scroll;
		-ms-overflow-style: none;
		overflow: -moz-scrollbars-none;
	}
	.hide-scollBar::-webkit-scrollbar {
		width: 0 !important;
	}
</style>
