<script>
export default {
  data() {
    return {
      active: "write",
    };
  },
};
</script>

<template>
  <div id="app">
    <div class="user-con">
      <van-image
        round
        width="3rem"
        height="3rem"
        src="https://img.yzcdn.cn/vant/cat.jpeg"
      />
      <div class="user-info">
        <span class="user-name">User137</span>
        <span class="user-group">GroupZ</span>
      </div>
      <!-- <div class="time">
        <span>2020/12/07 11:56:30</span>
      </div> -->
    </div>

    <router-view/>

    <van-tabbar v-model="active">
      <van-tabbar-item name="write" icon="home-o" to="/">Write</van-tabbar-item>
      <van-tabbar-item name="upload" icon="back-top" to="/upload">Upload</van-tabbar-item>
      <van-tabbar-item name="download" icon="down" to="/download">Download</van-tabbar-item>
      <van-tabbar-item name="server" icon="setting-o" to="/server">ServerIP</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<style>
  .user-con {
    position: relative;
    display: flex;
    flex-direction: row;
    padding: 1rem;
  }
  .user-info {
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding-left: 1rem;
  }
  .user-info span {
    line-height: 1.2rem;
  }
  .user-name {
    font-weight: 600;
  }
  .time {
    position: absolute;
    right: 1rem;
    font-size: 0.8rem;
    float: right;
    text-align: right;
    justify-content: right;
  }
</style>