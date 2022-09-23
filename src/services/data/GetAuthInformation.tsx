import { HttpService } from "../Http/HttpService";

const GetAuthInformation = () => {
	const httpService = HttpService();

	return httpService.getExternal({
		url: 'https://nbaunderdogleague.azurewebsites.net/.auth/me',
		token: null,
		params: {},
	});
}

export default GetAuthInformation;