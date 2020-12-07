<script>
import { Toast } from 'vant'
import axios from 'axios'
export default {
  data(){
    return {
      // message:'',
      fileList: [],
      imgUrl: '',
      twitterUrl: '',
      downloadUrl: '',
      serverIP: localStorage.getItem('server-ip') || this.$store.state.serverIP || '',
      message:''
    }
  },
  methods: {
    selecFile() {
      const selectBtn = this.$refs.selectBtn;
      selectBtn.click()
    },

    changeImg(img) {
      console.log(img)

      this.fileList = img.target.files
      this.downloadUrl = this.fileList[0].name

    },
    download() {
      const vm = this
      let params = new FormData()
      params.append('file', vm.fileList[0])
      console.log(params.get('file'))

      let config = {
        headers: { //添加请求头
          'Content-Type': 'multipart/form-data'
        }
      }
      return new Promise((resolve, reject) => {
        axios.post('http://' + vm.serverIP+':50000/twitter/download?url=' + vm.twitterUrl, params, config).then(res => {
          console.log(res)

          // axios.post('http://' + vm.serverIP+':50000/read/image', params, config).then(res => {
          //   console.log(res)
          //   }).catch(err => {
          //     Toast.fail('系统异常')
          //     reject(err)
          // });
            
        }).catch(err => {
          Toast.fail('系统异常')
          reject(err)
        });
        
      })
    }
  },
};
</script>
<template>
  <div>

    <van-cell-group title="Twitter URL">
      <van-field v-model="twitterUrl" />
    </van-cell-group>

    <!-- <van-cell-group title="Output folder">
      <van-row type="flex">
        <van-col span="16">
          <van-field v-model="value" />
        </van-col>
        <van-col span="8">
          <van-uploader>
            <van-button icon="plus" type="info">Select</van-button>
          </van-uploader>
        </van-col>
      </van-row>
    </van-cell-group> -->

    <van-cell-group title="Output folder">
      <van-row type="flex" justify="space-between">
        <van-col span="16">
          <van-field v-model="downloadUrl" />
        </van-col>
        <van-col span="8">
          <van-button type="info" @click="selecFile" style="width: 100%">Select</van-button>
          <input ref="selectBtn" type="file" style="display: none;" @change="changeImg" webkitdirectory/>
        </van-col>
      </van-row>
    </van-cell-group>

    <div class="btn-con">
      <van-button type="info" size="large" @click="download">Download</van-button>
    </div>

    <van-cell-group title="Embedded text">
      <van-field
        v-model="message"
        rows="2"
        autosize
        type="textarea"
        maxlength="50"
      />
    </van-cell-group>
  </div>
</template>

<style>
  .btn-con {
    padding: 1rem;
  }
</style>