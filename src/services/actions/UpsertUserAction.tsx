import { HttpService } from "../Http/HttpService";

// Upsert User information -- replaces with existing data

const UpsertUser = (email: string, team: string, group: string, username: string) => {
	const httpService = HttpService();

	return httpService.post({
		url: '/api/User/UpsertUser',
		token: null,
		data: {
			group: group,
			email: email,
			team: team,
			username: username,
		},
	});
}

export default UpsertUser;