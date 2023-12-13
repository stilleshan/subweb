# subweb for Vercel
## Vercel 快速部署
为方便 docker 用户方便挂载或环境变量部署,默认`main`分支不支持`Vercel`,需要`fork`仓库少许设置才能部署至`Vercel`.
1. 首先 fork 本仓库, 注意**取消**勾选`Copy the main branch only`
2. 在 fork 后的仓库 Settings - General -Default branch 选择 vercel 为默认分支.
3. 登录 Vercel 创建新的 Project, 选择你 fork 的 subweb 仓库.
4. 根据需求设置 Environment Variables, 参考`.env`文件.
5. 点击 deploy 开始部署，立即点击右下角 Cancel Deployment 取消部署。
6. 回到 Vercel 项目 Settings - General - Node.js Version 设置为`16.x` - Save 保存.
7. 回到 Vercel 项目 Deployments - 过滤下拉菜单 Status 中勾选 Cancelled - 将显示的刚才取消的部署记录, 进行 Redeploy 重新部署.
8. 如有更多修改或不想使用环境变量的方式进行设置,请自行修改`public/conf/config.js`文件.

**其他更多信息请查看`main`分支**
