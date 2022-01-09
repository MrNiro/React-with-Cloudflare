addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})
/**
 * Respond with hello worker text
 * @param {Request} request
 */
async function handleRequest(request) {
	let response;
	if(request.method == "POST"){

		let content = (await request.text()).toString();
		name_post = content.split('&&&&&');
		name = name_post[0].split('=')[1];
		post = name_post[1].split('=')[1];

		await MY_KV.put(name, post);

		console.log(name, post);

		response = new Response("Posting done!", {
			headers: { 'content-type': 'text/plain',
				'Access-Control-Allow-Origin': '*',
		 	},
		});
	}
	else{
		const all_keys = await MY_KV.list();
		let content = '';
		for(let i = 0; i < all_keys.keys.length; i++){
			let name = all_keys.keys[i].name;
			let value = await MY_KV.get(name);
			content += (name + ": " + value + "\n\n")
		}

		response = new Response(content, 
			{
				headers: { 'content-type': 'text/plain',
					'Access-Control-Allow-Origin': '*',
			},
		});
	}
	return response;
}
