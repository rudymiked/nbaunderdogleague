import { HttpService } from "../Http/HttpService";

const GetAllUsersGroups = (email: string) => {
	const httpService = HttpService();
	const year = new Date().getFullYear();

	return httpService.get({
		url: "/api/Group/GetAllGroupsUserIsInByYear",
		token: null,
		params: { 
			email: email,
			year: year 
		}
	});
}

export default GetAllUsersGroups;