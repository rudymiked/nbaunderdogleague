import { HttpService } from "../Http/HttpService";

const GetAllGroups = () => {
	const httpService = HttpService();
	const year = new Date().getFullYear();

	return httpService.get({
		url: "/api/Group/GetAllGroupsByYear",
		token: null,
		params: { year: year }
	});
}

export default GetAllGroups;