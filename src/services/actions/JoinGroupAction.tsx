import { HttpService } from "../Http/HttpService";

const JoinGroupAction = (groupId: string, email: string) => {
	const httpService = HttpService();

	return httpService.post({
		url: '/api/Group/JoinGroup',
		token: null,
		data: {
			groupId: groupId,
			email: email,
		},
	});
}

export default JoinGroupAction;