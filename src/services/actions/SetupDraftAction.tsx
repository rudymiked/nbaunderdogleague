import { HttpService } from "../Http/HttpService";

const SetupDraftAction = (groupId: string, email: string, clearTeams: boolean, draftStartDateTime: Date, draftWindow: number) => {
	const httpService = HttpService();

	return httpService.post({
		url: '/api/Draft/SetupDraft',
		token: null,
		data: {
			groupId: groupId,
			email: email,
			clearTeams: clearTeams,
			draftStartDateTime: draftStartDateTime,
			draftWindow: draftWindow,
		},
	});
}

export default SetupDraftAction;