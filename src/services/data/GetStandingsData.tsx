import { HttpService } from "../Http/HttpService";

const GetStandingsData = () => {
	const httpService = HttpService();

	return httpService.get({
		url: "/api/Team/GetStandings",
		token: null,
		params: {}
	});
}

export default GetStandingsData;