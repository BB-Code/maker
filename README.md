# 拉取库

https://github.com/TencentCloudBase/webify-templates

```sh
netstat -ano | findstr "5000"
#  TCP    0.0.0.0:5000           0.0.0.0:0              LISTENING       61304
taskkill /PID 61304 /f
# 成功: 已终止 PID 为 61304 的进程
```

# TODO

- [x] 项目初始化
- [x] 添加 antd 样式库
- [x] 基本界面设计
- [x] 完成 React,Vue2,Express等模版的显示
- [x] 各种模版的拉取新增，删除，打开本地位置
- [ ] 添加拉取模版仓库选择 (github || gitee || gitlab)
- [ ] 拉取源的选择（npm || yarn）
- [x] 新建项目后成功提示后打开项目列表
- [x] 新建项目后可以自动化执行依赖安装和运行打开网址
- [ ] 假如有其他相同的端口,先 kill 掉端口
- [x] 安装依赖后续的步骤进度用通知功能提示
- [x] 自动话安装可以在设置勾选是否需要
- [ ] 用户可以自定义模板扩展
- [ ] 发布第一个版本（各种支持的平台）