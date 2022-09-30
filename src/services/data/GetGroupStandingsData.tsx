import { HttpService } from "../Http/HttpService";

const GetGroupStandingsData = (groupId: string) => {
	const httpService = HttpService();

	return httpService.get({
		url: "/api/Group/GetGroupStandings",
		token: null,
		params: { groupId: groupId}
	});
}

export default GetGroupStandingsData;