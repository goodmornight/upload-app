<script>
import { Toast } from 'vant'
import axios from 'axios'
// import queryString from 'query-string'

export default {
  data(){
    return {
      message: '', // 隐写文本
      imgName: '',  // 图片名 
      fileList: [], // 上传文件
      // fileList2: [],
      serverIP: localStorage.getItem('server-ip') || this.$store.state.serverIP || '', // 请求服务器ip
      isLoading: false
    }
  },

  methods: {
    // beforeRead(file) {
    //   console.log(file)
    //   if (file.type !== 'image/jpeg') {
    //     Toast('只允许上传jpg格式的图片！')
    //     return
    //   }
    //   this.imgUrl = file.name
      
    // },
    // afterRead(file) {
    //   // 此时可以自行将文件上传至服务器
    //   console.log(file);
    // },

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
      this.isLoading = true

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
        axios.post('http://' + vm.serverIP+':50000/write/image?text=' + vm.message, params, config).then(res => {
          vm.isLoading = false
          console.log(res)
            // if (res && res.data && res.data.status === 1) {       //如果为真 resolve出去
            //   resolve(res.data)
            // } else {
            //   //否则 Toast 提示
            //   Toast.fail(res.data && (res.data.msg))
            //   reject(res.data)
            // }
          }).catch(err => {
            vm.isLoading = false
            Toast.fail('系统异常')
            reject(err)
        });
      })
    }
  },
};
</script>
<template>
  <div class="write-container">

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
      <van-row type="flex" justify="space-between">
        <van-col span="16">
          <van-field v-model="imgUrl" />
        </van-col>
        <van-col span="8">
          <van-uploader
            v-model="fileList2"
            :before-read="beforeRead"
            :after-read="afterRead"
            >
            <van-button icon="plus" type="primary">Select</van-button>
          </van-uploader>
        </van-col>
      </van-row>
    </van-cell-group> -->

    <van-cell-group title="Embedded text">
      <van-field
        v-model="message"
        rows="2"
        autosize
        type="textarea"
        maxlength="150"
        placeholder="Embedded text..."
        show-word-limit
      />
    </van-cell-group>

    <!-- <van-cell-group title="Output file">
      <van-field v-model="value" />
    </van-cell-group> -->

    <div class="btn-con">
      <van-button :loading="isLoading" loading-text="Write..." type="info" size="large" @click="upload">Write</van-button>
    </div>
    
  </div>
</template>

<style>
.write-container {
  padding-top: 2rem;
}
.btn-con {
  padding: 1rem;
}
</style>