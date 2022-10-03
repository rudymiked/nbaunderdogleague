import { HttpService } from "../Http/HttpService";

const CreateGroupAction = (name: string, ownerEmail: string) => {
	const httpService = HttpService();

	return httpService.post({
		url: '/api/Group/CreateGroup',
		token: null,
		data: {
			name: name,
			ownerEmail: ownerEmail,
		},
	});
}

export default CreateGroupAction;