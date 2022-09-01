import { platform } from '@tauri-apps/api/os';

async function  checkPlatform(){
   return await platform();
}

async function isDarwin(){
    return await checkPlatform() === 'darwin';
}

export {
    isDarwin
} 