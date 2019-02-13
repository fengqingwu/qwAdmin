import http from "../../../../utils/public.js"

export let productionInsert = (data, self) => {
    return http.fetchPost("/production/insert", data, self)
}
export let productionUpdate = (data, self) => {
    return http.fetchPost("/production/update", data, self)
}
export let productionFind = (data, self) => {
    return http.fetchPost("/production/find", data, self)
}

export let productionFindMacCodeOption = (data, self) => {
    return http.fetchPost("/production/findMacCodeOption", data, self)
}
export let productionMacTypeOption = (data, self) => {
    return http.fetchPost("/production/macTypeOption", data, self)
}


// productionInsert,
// productionUpdate,
// productionFind,
// productionFindMacCodeOption,
// productionMacTypeOption

