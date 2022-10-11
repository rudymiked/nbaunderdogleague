import { HttpService } from "../Http/HttpService";

const GetUserData = (groupId: string) => {
	const httpService = HttpService();

	return httpService.get({
		url: "/api/User/Users",
		token: null,
		params: { groupId: groupId }
	});
}

export default GetUserData;