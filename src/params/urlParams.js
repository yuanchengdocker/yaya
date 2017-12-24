var bashPath = "http://192.168.27.55:9080/mcy";
bashPath = "http://www.mengcy.com/mcyapi-deploy";
// bashPath = "/mcyapi-deploy";
// bashPath = "http://localhost:9080";
bashPath = "http://18.217.203.249:8888/api";

export var urlPath = {
    user: {
        login: bashPath + "/user/login",
        update: bashPath + "/user/update",
        info: bashPath + "/user/info",
        list: bashPath + "/user/list",
        delete: bashPath + "/user/delete",
        add: bashPath + "/user/add"
    },
    member: {
        add: bashPath + "/member/add",
        batchadd: bashPath + "/member/batchadd",
        delete: bashPath + "/member/delete",
        update: bashPath + "/member/update",
        list: bashPath + "/member/list",
        info: bashPath + "/member/info"
    }
}