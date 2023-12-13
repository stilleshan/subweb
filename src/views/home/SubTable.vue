<template>
  <div class="row g-4 custom-div">
    <div class="col-12 col-lg-12 pt-4 pt-lg-0">
      <div class="tab-content p-0">
        <div class="tab-pane fade show active">
          <div class="card mb-4">
            <div class="card-body">
              <div class="row mb-3 g-3">
                <div class="col-12 col-md-12">
                  <label class="form-label" for="add-user-email">订阅链接</label>
                  <textarea class="form-control" v-model.trim="urls" :placeholder="placeholder" rows="3"></textarea>
                </div>
                <div class="col-5 col-md-6">
                  <label class="form-label" for="client">客户端</label>
                  <select class="form-select" id="client" v-model="target" @change="selectTarget">
                    <option v-for="option in targetOptions" :key="option" :value="option.value">
                      {{ option.text }}
                    </option>
                  </select>
                </div>
                <div class="col-7 col-md-6">
                  <label class="form-label" for="api">后端服务</label>
                  <select class="form-select" id="api" @change="selectApi">
                    <option :value="apiUrl">
                      {{ apiUrl }}
                    </option>
                    <option value="manual">自定义后端 API 地址</option>
                  </select>
                </div>
                <div class="col-12 col-md-12" v-if="isShowManualApiUrl">
                  <input class="form-control" placeholder="自定义后端 API 地址示例：https://sub.ops.ci" v-model="api" />
                </div>
                <div class="col-8 col-md-10">
                  <label class="form-label" for="remote">远程配置</label>
                  <select class="form-select" id="remote" @change="selectRemoteConfig">
                    <option :value="remoteConfigUrl">{{ remoteConfigName }}</option>
                    <option value="manual">自定义远程配置地址</option>
                  </select>
                </div>
                <div class="col-4 col-md-2">
                  <label class="form-label">&nbsp;</label>
                  <button type="button" class="btn btn-warning" @click="showMoreConfig">参数</button>
                </div>
                <div class="col-12 col-md-12" v-if="isShowRemoteConfig">
                  <input class="form-control" placeholder="自定义远程配置地址：" v-model="remoteConfig" />
                </div>
                <div class="col-12 col-md-12" v-if="isShowMoreConfig">
                  <label class="form-label" for="add-user-email">可选参数</label>
                  <div class="row g-3">
                    <div class="col-12 col-md-12">
                      <input class="form-control" placeholder="Include: 可选" v-model="moreConfig.include" />
                    </div>
                    <div class="col-12 col-md-12">
                      <input class="form-control" placeholder="Enclude: 可选" v-model="moreConfig.exclude" />
                    </div>
                    <div class="col-md check-div" :style="{ display: 'flex', flexWrap: 'wrap' }">
                      <div class="form-check form-check-inline">
                        <input class="form-check-input" type="checkbox" id="emoji" v-model="moreConfig.emoji" />
                        <label class="form-check-label" for="emoji">Emoji</label>
                      </div>
                      <div class="form-check form-check-inline">
                        <input class="form-check-input" type="checkbox" id="udp" v-model="moreConfig.udp" />
                        <label class="form-check-label" for="udp">开启UDP</label>
                      </div>
                      <div class="form-check form-check-inline">
                        <input class="form-check-input" type="checkbox" id="sort" v-model="moreConfig.sort" />
                        <label class="form-check-label" for="sort">排序节点</label>
                      </div>
                      <div class="form-check form-check-inline">
                        <input class="form-check-input" type="checkbox" id="scv" v-model="moreConfig.scv" />
                        <label class="form-check-label" for="scv">关闭证书检查</label>
                      </div>
                      <div class="form-check form-check-inline">
                        <input class="form-check-input" type="checkbox" id="nodelist" v-model="moreConfig.list" />
                        <label class="form-check-label" for="nodelist">Node List</label>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-12 col-md-12">
                  <div class="divider divider-dashed">
                    <div class="divider-text"><i class="ti ti-refresh" style="color: gray"></i></div>
                  </div>
                </div>
                <div class="col-12 col-md-10">
                  <input class="form-control" placeholder="点击转换链接" v-model.trim="result.subUrl" />
                </div>
                <div class="col-12 col-md-2">
                  <button type="button" class="btn btn-success" @click="getSubUrl()">转换</button>
                </div>
                <div class="col-12 col-md-10">
                  <input class="form-control" placeholder="点击获取短链" v-model.trim="result.shortUrl" />
                </div>
                <div class="col-12 col-md-2">
                  <button type="button" class="btn btn-primary" @click="getShortUrl()">短链</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { showLoading, hideLoading } from '@/components/loading';
import { getSubLink, regexCheck } from './index.js';
import { request } from '@/network';
import showNotification from '@/components/notification';
export default {
  name: 'SubTable',
  setup() {
    const DEFAULT_MORECONFIG = {
      include: '',
      exclude: '',
      emoji: true,
      udp: true,
      sort: false,
      scv: false,
      list: false,
    };
    return {
      DEFAULT_MORECONFIG,
    };
  },
  data() {
    return {
      placeholder: '多订阅链接或节点请确保每行一条\n支持手动使用"|"分割多链接或节点',
      targetOptions: [
        { value: 'clash', text: 'Clash' },
        { value: 'clashr', text: 'ClashR' },
        { value: 'v2ray', text: 'V2Ray' },
        { value: 'quan', text: 'Quantumult' },
        { value: 'quanx', text: 'Quantumult X' },
        { value: 'surge&ver=2', text: 'SurgeV2' },
        { value: 'surge&ver=3', text: 'SurgeV3' },
        { value: 'surge&ver=4', text: 'SurgeV4' },
        { value: 'surfboard', text: 'Surfboard' },
        { value: 'ss', text: 'SS (SIP002)' },
        { value: 'sssub', text: 'SS Android' },
        { value: 'ssd', text: 'SSD' },
        { value: 'ssr', text: 'SSR' },
        { value: 'loon', text: 'Loon' },
      ],
      apiUrl: process.env.VUE_APP_API_URL || window.config.apiUrl,
      shortUrl: process.env.VUE_APP_SHORT_URL || window.config.shortUrl,
      remoteConfigName: process.env.VUE_APP_REMOTE_CONFIG_NAME || window.config.remoteConfigName,
      remoteConfigUrl: process.env.VUE_APP_REMOTE_CONFIG_URL || window.config.remoteConfigUrl,
      moreConfig: this.DEFAULT_MORECONFIG,
      isShowMoreConfig: false,
      isShowManualApiUrl: false,
      isShowRemoteConfig: false,
      result: {
        subUrl: '',
        shortUrl: '',
      },
      urls: [],
      api: process.env.VUE_APP_API_URL || window.config.apiUrl,
      target: 'clash',
      remoteConfig: process.env.VUE_APP_REMOTE_CONFIG_URL || window.config.remoteConfigUrl,
    };
  },
  methods: {
    showMoreConfig() {
      this.isShowMoreConfig = !this.isShowMoreConfig;
    },
    selectApi(event) {
      if (event.target.value == 'manual') {
        this.api = '';
        this.isShowManualApiUrl = true;
      } else {
        this.isShowManualApiUrl = false;
        this.api = event.target.value;
      }
    },
    selectRemoteConfig(event) {
      if (event.target.value == 'manual') {
        this.remoteConfig = '';
        this.isShowRemoteConfig = true;
      } else {
        this.isShowRemoteConfig = false;
        this.remoteConfig = event.target.value;
      }
    },
    toCopy(url, title) {
      if (!url) {
        this.$showDialog('warning', '注意', '复制失败 内容为空');
        return;
      }
      var copyInput = document.createElement('input');
      copyInput.setAttribute('value', url);
      document.body.appendChild(copyInput);
      copyInput.select();
      try {
        var copyed = document.execCommand('copy');
        if (copyed) {
          document.body.removeChild(copyInput);
          showNotification(title + ' 复制成功', '成功');
        }
      } catch {
        this.$showDialog('warning', '注意', '复制失败，请检查浏览器兼容性');
      }
    },
    getConverter() {
      if (this.urls == '') {
        this.$showDialog('warning', '注意', '请输入订阅链接或节点');
        return false;
      }
      if (!regexCheck(this.api)) {
        this.$showDialog('warning', '注意', '请输入自定义后端 API 地址，或选择默认后端服务。');
        return false;
      }
      if (this.remoteConfig == '' && this.isShowRemoteConfig) {
        this.$showDialog('warning', '注意', '请输入远程配置地址，或选择默认配置。');
        return false;
      }
      if (this.api.endsWith('/')) {
        // 自动删除末尾的斜杠
        this.api = this.api.slice(0, -1);
      }
      this.result.subUrl = getSubLink(
        this.urls,
        this.api,
        this.target,
        this.remoteConfig,
        this.isShowMoreConfig,
        this.moreConfig
      );
      return true;
    },
    getSubUrl() {
      if (!this.getConverter()) {
        return;
      }
      this.toCopy(this.result.subUrl, '订阅链接');
    },
    getShortUrl() {
      if (!this.getConverter()) {
        return;
      }
      let data = new FormData();
      data.append('longUrl', btoa(this.result.subUrl));
      showLoading();
      request({
        method: 'post',
        url: this.shortUrl + '/short',
        header: {
          'Content-Type': 'application/form-data; charset=utf-8',
        },
        data: data,
      })
        .then((res) => {
          if (res.data.Code === 1 && res.data.ShortUrl !== '') {
            this.result.shortUrl = res.data.ShortUrl;
            this.toCopy(this.result.shortUrl, '短链接');
          }
          hideLoading();
        })
        .catch(() => {
          this.$showDialog('error', '失败', '短链接生成失败 请检查短链接服务是否可用');
          hideLoading();
        });
    },
  },
};
</script>

<style scoped>
.custom-div {
  width: 100%;
  margin: 0 auto;
}
@media (min-width: 767.98px) {
  .custom-div {
    width: 90%;
    margin: 0 auto;
  }
}
@media (min-width: 991.98px) {
  .custom-div {
    width: 80%;
    margin: 0 auto;
  }
}
@media (min-width: 1199.98px) {
  .custom-div {
    width: 70%;
    margin: 0 auto;
  }
}

.btn {
  width: 100%;
}

.check-div {
  display: flex;
  justify-content: center; /* 水平居中 */
  align-items: center; /* 垂直居中 */
  height: 100%; /* 可以设置固定高度或者根据需求调整 */
}

.divider {
  margin: 1%;
}
</style>
