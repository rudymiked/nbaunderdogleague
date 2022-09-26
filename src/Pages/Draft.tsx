import React from 'react';
import { ITeamSelectorProps, TeamSelector } from '../Components/Draft/TeamSelector';
import { ISidePanelProps, SidePanel } from '../Components/SidePanel/SidePanel';
import GetStandingsData from '../services/data/GetStandingsData';
import GetUserData from '../services/data/GetUserData';
import { IStandingData } from './Standings';

interface IDraftPageProps {}

export interface IUserData {
	email: string;
	team: string;
}

export interface IUserDataResponse {
	data: IUserData[];
}

export const Draft: React.FunctionComponent = (props: IDraftPageProps) => {
	const [ users, SetUsers ] = React.useState<IUserData[]>([{ email: "", team: "" }]);
	const [data, SetData] = React.useState<IStandingData[]>([]);
	const [dataFailedToLoad, SetDataFailedToLoad] = React.useState<Boolean>(false);

	React.useEffect(() => {
		GetUserData().then((response: IUserDataResponse) => {
			if (response?.data) {
				SetUsers(response.data);
			}
		}).catch((reason: any) => {
			//
		});

		GetStandingsData().then((response: any) => {
			if (response?.status === 200 && response?.data !== undefined) {
				const leagueData = response?.data.league.standard.teams;
				const fetchedStandingsData: IStandingData[] = [];
				leagueData.forEach((team: any) => {
					fetchedStandingsData.push({
						teamId: team.teamId,
						teamCity: team.teamSitesOnly.teamName,
						teamName: team.teamSitesOnly.teamNickname,
						teamFullName: team.teamSitesOnly.teamName + " " + team.teamSitesOnly.teamNickname,
						win: team.win,
						loss: team.loss,
						winPct: team.winPct,
						playoffs: team.clinchedPlayoffsCode,
					})
				});

				SetData(fetchedStandingsData);
			}
		}).catch((reason: any) => {
			SetDataFailedToLoad(true); // TODO Use this to display an error
		});
	}, []);

    const teamSelectorProps: ITeamSelectorProps = {
        data: data
    }

    const sidePanelProps: ISidePanelProps = {
        data: users
    }

	return (
		<div className='page-body'>
			<SidePanel {...sidePanelProps} />
			<TeamSelector {...teamSelectorProps} />
		</div>
	);
}