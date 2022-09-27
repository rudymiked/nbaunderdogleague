import React from 'react';
import { ITeamSelectorProps, TeamSelector } from '../Components/Draft/TeamSelector';
import { ISidePanelProps, SidePanel } from '../Components/SidePanel/SidePanel';
import GetStandingsData from '../services/data/GetLeagueStandingsData';
import GetUserData from '../services/data/GetUserData';
import { ILeagueStandingData, ILeagueStandingDataResponse } from './LeagueStandings';

interface IDraftPageProps {}

export interface IUserData {
	email: string;
	team: string;
}

export interface IUserDataResponse {
	data: IUserData[];
}

export const Draft: React.FunctionComponent = (props: IDraftPageProps) => {
	const [users, SetUsers] = React.useState<IUserData[]>([]);
	const [data, SetData] = React.useState<ILeagueStandingData[]>([]);
	const [dataFailedToLoad, SetDataFailedToLoad] = React.useState<Boolean>(false);

	React.useEffect(() => {
		GetUserData().then((response: IUserDataResponse) => {
			if (response?.data) {
				SetUsers(response.data);
			}
		}).catch((reason: any) => {
			console.log(reason);
		});

        GetStandingsData().then((response: ILeagueStandingDataResponse) => {
			if (response?.data) {
				SetData(response?.data);
			}
		}).catch((reason: any) => {
            console.log(reason);
			SetDataFailedToLoad(true);
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