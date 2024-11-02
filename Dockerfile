# 基于nginx:1.20镜像
FROM nginx:1.26.2
# 将dist文件中的内容复制到 /usr/share/nginx/html/ 这个目录下面
COPY dist/ /usr/share/nginx/html/dist/
# 用本地的 nginx.conf 配置来替换nginx镜像里的默认配置
COPY nginx.conf /etc/nginx/nginx.conf
# 暴露80端口
EXPOSE 80
# 使用Nginx运行Vue应用
CMD ["nginx", "-g", "daemon off;"]