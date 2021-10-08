import axios from 'axios'

export function request(config) {
    const instance = axios.create({
        baseURL: 'http://152.136.185.210:7878/api/hy66',
        timeout: 10000
    })

    // 响应拦截
    instance.interceptors.response.use(res => res.data
        , error => {
            console.log(error)
        })


    //返回一个promise对象
    return instance(config)
}

