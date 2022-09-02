// import { Avatar } from 'antd';

import { message, Modal } from 'antd';
import { SettingFilled, HomeFilled, CloseCircleFilled } from '@ant-design/icons';
import tools from './images/tools.png';
import { ProLayout, PageContainer, ProForm, ProFormText, ProFormSwitch, ProFormRadio } from '@ant-design/pro-components';
import Card from './components/card';
import './App.css';
//const download = require('download-git-repo')
//const clone = require('git-clone');
import { isDarwin } from './utils/platform';
// import { Command } from '@tauri-apps/api/shell'
// import { isPermissionGranted, requestPermission, sendNotification } from '@tauri-apps/api/notification';
// import { appDir, desktopDir, downloadDir, configDir, homeDir, dataDir } from '@tauri-apps/api/path';
import { checkUpdate, installUpdate } from '@tauri-apps/api/updater';
import { exit } from '@tauri-apps/api/process';
import { useEffect } from 'react';
import { setStore } from './utils/store';

isDarwin().then(res => {
  console.log("🚀 ~ file: App.js ~ line 13 ~ platformName", res)
});

function App() {
  useEffect(() => {
    checkUpdate().then((res) => {
      console.log("🚀 ~ file: ", res)
      if (res.shouldUpdate) {
        console.log(`Installing update ${res.manifest?.version}, ${res.manifest?.date}, ${res.manifest.body}`);
        installUpdate().then((res) => {
          console.log(`res`, res);
        })
      }
    });

  }, [])
  return (
    <div id="pro-layout" style={{ height: '100vh' }}>
      {/* <button onClick={async()=>{
        //const appDirPath = await appDir();
        //console.log("🚀 ~ file: App.js ~ line 63 ~ <buttononClick={async ~ appDirPath", appDirPath)
        //C:\Users\Administrator\AppData\Roaming\com.tauri.bobocode\
        const desktopPath = await homeDir();
        console.log("🚀 ~ file: App.js ~ line 82 ~ <buttononClick={async ~ desktopPath", desktopPath) //C:\Users\Administrator\AppData\Roaming\
        new Command("bash", ['cd', desktopPath]).execute().then(res=>{
          new Command("bash", ['pwd']).execute().then(res=>{
            console.log(res)
          })
        })
      }}>目录</button>
       <button
    onClick={async() => {
      let permissionGranted = await isPermissionGranted();
      console.log(permissionGranted)
      //console.log("🚀 ~ file: App.js ~ line 146 ~ onClick={async ~ permissionGranted", permissionGranted)
      // if (!permissionGranted) {
      //   const permission = await requestPermission();
      //   permissionGranted = permission === 'granted';
      // }
      if (permissionGranted) {
        sendNotification('Tauri is awesome!');
        sendNotification({ title: 'TAURI', body: 'Tauri is awesome!' });
      }
    }}
>
notification
</button> */}
      <ProLayout
        collapsed={true}
        route={{
          path: '/',
          routes: [
            {
              path: '/',
              name: '首页',
              icon: <HomeFilled />,
            },
            {
              path: '/settings',
              name: '设置',
              icon: <SettingFilled />
            },
            {
              path: '/close',
              name: '退出',
              icon: <CloseCircleFilled />
            }
          ],
        }}
        logo={tools} title='Maker' navTheme='light'
        // rightContentRender={() => (
        //   <Avatar shape="circle" icon={<SettingFilled />} onClick={() => {
        //     // 弹窗
        //   }} />
        // )}
        //onMenuHeaderClick={(e) => alert(e)}
        menuItemRender={(item, dom) => (
          // eslint-disable-next-line jsx-a11y/anchor-is-valid
          <a
            onClick={async () => {
              if (item.path === '/settings') {
                let modal = Modal.info({
                  closable: true,
                  maskClosable: false,
                  centered: true,
                  okButtonProps: {
                    style: {
                      display: 'none'
                    }
                  },
                  cancelButtonProps: {
                    style: {
                      display: 'none'
                    }
                  },
                  icon: <SettingFilled />,
                  title: '设置',
                  content: <>
                    <ProForm
                      submitter={{
                        resetButtonProps: { style: { display: 'none' } }
                      }}
                      onFinish={async (values) => {
                        console.log(values)
                        setStore('isAuto', values.isAuto);
                        setStore('source', values.source);
                        if (!values.savePath) {
                          message.info('请输入项目保存路径');
                          return;
                        } else {
                          let isHasEnd = values.savePath.endsWith('\\');
                          if (isHasEnd) {
                            setStore('dir', values.savePath.substr(0, values.savePath.length - 1))
                          } else {
                            setStore('dir', values.savePath)
                          }
                          message.info('保存成功');
                          modal.destroy();
                        }
                      }}>
                      <ProFormText initialValue={localStorage.getItem('dir') ?? ''} name='savePath' label='项目保存路径' required placeholder='项目保存路径'></ProFormText>
                      <ProFormSwitch label="是否自动化安装" initialValue={true} name='isAuto' />
                      <ProFormRadio.Group                 
                      name='source'
                      label='项目源'
                      valueEnum={{
                        "npm": "npm",
                        "yarn": "yarn",
                      }}
                      initialValue={"npm"}
                      />
                      
                    </ProForm>
                  </>,
                })
              }
              if (item.path === '/close') {
                await exit(1)
              }
              //setPathname(item.path || '/welcome');
            }}
          >
            {dom}
          </a>
        )}
      >
        <PageContainer>
          <Card></Card>
        </PageContainer>
      </ProLayout>
    </div>
  );
}

export default App;
