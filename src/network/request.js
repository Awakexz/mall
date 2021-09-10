import axios from 'axios'
export function request(config, success, failure) {

    const instance = axios.create({
        baseURL: 'http://152.136.185.210:7878/api/m5',
        timeout: 5000
    })


    // 请求拦截
    // instance.interceptors.request.use(config => {
    //   console.log(config);

    //   return config;   //返回拦截到的内容
    // }, error => {
    //   console.log(error);
    // })

    // 响应拦截
    instance.interceptors.response.use(res => res.data
        , error => {
            console.log(error);
        })


    //直接return
    return instance(config);
}
