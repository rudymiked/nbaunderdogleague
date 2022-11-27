import React from 'react';
import { RootContext } from '../services/Stores/RootStore';
import { Card } from 'react-bootstrap';
import { Loading } from '../Components/Shared/Loading';
import { Error } from "../Components/Error/Error";
import { ArchiveTable } from '../Components/Standings/ArchiveTable';
import { GetSeasonArchive } from '../services/data/GetRequests';
import { useLocation } from 'react-router-dom';

export interface IArchiveStandingsData {
    groupId: string;
    year: number;
    governor: string;
    email: string;
    teamId: number;
    teamCity: string;
    teamName: string;
    standing: number;
    score: number;
    projectedWin: number;
    projectedLoss: number;
    wins: number;
    losses: number;
    clinchedPlayoffBirth: number;
    playoffWins: number;
}

interface IArchiveStandingsResponse {
    data: IArchiveStandingsData[];
}

export interface IArchiveStandingsProps {}

export const ArchiveStandings: React.FunctionComponent<IArchiveStandingsProps> = (props: IArchiveStandingsProps) => {
    const [title, SetTitle] = React.useState<string>("")
    const [data, SetData] = React.useState<IArchiveStandingsData[]>([]);
	const [dataFailedToLoad, SetDataFailedToLoad] = React.useState<boolean>(false);
	const [dataLoaded, SetDataLoaded] = React.useState<boolean>(false);
	const { state, dispatch } = React.useContext(RootContext);
    const location = useLocation();

    React.useEffect(() => {
		if (location.state?.groupId !== "") {
			GetSeasonArchive(location.state?.groupId).then((response: IArchiveStandingsResponse) => {
				if (response?.data) {
					const data = response.data;
					SetDataLoaded(true);
                    SetTitle(location.state.groupName + " - " + location.state.year);
					SetData(data);
				} else {
					// no standings data
				}
			}).catch((reason: any) => {
				SetDataLoaded(true);
				SetDataFailedToLoad(true);
			});
		}
    }, [])

	return (
        <Card style={{padding: '10px', maxWidth: '95vw'}}>
            <Card.Title className='card-title'>{title}</Card.Title>
            <Card.Body style={{overflow: 'auto'}}>
                {!dataLoaded ? (
                    <Loading />
                ) : ( !dataFailedToLoad ? (
                    <ArchiveTable 
                        data={data} 
                /> 
                    ) : (
                        <Error />
                    )
                )}
            </Card.Body>
        </Card>
	);
}