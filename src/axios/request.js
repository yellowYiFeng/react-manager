import jsonP from 'jsonp'
export default class Axios {
    static JsonP(options){
        return new Promise((resolve,reject)=>{
            jsonP(options.url,{param:'callback'},function(err,response){
                if(response.status == "success"){
                    resolve(response.results)
                }else{
                    reject(response.error)
                }
            })
        })
    }
}