import { CURRENT_YEAR } from "../../Utils/AppConstants";
import { HttpService } from "../Http/HttpService";

export const AppStart = () => {
	const httpService = HttpService();

	return httpService.get({
		url: '/api/App/Start',
		token: null,
		params: { start: true},
	});
}

export const GetAuthInformation = () => {
	const httpService = HttpService();

	return httpService.getExternal({
		url: 'https://nbaunderdogleague.azurewebsites.net/.auth/me',
		token: null,
		params: {},
	});
}

export const GetTeamsTable = () => {
	const httpService = HttpService();

	return httpService.get({
		url: "/api/Team/TeamsTable",
		token: null,
		params: {}
	});
}

export const GetTeamStats = () => {
	const httpService = HttpService();

	return httpService.get({
		url: "/api/Team/TeamStatsV2",
		token: null,
		params: {}
	});
}

export const GetUserData = (groupId: string) => {
	const httpService = HttpService();

	return httpService.get({
		url: "/api/User/Users",
		token: null,
		params: { groupId: groupId }
	});
}

export const GetGroupStandingsData = (groupId: string) => {
	const httpService = HttpService();

	return httpService.get({
		url: "/api/Group/GroupStandingsV2",
		token: null,
		params: { 
			groupId: groupId 
		}
	});
}

export const GetDraftData = (groupId: string) => {
	const httpService = HttpService();

	return httpService.get({
		url: "/api/Draft/Draft",
		token: null,
		params: { groupId: groupId }
	});
}

export const GetDraftResults = (groupId: string) => {
	const httpService = HttpService();

	return httpService.get({
		url: "/api/Draft/DraftResults",
		token: null,
		params: { groupId: groupId }
	});
}

export const GetAvailableTeamsToDraft = (groupId: string) => {
	const httpService = HttpService();

	return httpService.get({
		url: "/api/Draft/AvailableTeamsToDraft",
		token: null,
		params: {
			groupId: groupId
		}
	});
}

export const GetAllGroupsUserIsInByYear = (email: string) => {
	const httpService = HttpService();

	return httpService.get({
		url: "/api/Group/AllGroupsUserIsInByYear",
		token: null,
		params: { 
			email: email,
			year: CURRENT_YEAR 
		}
	});
}

export const GetAllGroups = (includeUser: boolean, email: string) => {
	const httpService = HttpService();

	return httpService.get({
		url: "/api/Group/AllGroupsByYear",
		token: null,
		params: { 
			year: CURRENT_YEAR,
			includeUser: includeUser,
			email: email,
		}
	});
}

export const GetArchiveSummary = (email: string) => {
	const httpService = HttpService();

	return httpService.get({
		url: "/api/Archive/ArchiveSummary",
		token: null,
		params: {
			email: email,
		}
	});
}

export const GetSeasonArchive = (groupId: string) => {
	const httpService = HttpService();

	return httpService.get({
		url: "/api/Archive/SeasonArchive",
		token: null,
		params: {
			groupId: groupId,
		}
	});
}

export const GetNBAScoreboard = (groupId: string) => {
	const httpService = HttpService();

	return httpService.get({
		url: "/api/NBA/NBAScoreboard",
		token: null,
		params: {
			groupId: groupId,
		}
	});
}

export const GetPlayerStats = () => {
	const httpService = HttpService();

	return httpService.get({
		url: "/api/Player/Statistics",
		token: null,
		params: {}
	});
}