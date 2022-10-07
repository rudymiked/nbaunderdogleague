import { HttpService } from "../Http/HttpService";

const DraftTeamAction = (group: string, email: string, team: string) => {
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

export default DraftTeamAction;