import Form from "@/classes/Form.tsx";
import Header from "@/classes/Header.ts";
import { serveDir } from "@fs";

export default class Route {
	/**
	 * Return SSR form page
	 */
	static ssrFormPage = async () =>
		new Response(await Form.page(), {
			headers: {
				"Content-Type": "text/html",
			},
		});

	/**
	 * Serve static files in public directory and set content type
	 * - Default content type is text/html
	 *  - Available content types: text/css, text/javascript, text/html
	 */
	static staticPublicRoute = async (pathname: string, req: Request): Promise<Response> => {
		const extension = pathname.split(".").pop() ?? "";
		return Header.setContentType(
			await serveDir(req, {
				fsRoot: "thomas/formation/kh/cv/public",
			}),
			extension,
		);
	};

	static notFound = () => new Response("<h1>404 : Not Found</h1>", { status: 404 });
}
