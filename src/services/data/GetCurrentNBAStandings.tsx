import { HttpService } from "../Http/HttpService";

const GetCurrentNBAStandings = () => {
	const httpService = HttpService();

	return httpService.get({
		url: "/api/Team/GetCurrentNBAStandings",
		token: null,
		params: {}
	});
}

export default GetCurrentNBAStandings;