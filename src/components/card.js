import React from 'react'
import { Image, Button } from 'antd';
import { ProCard } from '@ant-design/pro-components';
export default function Card() {
    return (
        <>
            <ProCard gutter={8}>
                <ProCard title="React" tooltip={'基于 create-react-app new [appname] 创建应用'} extra={
                    <Button type='ghost'>创建</Button>
                } colSpan={8} layout="center" bordered>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: 160 }}>
                        <Image preview={false} width={100} height={100} src="https://gw.alipayobjects.com/zos/antfincdn/aPkFc8Sj7n/method-draw-image.svg" />
                    </div>
                </ProCard>
                <ProCard title="Vue3" tooltip={'基于  npm init vue@latest 创建应用'} extra={
                    <Button type='ghost'>创建</Button>
                } colSpan={8} layout="center" bordered>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: 160 }}>
                        <Image preview={false} src="https://blog-img-1252233196.cos.ap-guangzhou.myqcloud.com/vue.svg" />
                    </div>
                </ProCard>
                <ProCard title="Express" tooltip={'基于  express-generator 创建应用'} extra={
                    <Button type='ghost'>创建</Button>
                } colSpan={8} layout="center" bordered>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: 160 }}>
                        <Image preview={false} src="https://blog-img-1252233196.cos.ap-guangzhou.myqcloud.com/expess.png" />
                    </div>
                </ProCard>
            </ProCard>
        </>
    )
}
