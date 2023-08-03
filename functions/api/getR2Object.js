const getData = async (data,env) => {
	console.log('req body', data);
	console.log('env', env.ENVIRONMENT);
    const url = 'https://worker-r2.integrately.workers.dev/'+data.selectedFile;
	const options = {
	  method: "GET"
	  
	 /* headers: {
		"Content-Type": "application/json",
		Authorization: `Bearer ${env.OPENAI_API_KEY}`
	  },
	  body: data,*/
	};
  
	try {
	  const result = await fetch(url, options);
	 //console.log("result", await result.text());
	  return result;
	} catch (e) {
	  console.log(e);
	}
}

export async function onRequestPost({request, env}) {
	const reqbody = await request.json()
	try {
	  const resp = await getData(reqbody,env);
	  return new Response( await resp.text() );
	} catch (e) {
	  //wrap your error object and send it
	  console.log("error: ", e);
	}
}
