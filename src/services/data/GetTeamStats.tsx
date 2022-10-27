import { HttpService } from "../Http/HttpService";

const GetTeamStats = () => {
	const httpService = HttpService();

	return httpService.get({
		url: "/api/Team/TeamStats",
		token: null,
		params: {}
	});
}

export default GetTeamStats;