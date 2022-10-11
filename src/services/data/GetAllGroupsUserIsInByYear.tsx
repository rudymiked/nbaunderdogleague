import { HttpService } from "../Http/HttpService";

const GetAllGroupsUserIsInByYear = (email: string) => {
	const httpService = HttpService();
	const year = new Date().getFullYear();

	return httpService.get({
		url: "/api/Group/AllGroupsUserIsInByYear",
		token: null,
		params: { 
			email: email,
			year: year 
		}
	});
}

export default GetAllGroupsUserIsInByYear;