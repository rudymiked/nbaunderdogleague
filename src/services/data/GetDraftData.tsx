import { HttpService } from "../Http/HttpService";

const GetDraftData = (groupId: string) => {
	const httpService = HttpService();

	return httpService.get({
		url: "/api/Draft/GetDraft",
		token: null,
		params: { groupId: groupId }
	});
}

export default GetDraftData;