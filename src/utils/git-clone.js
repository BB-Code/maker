import { message  } from 'antd';
import download from 'download-git-repo';

function cloneGit(repo,path){
    
    download(repo,path,(err)=>{
        if(err){
            message.error(err)
        }else{
            message.info('下载成功!')
        }
    })
}

export default cloneGit