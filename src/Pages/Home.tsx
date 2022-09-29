import React from 'react';
import { Card } from 'react-bootstrap';
import { Error } from '../Components/Error/Error';

interface ITeamPageProps {}

interface IGroupData {}

const loadingDataText: string = "Loading Data...";
const Title = "NBA Underdogs";

export const Home: React.FC = (props: ITeamPageProps) => {
	const [groups, SetGroups] = React.useState<IGroupData[]>([]);
	const [dataFailedToLoad, SetDataFailedToLoad] = React.useState<Boolean>(false);
	const [dataLoaded, SetDataLoaded] = React.useState<boolean>(false);

	React.useEffect(() => {
		// GetGroups().then((response: IGroupDataResponse) => {
		// 	if (response?.data) {
				SetDataLoaded(true);
		// 		SetGroups(response.data);
		// 	}
		// }).catch((reason: any) => {
		// 	SetDataLoaded(true);
		// 	SetDataFailedToLoad(true);
		// });
	}, []);

	return (
		<div className='page-body'>
			<Card style={{padding: '10px'}}>
				<Card.Title>{Title}</Card.Title>
				<Card.Body style={{overflow: 'auto'}}>
					{!dataLoaded ? (
						<div>
							<p>{loadingDataText}</p>
						</div>
					) : ( !dataFailedToLoad ? (
                            <div>
                                <p>Join a group!</p>
                                {/* <p>{groups.join(", ")}</p> */}
                            </div>
						) : (
							<Error />
						)
					)}
				</Card.Body>
			</Card>
		</div>
	);
}