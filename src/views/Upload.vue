<script>
import { Toast } from 'vant'
import axios from 'axios'

export default {
  data(){
    return {
      // message:'',
      fileList: [], // 上传文件
      imgName: '', // 上传图片名
      twitterUrl: '',
      serverIP: localStorage.getItem('server-ip') || this.$store.state.serverIP || ''
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
      this.imgName = this.fileList[0].name

    },
    upload() {
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
        //把 uploadUrl 换成自己的 上传路径
        axios.post('http://' + vm.serverIP+':50000/twitter/upload', params, config).then(res => {
          console.log(res)
          // if (res && res.data && res.data.status === 1) {       //如果为真 resolve出去
          //   resolve(res.data)
          // } else {
          //   //否则 Toast 提示
          //   Toast.fail(res.data && (res.data.msg))
          //   reject(res.data)
          // }
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

    <van-cell-group>
      <van-row type="flex" justify="space-between">
        <van-col span="16">
          <van-field v-model="imgName" />
        </van-col>
        <van-col span="8">
          <van-button type="info" @click="selecFile" style="width: 100%">Select</van-button>
          <input ref="selectBtn" type="file" style="display: none;" @change="changeImg">
        </van-col>
      </van-row>
    </van-cell-group>
    <!-- <van-cell-group>
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

    <div class="btn-con">
      <van-button type="info" size="large" @click="upload">Upload</van-button>
    </div>

    <van-cell-group title="Twitter URL">
      <van-field
        v-model="twitterUrl"
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