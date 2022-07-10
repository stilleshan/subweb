# subweb
## 简介
subweb 是基于 subconverter 订阅转换的前端项目,方便用户快速生成各平台的订阅链接.

> *subweb 是我个人入门 vuejs 学习时简单做的一个案例,使用还算方便,开源出来,欢迎各路大佬贡献维护.*

*GitHub [stilleshan/subweb](https://github.com/stilleshan/subweb)  
Docker [stilleshan/subweb](https://hub.docker.com/r/stilleshan/subweb)*
> *docker image support for X86 and ARM*

## 示例
[https://sub.ops.ci](https://sub.ops.ci)  
*`前后端示例,可以直接使用.`*

## 部署
### docker 本地版
*适用于本机部署使用*
```shell
docker run -d --name subweb --restart always \
  -p 18080:80 \
  stilleshan/subweb
```

访问 `http://127.0.0.1:18080`

### docker 自定义后端 API 地址
修改`API_URL`环境变量为你的后端 API 地址
```shell
docker run -d --name subweb --restart always \
  -p 18080:80 \
  -e API_URL=https://sub.ops.ci \
  stilleshan/subweb
```

访问 `http://127.0.0.1:18080`  
> *推荐使用 nginx 反向代理部署*


## 链接
- [GitHub - stilleshan/subweb](https://github.com/stilleshan/subweb)
- [GitHub - stilleshan/subconverter](https://github.com/stilleshan/subconverter)
