const getData = async (data,env) => {
	console.log('req body', data);
	console.log('env', env.ENVIRONMENT);
    const url = "https://api.openai.com/v1/chat/completions";
	const options = {
	  method: "POST",
	  
	  headers: {
		"Content-Type": "application/json",
		Authorization: `Bearer ${env.OPENAI_API_KEY}`
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

export async function onRequestPost({request, env}) {
	const reqbody = await request.json()
    var reqData = JSON.stringify({model:reqbody.model, messages : reqbody.messages});
	try {
	  const resp = await getData(reqData,env);
	  return new Response( JSON.stringify(await resp.json()));
	} catch (e) {
	  //wrap your error object and send it
	  console.log("error: ", e);
	}
}
