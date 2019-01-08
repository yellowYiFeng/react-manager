export default{
    //格式化时间
    formatDate(time){
        if(!time) return '';
        let date = new Date(time);
        return date.getFullYear()+'-'+(date.getMonth()+1)+'-'+date.getDate()+'-'+date.getMinutes()+'-'+date.getSeconds();
    },
    //数组去重 
    uniqueArray (arr) {
        var res = [arr[0]];
        for(var i = 1; i < arr.length; i++){
            var repeat = false;
            for(var j = 0; j < res.length; j++){
                if(arr[i] == res[j]){
                    repeat = true;
                    break;
                }
            }
            if(!repeat){
                res.push(arr[i]);
            }
        }
        return res;
    },
    //分页
    pagination (data,callback) {
        return {
            onChange: (current) => {
                callback(current)
            },
            current: data.result.page,
            pageSize:data.result.page_size,
            total: data.result.total,
            showTotal:()=>{
                return `共${data.result.total}条`
            },
            showQuickJumper:true
        }
    }
}