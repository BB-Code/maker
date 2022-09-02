import { v4 as uuid } from 'uuid';
import { templateUrl, imageUrl } from '../config';
const proCardList = [
        {
            id: uuid(),
            title:'node',
            tooltip:'Node 创建空模板应用',
            templdate_url: templateUrl.node_templdate,
            img_url: imageUrl.node_img
        },
        {
            id: uuid(),
            title:'react',
            tooltip:'基于 create-react-app new [appname] 创建应用',
            templdate_url: templateUrl.react_template,
            img_url: imageUrl.react_img
        },
        {
            id: uuid(),
            title:'vue2',
            tooltip:'基于  npm init vue@latest 创建应用',
            templdate_url: templateUrl.vue2_template,
            img_url: imageUrl.vue2_img
        },
        {
            id: uuid(),
            title:'express',
            tooltip:'基于  express-generator 创建应用',
            templdate_url: templateUrl.express_template,
            img_url: imageUrl.express_img
        }
]

console.log(proCardList);

export  default proCardList;