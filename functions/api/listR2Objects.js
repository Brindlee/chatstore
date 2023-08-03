import {
	S3Client,
	ListObjectsV2Command
  } from "@aws-sdk/client-s3";
export async function onRequestPost({request, env}) {
	const reqbody = await request.json()
	//console.log( 'reqbody', reqbody['sinst'] );
	try {
		console.log('R2_ACCOUNT_KEY',env.R2_ACCOUNT_KEY);
		console.log('updated1 R2_AUTH_KEY_ID',env.R2_AUTH_KEY_ID);
		console.log('R2_AUTH_KEY_SECRET',env.R2_AUTH_KEY_SECRET);
		  const S3 = new S3Client({
			region: "auto",
			endpoint: `https://${env.R2_ACCOUNT_KEY}.r2.cloudflarestorage.com`,
			credentials: {
			  accessKeyId: env.R2_AUTH_KEY_ID,
			  secretAccessKey: env.R2_AUTH_KEY_SECRET,
			},
		  });
		  //return new Response('hi there');
		return new Response( await S3.send(new ListObjectsV2Command({ Bucket: 'abhishek' })) )
	} catch (e) {
	  //wrap your error object and send it
	  console.log("error: ", e);
	}
}