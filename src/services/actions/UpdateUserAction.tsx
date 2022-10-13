import { HttpService } from "../Http/HttpService";

// Update User information -- merges with existing data

const UpdateUser = (email: string, team: string, group: string, username: string) => {
	const httpService = HttpService();

	return httpService.post({
		url: '/api/User/UpdateUser',
		token: null,
		data: {
			group: group,
			email: email,
			team: team,
			username: username,
		},
	});
}

export default UpdateUser;