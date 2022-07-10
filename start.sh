#/bin/sh

if [ $API_URL ]; then
  echo "当前 API 地址为: $API_URL"
  for js in /usr/share/nginx/html/js/*.js
  do
    sed -i "s#http://127.0.0.1:25500#$API_URL#g" $js
  done
else
  echo "当前为默认本地 API 地址: http://127.0.0.1:25500"
  echo "如需修改请在容器启动时使用 -e API_URL='https://sub.ops.ci' 传递环境变量"
fi

nginx -g "daemon off;"
