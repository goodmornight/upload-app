<script>
export default {
  data(){
    return {
      value: localStorage.getItem('server-ip') || this.$store.state.serverIP || ''
    }
  },
  methods: {
    setIP() {
      this.$store.dispatch('setServerIP', this.value)
    }
  },
};
</script>

<template>
  <div>
    <van-cell-group title="Server IP">
      <van-field v-model="value" placeholder="Set server IP..."/>
    </van-cell-group>
    <div class="btn-con">
      <van-button type="info" size="large" @click="setIP">Set</van-button>
    </div>
  </div>
</template>

<style>
  .btn-con {
    padding: 1rem;
  }
</style>