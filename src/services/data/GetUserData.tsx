import { HttpService } from "../Http/HttpService";

const GetUserData = () => {
	const httpService = HttpService();

	return httpService.get({
		url: "/api/User/GetUsers",
		token: null,
		params: {}
	});
}

export default GetUserData;