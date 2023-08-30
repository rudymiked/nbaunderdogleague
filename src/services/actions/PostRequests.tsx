import { HttpService } from "../Http/HttpService";

export const CreateGroupAction = (name: string, ownerEmail: string) => {
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

export const DraftTeamAction = (group: string, email: string, team: string) => {
	const httpService = HttpService();

	return httpService.post({
		url: '/api/Draft/DraftTeam',
		token: null,
		data: {
			group: group,
			email: email,
            team: team,
		},
	});
}

export const JoinGroupAction = (groupId: string, email: string) => {
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

export const JoinRequestAction = (groupId: string, email: string) => {
	const httpService = HttpService();

	return httpService.post({
		url: '/api/Invitation/JoinRequest',
		token: null,
		data: {
			groupId: groupId,
			email: email,
		},
	});
}

export const SetupDraftAction = (groupId: string, email: string, clearTeams: boolean, draftStartDateTime: Date, draftWindow: number) => {
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

// Update User information -- merges with existing data
export const UpdateUser = (email: string, team: string, group: string, username: string) => {
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

// Upsert User information -- replaces with existing data
export const UpsertUser = (email: string, team: string, group: string, username: string) => {
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
