import axios from 'axios'
const getData = async (body) => {
	console.log('body', body);
	const options = {
	  method: "POST",
	  url: "https://api.openai.com/v1/chat/completions",
	  headers: {
		"Content-Type": "application/json",
		//Authorization: `Bearer ${import.meta.env.OPENAI_API_KEY}`,
		Authorization:
		  "Bearer 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",
	  },
	  data: body,
	};
  
	try {
	  const result = await axios(options);
	  console.log("result", result);
	  return result;
	} catch (e) {
	  console.log(e);
	}
}

export async function onRequest(context) {

    var reqData = JSON.stringify({model:context.request.body.model, messages : context.request.body.messages});
	try {
	  const resp = await getData(reqData);
	  return new Response(JSON.stringify(resp.data, null, 2));
	  //res.send(resp.data);
	} catch (e) {
	  //wrap your error object and send it
	  console.log("error: ", e);
	}

   // return new Response('hi')
  }