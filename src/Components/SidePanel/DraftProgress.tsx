import React from 'react';
import { Card } from 'react-bootstrap';
import './DraftProgress.css';
import BootstrapTable from 'react-bootstrap-table-next';
import GetUserData from '../../services/data/GetUserData';
import { Loading } from '../Shared/Loading';
import { Error } from '../Error/Error';

export interface IDraftProgressProps {}

export interface IUserData {
	email: string;
	team: string;
}

export interface IUserDataResponse {
	data: IUserData[];
}

export const DraftProgress: React.FunctionComponent<IDraftProgressProps> = (props: IDraftProgressProps) => {
	const [users, SetUsers] = React.useState<IUserData[]>([]);
	const [dataLoaded, SetDataLoaded] = React.useState<Boolean>(false);
	const [dataFailedToLoad, SetDataFailedToLoad] = React.useState<Boolean>(false);

	React.useEffect(() => {
		// GetUserData("").then((response: IUserDataResponse) => {
		// 	if (response?.data) {
		// 		console.log(response.data);
				SetDataLoaded(true);
		// 		SetUsers(response.data);
		// 	}
		// }).catch((reason: any) => {
		// 	SetDataLoaded(true);
		// 	SetDataFailedToLoad(true);
		// });
	}, []);

	const columns = [
		{
			dataField: 'email',
			text: 'Email'
		},
		{
			dataField: 'team',
			text: 'Team'
		}
	];

	return (
		<Card className='side-panel'>
			<Card.Title className='card-title'>Draft Progress</Card.Title>
			<Card.Body style={{overflow: 'auto'}}>
				{!dataLoaded ? (
					<Loading />
				) : ( !dataFailedToLoad ? (
					<BootstrapTable
						keyField='email'
						data={users}
						columns={columns} />
					) : (
						<Error />
					)
				)}
			</Card.Body>
		</Card>
	);
}