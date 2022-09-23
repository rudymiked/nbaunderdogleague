import { HttpService } from "../Http/HttpService";

const GetTeamData = () => {
	const httpService = HttpService();

	return httpService.get({
		url: "/api/Team/GetTeams",
		token: null,
		params: {}
	});
}

export default GetTeamData;