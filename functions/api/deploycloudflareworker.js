const getData = async (data,env) => {
	console.log('req body', data);
	console.log('env cf account key', env.CLOUDFLARE_ACCOUNT_KEY);
    const url = `https://api.cloudflare.com/client/v4/accounts/${env.CLOUDFLARE_ACCOUNT_KEY}/workers/scripts/zapierworker`; //worker name dynamic
	const options = {
	  method: "POST",
	  
	  headers: {
		"Content-Type": "multipart/form-data",
        "X-Auth-Email" : `${env.CLOUDFLARE_AUTH_EMAIL}`,
        "X-Auth-Key" : `${env.CLOUDFLARE_AUTH_KEY}`
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
      
	  return new Response( JSON.stringify(await resp.json()));
	} catch (e) {
	  //wrap your error object and send it
	  console.log("error: ", e);
	}
}