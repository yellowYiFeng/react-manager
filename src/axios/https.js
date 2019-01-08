import jsonP from 'jsonp'
import axios from 'axios'
import { Modal } from 'antd';
// import baseUrl from './connection.js'
let baseUrl  = 'https://www.easy-mock.com/mock/5c32fe053535cb20e5765a70/api';
export default class Axios {
    static JsonP(options){
        return new Promise((resolve,reject) => {
            jsonP(options.url,{param:'callback'},function(err,response){
                if(response.status === "success"){
                    resolve(response.results)
                }else{
                    reject(response.error)
                }
            })
        })
    }
    static post(options) {
        let loading;
        if(options.data && options.data.isLoading !== false ){
            loading = document.getElementById('ajaxLoading');
            loading.style.display = 'none';
        }
        return new Promise((resolve,reject) => {
            axios.post(baseUrl + options.url,options.data).then((response) => {
                if(response.status == '200' ){
                    let res = response.data;
                    if(res.code == 0){
                        loading.style.display = 'none';
                        resolve(response.data);
                    }
                }else{
                    reject(response.data);
                }
            }).catch((error) => {
                
            })
        })
    }
    static get(options) {
        let loading;
        if(options.data && options.data.isLoading !== false ){
            loading = document.getElementById('ajaxLoading');
            loading.style.display = 'block';
        }
        return new Promise((resolve,reject) => {
            axios.get(baseUrl + options.url,options.data
            ).then((response) => {
                if(response.status == '200'){
                    loading.style.display = 'none';
                    if(response.data.code == 0 ){
                        resolve(response.data)
                    }else{
                        Modal.info({
                            title: '提示',
                            content: response.data.msg
                        })
                    }
                }else{
                    reject(response.data)
                }
                
            }).catch((error) => {

            })
        })
    }
}

// promise 接收一个回调函数，回调函数接收两个参数，resolve和reject，resolve用来处理成功的回调，reject处理失败的回调