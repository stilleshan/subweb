<template>
  <div class="box">
    <form method="post" action="#">
      <div class="row gtr-uniform gtr-50">
        <div class="col-12">
          <textarea
            id="message"
            v-model.trim="inputs.inputValue"
            :placeholder="inputs.placeholder"
            rows="3"
          ></textarea>
        </div>
        <div
          class="col-5 col-12-mobilep list"
          style="text-align: center; padding-top: 20px"
        >
          <select v-model="targetType" @change="selectTarget($event)">
            <option
              v-for="option in targetTypes"
              :key="option"
              :value="option.value"
            >
              {{ option.text }}
            </option>
          </select>
        </div>
        <div
          class="col-5 col-8-mobilep list"
          style="text-align: center; padding-top: 20px"
        >
          <select id="selectApi" v-model="api" @change="selectApi($event)">
            <option v-for="option in apis" :key="option" :value="option.value">
              {{ option.text }}
            </option>
          </select>
        </div>
        <div
          class="col-2 col-4-mobilep"
          style="text-align: center; padding-top: 20px"
        >
          <ul class="actions">
            <li>
              <input
                type="button"
                value="参数"
                class="alt"
                @click="showMoreConfig()"
              />
            </li>
          </ul>
        </div>
        <div
          v-show="isShowManualApiUrl"
          class="col-12"
          style="text-align: center; padding-top: 20px"
        >
          <input
            v-model="manualApiUrl"
            type="text"
            placeholder="示例：https://sub.ops.ci"
          />
        </div>
        <div
          v-show="isShowMoreConfig"
          class="col-12"
          style="text-align: center; padding-top: 0px"
        >
          <div class="col-12" style="text-align: center; padding-top: 20px">
            <input
              type="text"
              :placeholder="'Include：可选'"
              v-model="moreConfig.include"
            />
          </div>
          <div class="col-12" style="text-align: center; padding-top: 20px">
            <input
              type="text"
              :placeholder="'Exclude：可选'"
              v-model="moreConfig.exclude"
            />
          </div>
          <div class="col-12" style="text-align: center; padding-top: 20px">
            <input
              type="text"
              :placeholder="'远程配置：可选'"
              v-model="moreConfig.remoteconfig"
            />
          </div>
          <div
            class="col-12 col-12-narrower"
            style="text-align: center; padding-top: 20px"
          >
            <input type="checkbox" id="emoji" v-model="moreConfig.emoji" />
            <label for="emoji">Emoji</label>
            <input type="checkbox" id="udp" v-model="moreConfig.udp" />
            <label for="udp">开启UDP</label>
            <input type="checkbox" id="sort" v-model="moreConfig.sort" />
            <label for="sort">排序节点</label>
            <input type="checkbox" id="scv" v-model="moreConfig.scv" />
            <label for="scv">关闭证书检查</label>
            <input type="checkbox" id="nodelist" v-model="moreConfig.list" />
            <label for="nodelist">Node List</label>
          </div>
        </div>
        <div
          class="col-10 col-8-mobilep"
          style="text-align: center; padding-top: 20px"
        >
          <input
            type="text"
            readOnly="true"
            placeholder="点击转换订阅链接"
            v-model.trim="returnUrl"
          />
        </div>
        <div
          class="col-2 col-4-mobilep"
          style="text-align: center; padding-top: 20px"
        >
          <ul class="actions">
            <li>
              <input type="button" value="转换" @click="getSubUrl()" />
            </li>
          </ul>
        </div>
        <div
          class="col-10 col-8-mobilep"
          style="text-align: center; padding-top: 20px"
        >
          <input
            type="text"
            readOnly="true"
            placeholder="点击生成短链接"
            v-model.trim="returnShortUrl"
          />
        </div>
        <div
          class="col-2 col-4-mobilep"
          style="text-align: center; padding-top: 20px"
        >
          <ul class="actions">
            <li>
              <input type="button" value="短链" @click="getShortUrl()" />
            </li>
          </ul>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import { request } from 'network';
import utils from './utils.js';
import dialogOut from 'components/common/dialog';
export default {
  name: 'HomeForm',
  setup() {
    const ENV = {
      DEFAULT_MORECONFIG: {
        include: '',
        exclude: '',
        remoteconfig: '',
        emoji: true,
        udp: true,
        sort: false,
        scv: false,
        list: false,
      },
    };
    return {
      ENV,
    };
  },
  data() {
    return {
      moreConfig: {},
      isShowMoreConfig: false,
      urls: [],
      returnUrl: '',
      returnShortUrl: '',
      apiUrl: process.env.VUE_APP_API_URL,
      shortUrl: process.env.VUE_APP_SHORT_URL,
      manualApiUrl: '',
      isShowManualApiUrl: false,
      api: 'default',
      apis: [
        { value: 'default', text: process.env.VUE_APP_API_URL },
        { value: 'manual', text: '自定义后端 API 地址' },
      ],
      inputs: {
        buttonClass: '',
        inputValue: '',
        placeholder:
          '多订阅链接或节点请确保每行一条\n支持手动使用"|"分割多链接或节点',
      },
      targetType: 'clash',
      targetTypes: [
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
    };
  },
  created() {
    this.moreConfig = this.ENV.DEFAULT_MORECONFIG;
  },
  methods: {
    showMoreConfig() {
      if (this.isShowMoreConfig) {
        this.isShowMoreConfig = false;
      } else {
        this.isShowMoreConfig = true;
      }
    },
    showDialog(Msg) {
      dialogOut(this, Msg);
    },
    selectApi(event) {
      if (event.target.value == 'manual') {
        this.isShowManualApiUrl = true;
      } else {
        this.isShowManualApiUrl = false;
      }
    },
    selectTarget(event) {
      this.targetType = event.target.value;
    },
    toCopy(url, title) {
      if (!url) {
        this.showDialog('复制失败 内容为空');
      } else {
        var copyInput = document.createElement('input');
        copyInput.setAttribute('value', url);
        document.body.appendChild(copyInput);
        copyInput.select();
        try {
          var copyed = document.execCommand('copy');
          if (copyed) {
            document.body.removeChild(copyInput);
            this.showDialog(title + ' 复制成功');
          }
        } catch {
          this.showDialog('复制失败 请检查浏览器兼容');
        }
      }
    },
    checkUrls() {
      if (this.inputs.inputValue == '') {
        this.showDialog('请填写正确的订阅地址');
        return false;
      } else {
        this.urls = this.inputs.inputValue;
        return true;
      }
    },
    checkApi() {
      var apiSelect = document.getElementById('selectApi');
      var i = apiSelect.selectedIndex;
      if (apiSelect.options[i].value == 'manual') {
        this.apiUrl = this.manualApiUrl;
        if (!utils.regexCheck(this.apiUrl)) {
          this.showDialog('请填写正确的 API 地址');
          return false;
        } else if (this.apiUrl.split('').slice(-1) == '/') {
          this.apiUrl = this.apiUrl.substr(0, this.apiUrl.length - 1);
          return true;
        } else {
          return true;
        }
      } else {
        this.apiUrl = apiSelect.options[i].text;
        return true;
      }
    },
    getFinalUrl() {
      this.returnUrl = utils.getSubLink(
        this.urls,
        this.apiUrl,
        this.targetType,
        this.isShowMoreConfig,
        this.moreConfig
      );
    },
    checkAll() {
      if (this.checkUrls() && this.checkApi()) {
        this.getFinalUrl();
      }
    },
    getSubUrl() {
      this.checkAll();
      if (!this.returnUrl == '') {
        this.toCopy(this.returnUrl, '订阅链接');
      }
    },
    getShortUrl() {
      if (this.returnUrl == '') {
        this.checkAll();
      }
      let data = new FormData();
      data.append('longUrl', btoa(this.returnUrl));
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
            this.returnShortUrl = res.data.ShortUrl;
            this.toCopy(res.data.ShortUrl, '短链接');
          }
        })
        .catch(() => {
          this.showDialog('短链接生成失败 请检查短链接服务是否可用');
        });
    },
  },
};
</script>
