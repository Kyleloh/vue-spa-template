import axios from 'axios';

export default {
    install(Vue, options) {

        const { store } = options;

        let syncError = []; // 同步错误
        let asyncError = []; // 异步错误

        // 同步错误处理
        function syncErrorHandler(error) {
            syncError.push(error);

            // TODO: 错误收集后的上报条件，上报内容
            console.log('syncError:', syncError.length);
        }        
        
        // 异步错误处理
        function asyncErrorHandler(error) {
            asyncError.push(error);
            
            // TODO: 错误收集后的上报条件，上报内容
            if(asyncError.length > 100){
                // send Error
                // axios.post();
            }
        }

        function countChange(wait = true, action) {
            if (!wait) return;
            switch (action) {
                case 'increase':
                    store.commit('_requestCountIncrement');
                    break;
                case 'decrease':
                    store.commit('_requestCountDecrement');
                    break;
            }
        }

        // Vue渲染错误
        Vue.config.errorHandler = syncErrorHandler;

        const axiosInstance = axios.create();
        // Add a request interceptor
        axiosInstance.interceptors.request.use(function (config) {
            // Do something before request is sent
            countChange(config._wait, 'increase');
            return config;
        }, function (error) {
            // Do something with request error
            countChange(error.config._wait, 'decrease');
            return Promise.reject(error);
        });

        // Add a response interceptor
        axiosInstance.interceptors.response.use(function (response) {
            // Do something with response data
            countChange(response.config._wait, 'decrease');
            return response;
        }, function (error) {
            // Do something with response error
            countChange(error.config._wait, 'decrease');
            asyncErrorHandler(error);
            return Promise.reject(error);
        });

        Vue.prototype.$axios = axiosInstance;
    }
}