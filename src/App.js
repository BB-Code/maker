// import { Avatar } from 'antd';
import { message, Modal } from 'antd';
import { SettingFilled, HomeFilled } from '@ant-design/icons';
import tools from './images/tools.png';
import { ProLayout, PageContainer, ProForm, ProFormText } from '@ant-design/pro-components';
import Card from './components/card';
import cloneGit from './utils/git-clone';

import './App.css';


function App() {

  return (
    <div id="pro-layout" style={{ height: '100vh' }}>
      <ProLayout 
       route={{
        path: '/',
        routes: [
          {
            path: '/',
            name: '首页',
            icon: <HomeFilled />
          },
          {
            path: '/settings',
            name: '设置',
            icon: <SettingFilled />
          },
        ],
      }}
      logo={tools} title='制作者' navTheme='light'
        // rightContentRender={() => (
        //   <Avatar shape="circle" icon={<SettingFilled />} onClick={() => {
        //     // 弹窗
        //   }} />
        // )}
        //onMenuHeaderClick={(e) => alert(e)}
        menuItemRender={(item, dom) => (
          // eslint-disable-next-line jsx-a11y/anchor-is-valid
          <a
            onClick={() => {
              if(item.path === '/settings'){
                Modal.info({
                  closable: true,
                  maskClosable: false,
                  okButtonProps:{
                    style: {
                      display:'none'
                    }
                  },
                  cancelButtonProps:{
                    style: {
                      display:'none'
                    }
                  },
                  icon: <SettingFilled />,
                  title:'设置',
                  content: <>
                    <ProForm 
                     submitter  = {{
                      resetButtonProps: {style: {display: 'none'}}
                    }}
                    onFinish={(values)=>{
                      if(!values.savePath){
                        message.info('请输入项目保存路径');
                        cloneGit('TencentCloudBase/webify-templates',values.savePath);
                        return;
                      }
                      alert(values.savePath);
                    }}>
                      <ProFormText name='savePath' label='项目保存路径' required placeholder='项目保存路径'></ProFormText>
                    </ProForm>
                  </>,
                 
                })
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
