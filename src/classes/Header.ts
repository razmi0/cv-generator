export default class Header {
	static setContentType = (response: Response, extension: string) => {
		if (!/(css|js|html)/.test(extension)) {
			return new Response(`Cannot set content type on unknown extension file : ${extension}`, {
				status: 404,
			});
		}
		let contentType = "text/html";
		switch (extension) {
			case "css":
				contentType = "text/css";
				break;
			case "js":
				contentType = "text/javascript";
				break;
			default:
				break;
		}
		response.headers.set("Content-Type", contentType);
		return response;
	};
}
