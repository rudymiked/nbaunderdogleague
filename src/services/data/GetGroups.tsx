import { HttpService } from "../Http/HttpService";

const GetGroups = () => {
	const httpService = HttpService();
	const year = new Date().getFullYear();

	return httpService.get({
		url: "/api/Group/GetGroups",
		token: null,
		params: { year }
	});
}

export default GetGroups;