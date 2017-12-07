import axios from 'axios';

export default {
    install(Vue, options) {

        const { store } = options;

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

        // Add a request interceptor
        axios.interceptors.request.use(function (config) {
            // Do something before request is sent
            countChange(config._wait, 'increase');
            return config;
        }, function (error) {
            // Do something with request error
            countChange(error.config._wait, 'decrease');
            return Promise.reject(error);
        });

        // Add a response interceptor
        axios.interceptors.response.use(function (response) {
            // Do something with response data
            countChange(response.config._wait, 'decrease');
            return response;
        }, function (error) {
            // Do something with response error
            countChange(error.config._wait, 'decrease');
            return Promise.reject(error);
        });

        Vue.prototype.$axios = axios;
    }
}