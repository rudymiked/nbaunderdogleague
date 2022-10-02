import { HttpService } from "../Http/HttpService";

const GetAllGroups = (includeUser: boolean, email: string) => {
	const httpService = HttpService();
	const year = new Date().getFullYear();

	return httpService.get({
		url: "/api/Group/GetAllGroupsByYear",
		token: null,
		params: { 
			year: year,
			includeUser: includeUser,
			email: email,
		}
	});
}

export default GetAllGroups;