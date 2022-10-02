import { HttpService } from "../Http/HttpService";

const CreateGroupAction = (name: string, ownerEmail: string) => {
	const httpService = HttpService();

	return httpService.post({
		url: '/api/Group/CreateGroup',
		token: null,
		data: {
			name: name,
			owner: ownerEmail,
			id: null,
			year: 2022,
		},
	});
}

export default CreateGroupAction;