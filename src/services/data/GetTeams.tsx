import { HttpService } from "../Http/HttpService";

const GetTeamsTable = () => {
	const httpService = HttpService();

	return httpService.get({
		url: "/api/Team/TeamsTable",
		token: null,
		params: {}
	});
}

export default GetTeamsTable;