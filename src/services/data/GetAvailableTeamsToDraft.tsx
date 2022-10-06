import { HttpService } from "../Http/HttpService";

const GetAvailableTeamsToDraft = (groupId: string) => {
	const httpService = HttpService();

	return httpService.get({
		url: "/api/Draft/GetAvailableTeamsToDraft",
		token: null,
		params: {
			groupId: groupId
		}
	});
}

export default GetAvailableTeamsToDraft;