import { HttpService } from "../Http/HttpService";

const GetGroupStandingsData = () => {
	const httpService = HttpService();

	return httpService.get({
		url: "/api/Group/GetGroupStandings",
		token: null,
		params: {} // need to add group ID
	});
}

export default GetGroupStandingsData;