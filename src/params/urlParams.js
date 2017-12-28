var bashPath = "/api";

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