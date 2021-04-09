<template>
<view class="van-uploader">
  <view class="van-uploader__wrapper">
    <!-- 预览样式 -->
    <view v-for="(item, index) in lists" :key="index" v-if="previewImage" class="van-uploader__preview" :data-index="index" @tap="onClickPreview">
      <image v-if="item.isImage" :mode="imageFit" :src="item.url || item.path" :alt="item.name || ('图片' + index)" class="van-uploader__preview-image" :style="'width: ' + utils.addUnit(previewSize) + '; height: ' + utils.addUnit(previewSize) + ';'" :data-index="index" @tap="onPreviewImage"></image>
      <view v-else class="van-uploader__file" :style="'width: ' + utils.addUnit(previewSize) + '; height: ' + utils.addUnit(previewSize) + ';'">
        <van-icon name="description" class="van-uploader__file-icon"></van-icon>
        <view class="van-uploader__file-name van-ellipsis">{{ item.name || item.url || item.path }}</view>
      </view>
      <view v-if="item.status === 'uploading' || item.status === 'failed'" class="van-uploader__mask">
       <van-icon v-if="item.status === 'failed'" name="warning-o" class="van-uploader__mask-icon"></van-icon>
       <van-loading v-else class="van-uploader__loading"></van-loading>
       <text v-if="item.message" class="van-uploader__upload-text">{{ item.message }}</text>
      </view>
      <van-icon v-if="deletable" name="clear" class="van-uploader__preview-delete" :data-index="index" @tap="deleteItem"></van-icon>
    </view>

    <!-- 上传样式 -->
    <block v-if="isInCount">
      <view class="van-uploader__slot" @tap="startUpload">
        <slot></slot>
      </view>

      <!-- 默认上传样式 -->
      <view v-if="showUpload" :class="'van-uploader__upload ' + ( disabled ? 'van-uploader__upload--disabled': '')" :style="'width: ' + utils.addUnit(previewSize) + '; height: ' + utils.addUnit(previewSize) + ';'" @tap="startUpload">
        <van-icon :name="uploadIcon" class="van-uploader__upload-icon"></van-icon>
        <text v-if="uploadText" class="van-uploader__upload-text">{{ uploadText }}</text>
      </view>
    </block>
  </view>
</view>
</template>

<script module="utils" lang="wxs" src="../wxs/utils.wxs"></script>

<script>
import { VantComponent } from '../common/component';
import { isImageFile, isVideo, chooseFile, isPromise } from './utils';
import { chooseImageProps, chooseVideoProps } from './shared';
import vanIcon from "../icon/index";
import vanLoading from "../loading/index";

export default {
  data() {
    return {
      lists: [],
      isInCount: true
    };
  },

  components: {
    vanIcon,
    vanLoading
  },
  props: {},
  methods: {
    formatFileList() {
      const {
        fileList = [],
        maxCount
      } = this;
      const lists = fileList.map(item => Object.assign(Object.assign({}, item), {
        isImage: typeof item.isImage === 'undefined' ? isImageFile(item) : item.isImage
      }));
      this.setData({
        lists,
        isInCount: lists.length < maxCount
      });
    },

    getDetail(index) {
      return {
        name: this.name,
        index: index == null ? this.fileList.length : index
      };
    },

    startUpload() {
      const {
        maxCount,
        multiple,
        accept,
        lists,
        disabled
      } = this;
      if (disabled) return;
      chooseFile(Object.assign(Object.assign({}, this), {
        maxCount: maxCount - lists.length
      })).then(res => {
        let file = null;

        if (isVideo(res, accept)) {
          file = Object.assign({
            path: res.tempFilePath
          }, res);
        } else {
          file = multiple ? res.tempFiles : res.tempFiles[0];
        }

        this.onBeforeRead(file);
      }).catch(error => {
        this.$emit('error', error);
      });
    },

    onBeforeRead(file) {
      const {
        beforeRead,
        useBeforeRead
      } = this;
      let res = true;

      if (typeof beforeRead === 'function') {
        res = beforeRead(file, this.getDetail());
      }

      if (useBeforeRead) {
        res = new Promise((resolve, reject) => {
          this.$emit('before-read', Object.assign(Object.assign({
            file
          }, this.getDetail()), {
            callback: ok => {
              ok ? resolve() : reject();
            }
          }));
        });
      }

      if (!res) {
        return;
      }

      if (isPromise(res)) {
        res.then(data => this.onAfterRead(data || file));
      } else {
        this.onAfterRead(file);
      }
    },

    onAfterRead(file) {
      const {
        maxSize
      } = this;
      const oversize = Array.isArray(file) ? file.some(item => item.size > maxSize) : file.size > maxSize;

      if (oversize) {
        this.$emit('oversize', Object.assign({
          file
        }, this.getDetail()));
        return;
      }

      if (typeof this.afterRead === 'function') {
        this.afterRead(file, this.getDetail());
      }

      this.$emit('after-read', Object.assign({
        file
      }, this.getDetail()));
    },

    deleteItem(event) {
      const {
        index
      } = event.currentTarget.dataset;
      this.$emit('delete', Object.assign(Object.assign({}, this.getDetail(index)), {
        file: this.fileList[index]
      }));
    },

    onPreviewImage(event) {
      if (!this.previewFullImage) return;
      const {
        index
      } = event.currentTarget.dataset;
      const {
        lists
      } = this;
      const item = lists[index];
      uni.previewImage({
        urls: lists.filter(item => item.isImage).map(item => item.url || item.path),
        current: item.url || item.path,

        fail() {
          uni.showToast({
            title: '预览图片失败',
            icon: 'none'
          });
        }

      });
    },

    onClickPreview(event) {
      const {
        index
      } = event.currentTarget.dataset;
      const item = this.lists[index];
      this.$emit('click-preview', Object.assign(Object.assign({}, item), this.getDetail(index)));
    }

  }
};
</script>
<style>
@import "../common/index.css";.van-uploader{position:relative;display:inline-block}.van-uploader__wrapper{display:-webkit-flex;display:flex;-webkit-flex-wrap:wrap;flex-wrap:wrap}.van-uploader__slot:empty{display:none}.van-uploader__slot:not(:empty)+.van-uploader__upload{display:none!important}.van-uploader__upload{position:relative;display:-webkit-flex;display:flex;-webkit-flex-direction:column;flex-direction:column;-webkit-align-items:center;align-items:center;-webkit-justify-content:center;justify-content:center;box-sizing:border-box;width:80px;height:80px;margin:0 8px 8px 0;background-color:#f7f8fa;border-radius:8px}.van-uploader__upload:active{background-color:#f2f3f5}.van-uploader__upload-icon{color:#dcdee0;font-size:24px}.van-uploader__upload-text{margin-top:8px;color:#969799;font-size:12px}.van-uploader__upload--disabled{opacity:.5;opacity:var(--uploader-disabled-opacity,.5)}.van-uploader__preview{position:relative;margin:0 8px 8px 0;cursor:pointer}.van-uploader__preview-image{display:block;width:80px;height:80px;overflow:hidden;border-radius:8px}.van-uploader__preview-delete{position:absolute;top:-8px;right:-8px;color:#969799;font-size:18px;background-color:#fff;border-radius:100%}.van-uploader__file{display:-webkit-flex;display:flex;-webkit-flex-direction:column;flex-direction:column;-webkit-align-items:center;align-items:center;-webkit-justify-content:center;justify-content:center;width:80px;height:80px;background-color:#f7f8fa;border-radius:8px}.van-uploader__file-icon{color:#646566;font-size:20px}.van-uploader__file-name{box-sizing:border-box;width:100%;margin-top:8px;padding:0 4px;color:#646566;font-size:12px;text-align:center}.van-uploader__mask{position:absolute;top:0;right:0;bottom:0;left:0;display:-webkit-flex;display:flex;-webkit-flex-direction:column;flex-direction:column;-webkit-align-items:center;align-items:center;-webkit-justify-content:center;justify-content:center;color:#fff;background-color:rgba(50,50,51,.88);border-radius:8px}.van-uploader__mask-icon{font-size:22px}.van-uploader__mask-message{margin-top:6px;padding:0 4px;font-size:12px;line-height:14px}.van-uploader__loading{width:22px;height:22px;color:#fff}
</style>