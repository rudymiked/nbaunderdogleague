import { HttpService } from "../Http/HttpService";

const GetLeagueStandingsData = () => {
	const httpService = HttpService();

	return httpService.get({
		url: "/api/League/GetLeagueStandings",
		token: null,
		params: {}
	});
}

export default GetLeagueStandingsData;