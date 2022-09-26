import React from 'react';
import { Card } from 'react-bootstrap';
import { Error } from '../Components/Error/Error';
import { StandingsTable } from '../Components/Standings/StandingsTable';
import GetStandingsData from '../services/data/GetStandingsData';

export interface IStandingData {
	teamId: number;
	teamCity: string;
	teamName: string;
	teamFullName: string;
	win: number;
	loss: number;
	winPct: number;
	playoffs: string;
}

interface IStandingsPageProps {}

const Title = "Standings";

export const Standings: React.FunctionComponent<IStandingsPageProps> = (props: IStandingsPageProps) => {
	const [data, SetData] = React.useState<IStandingData[]>([]);
	const [dataFailedToLoad, SetDataFailedToLoad] = React.useState<Boolean>(false);

	React.useEffect(() => {
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
			SetDataFailedToLoad(true);
		});
	}, []);

	return (
		<div className='page-body'>
			<Card style={{padding: '10px'}}>
				<Card.Title>{Title}</Card.Title>
				<Card.Body>
					{!dataFailedToLoad ? (
						<StandingsTable data={data} />
					) : (
						<Error />
					)}
				</Card.Body>
			</Card>
		</div>
	);
}