//axios 拦截器的配置

import axios from 'axios';
import  {Toast} from 'antd-mobile'

axios.interceptors.request.use(function (config) {
    // Toast.loading('加载中');
    Toast.loading('加载中',2000, () => {
        console.log('Load complete !!!');
    });

    return config;
});

axios.interceptors.response.use(function (config) {
    // setTimeout(()=>{
        Toast.hide();
    // },3000);

    return config;
});

