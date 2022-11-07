import { HttpService } from "../Http/HttpService";

const AppStart = () => {
	const httpService = HttpService();

	return httpService.get({
		url: '/api/App/Start',
		token: null,
		params: { start: true},
	});
}

export default AppStart;