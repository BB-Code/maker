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
            img_url: imageUrl.vue_img
        },
        {
            id: uuid(),
            title:'express',
            tooltip:'基于  express-generator 创建应用',
            templdate_url: templateUrl.express_template,
            img_url: imageUrl.express_img
        },
        {
            id: uuid(),
            title:'next',
            tooltip:'基于 next 创建应用',
            templdate_url: templateUrl.next_template,
            img_url: imageUrl.next_img
        },
        {
            id: uuid(),
            title:'nust',
            tooltip:'基于 nust 创建应用',
            templdate_url: templateUrl.nuxt_template,
            img_url: imageUrl.nust_img
        },
        {
            id: uuid(),
            title:'svelte',
            tooltip:'基于 svelte 创建应用',
            templdate_url: templateUrl.svelte_template,
            img_url: imageUrl.svelte_img
        },
        {
            id: uuid(),
            title:'react_vite',
            tooltip:'基于 react_vite 创建应用',
            templdate_url: templateUrl.react_vite_template,
            img_url: imageUrl.react_img
        },
        {
            id: uuid(),
            title:'vue_vite',
            tooltip:'基于 vue_vite 创建应用',
            templdate_url: templateUrl.vue_vite_template,
            img_url: imageUrl.vue_img
        },
        {
            id: uuid(),
            title:'docsify',
            tooltip:'基于 docsify 创建应用',
            templdate_url: templateUrl.docsify_template,
            img_url: imageUrl.docsify_img
        },
        {
            id: uuid(),
            title:'docusaurus',
            tooltip:'基于 docusaurus 创建应用',
            templdate_url: templateUrl.docusaurus_template,
            img_url: imageUrl.docusaurus_img
        },
        {
            id: uuid(),
            title:'gatsby',
            tooltip:'基于 gatsby 创建应用',
            templdate_url: templateUrl.gatsby_template,
            img_url: imageUrl.gatsby_img
        },
        {
            id: uuid(),
            title:'hexo',
            tooltip:'基于 hexo 创建应用',
            templdate_url: templateUrl.hexo_template,
            img_url: imageUrl.hexo_img
        }
]


export  default proCardList;