import React from 'react';
import { Card } from 'react-bootstrap';
import { StandingsTable } from '../Components/Standings/StandingsTable';
import GetStandingsData from '../services/data/GetStandingsData';

export interface IStandings {
    TeamId: number;
    TeamCity: string;
    TeamName: string;
    TeamFullName: string;
    Win: number;
    Loss: number;
    WinPct: number;
    Playoffs: string;
}

interface IStandingsPageProps {}

const somethingWentWrongText = "Something Went Wrong";
const Title = "Standings";

export const Standings: React.FunctionComponent<IStandingsPageProps> = (props: IStandingsPageProps) => {
    const [data, SetData] = React.useState<IStandings[]>([]);
    const [dataFailedToLoad, SetDataFailedToLoad] = React.useState<Boolean>(false);
    const [loadingError] = React.useState<string>(somethingWentWrongText);

    React.useEffect(() => {
        GetStandingsData().then((response: any) => {
            if (response?.status === 200 && response?.data !== undefined) {
                const leagueData = response?.data.league.standard.teams;
                const fetchedStandingsData: IStandings[] = [];
                leagueData.forEach((team: any) =>{
                    fetchedStandingsData.push({
                        TeamId: team.teamId,
                        TeamCity: team.teamSitesOnly.teamName,
                        TeamName: team.teamSitesOnly.teamNickname,
                        TeamFullName: team.teamSitesOnly.teamName + " " + team.teamSitesOnly.teamNickname,
                        Win: team.win,
                        Loss: team.loss,
                        WinPct: team.winPct,
                        Playoffs: team.clinchedPlayoffsCode,
                    })
                });

                SetData(fetchedStandingsData);
            }
        }).catch((reason: any) =>{
            SetDataFailedToLoad(true);
        });
    }, []);

    return (
        <div className='PageBody'>
            <Card style={{padding: '10px'}}>
                <Card.Title>{Title}</Card.Title>
                <Card.Body>
                    {!dataFailedToLoad ? (
                        <StandingsTable data={data} />
                    ) : (
                        <div>
                            <p>{loadingError}</p>
                        </div>
                    )}
                </Card.Body>
            </Card>
        </div>
    );
}