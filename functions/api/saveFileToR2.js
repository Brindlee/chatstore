const getData = async (data,env) => {
	console.log('req body', data);
	console.log('env cf account key', env.R2_AUTH_KEY_SECRET);
    var filename = 'test.js';
    for (var pair of data.entries()) {
        if( pair[0] == 'filename' ) {
            filename =  pair[1];
        }
    }
    const url = 'https://worker-r2.integrately.workers.dev/vuestandaloneapp/files/'+filename; //todo : file name dynamic
	const options = {
	  method: "PUT",
	  
	  headers: {
		//"Content-Type": "multipart/form-data",
        "X-Custom-Auth-Key" : `${env.R2_AUTH_KEY_SECRET}`
	  },
	  body: data,
	};
  
	try {
	  const result = await fetch(url, options);
	 //console.log("result", await result.text());
	  return result;
	} catch (e) {
	  console.log(e);
	}
}

export async function onRequestPut({request, env}) {
	//const reqbody = await request.json()
    const reqbody =  await request.formData();
    //var reqData = JSON.stringify({model:reqbody.model, messages : reqbody.messages});
	//var reqData = JSON.stringify( reqbody );
    try {
	  //const resp = await getData(reqData,env);
      const resp = await getData(reqbody,env);
      
	  //return new Response( JSON.stringify(await resp.json()));
	  return new Response( JSON.stringify(await resp.text()));
	} catch (e) {
	  //wrap your error object and send it
	  console.log("error: ", e);
	}
}