# subweb for Vercel
## Vercel 快速部署
为方便 docker 用户方便挂载或环境变量部署,默认`main`分支不支持`Vercel`,需要`fork`仓库少许设置才能部署至`Vercel`.
1. fork 本仓库, 注意**取消**勾选`Copy the main branch only`
2. Vercel 中创建项目使用`subweb`首次部署.
3. 部署完毕后,在`Vercel`项目 - Settings - Git - Production Branch 设置为`vercel`.
4. 修改环境变量 - Settings - Environment Variables 中修改环境变量,具体参考仓库中`.env`文件.
5. Vercel 部署如需修改导航栏信息,需自行修改`src/layouts/components/header/navBarItem.js`文件.

**其他更多信息请查看`main`分支**
