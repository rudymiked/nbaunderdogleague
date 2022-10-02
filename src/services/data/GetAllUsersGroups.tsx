import { HttpService } from "../Http/HttpService";

const GetAllUsersGroups = (user: string) => {
	const httpService = HttpService();
	const year = new Date().getFullYear();

	return httpService.get({
		url: "/api/Group/GetAllGroupsUserIsInByYear",
		token: null,
		params: { 
			user: user,
			year: year 
		}
	});
}

export default GetAllUsersGroups;