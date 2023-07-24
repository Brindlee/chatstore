const getData = async (data) => {
	console.log('req body', data);
    const url = "https://api.openai.com/v1/chat/completions";
	const options = {
	  method: "POST",
	  
	  headers: {
		"Content-Type": "application/json",
		//Authorization: `Bearer ${import.meta.env.OPENAI_API_KEY}`,
		Authorization:
		  "Bearer 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",
	  },
	  body: data,
	};
  
	try {
	  const result = await fetch(url, options);
	  console.log("result", result);
	  return result;
	} catch (e) {
	  console.log(e);
	}
}

export async function onRequestPost({request, env}) {
   // let bodyObject = Object.fromEntries(request.body);
//let requestbody = JSON.stringify(bodyObject, null, 2);
console.log('req body 1',await request.text())
    console.log('model:',request.body.model);
    console.log('messages:',request.body.messages);
    var reqData = JSON.stringify({model:request.body.model, messages : request.body.messages});
	try {
	  const resp = await getData(reqData);
	  return new Response(JSON.stringify(resp.data));
	  //res.send(resp.data);
	} catch (e) {
	  //wrap your error object and send it
	  console.log("error: ", e);
	}

   // return new Response('hi')
  }
