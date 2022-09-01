function saveProjectNames(prefix,key,arrayData){
    let data = []
    if(getStore(prefix+key)){
        let arr = JSON.parse(getStore(prefix+key))
        arr.push(arrayData);
        setStore(prefix+key,JSON.stringify(arr))
    }else{
        data.push(arrayData)
        setStore(prefix+key,JSON.stringify(data))
    }
}

function getStore(key){
    if(localStorage.getItem(key)){
        return localStorage.getItem(key)
    }else{
        return false
    }
}

function setStore(key,value){
    localStorage.setItem(key,value)
}

function rmStoreData(key,rmTitle){
    if(localStorage.getItem(key)){
        if(JSON.parse(localStorage.getItem(key)) instanceof Array){
            let currentData = JSON.parse(localStorage.getItem(key))
            let handlerData = currentData.filter(item=>item.title !== rmTitle)
            setStore(key,JSON.stringify(handlerData))
            return handlerData
        }
    }else{
        return false
    }
}

export {
    saveProjectNames,
    getStore,
    setStore,
    rmStoreData
}