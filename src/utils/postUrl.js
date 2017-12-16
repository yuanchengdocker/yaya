// import $ from 'jquery';

export function post(url,param,callback){
	$.ajax({
	    url: url,
	    type: 'post',
	    datatype: 'json',
	    contentType: 'application/json',
	    data:JSON.stringify(param),
	    success: function(data){
	        callback && callback(data);
	    },
	    error: function(e){
			callback && callback(e);
	    }
    });
}