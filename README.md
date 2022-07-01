# subweb
## 简介
subweb 是基于 subconverter 订阅转换的前端项目,方便用户快速生成各平台的订阅链接.

## 示例
[https://sub.ops.ci](https://sub.ops.ci)

## 部署
### docker 本地
*适用于本机部署使用*
```shell
docker run -d --name subweb --restart always -p 18080:80 stilleshan/subweb
```

访问 `http://127.0.0.1:18080`

### docker 在线自定义后端 API
*适用于服务器部署使用*

修改自定义 subconverter API 地址需要自行编译构建镜像.  
修改`.env.productionn`中`VUE_APP_BASE_API_URL`为你 subconverter 后端 API 地址.
```shell
docker build -t subweb .
# 构建镜像
docker run -d --name subweb --restart always -p 18080:80 subweb
# 启动容器
```
