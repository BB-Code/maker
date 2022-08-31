import ReactDOM from 'react-dom/client';
import { Spin } from 'antd';
// 当前正在请求的数量
let requestCount = 0

// 显示loading
function showLoading (tip) {
  if (requestCount === 0) {
      var dom = document.createElement('div')
      dom.setAttribute('id', 'loading')
      document.body.appendChild(dom)
      const root = ReactDOM.createRoot(dom);
      root.render(<Spin tip={tip} size="large"/>)
  }
  requestCount++
}

// 隐藏loading
function hideLoading () {
  requestCount--
  if (requestCount === 0) {
      document.body.removeChild(document.getElementById('loading'))
  }
}

export {
    showLoading,
    hideLoading
}