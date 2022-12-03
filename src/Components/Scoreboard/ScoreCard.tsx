import React from 'react';
import { Table } from 'react-bootstrap';
import { RootContext } from '../../services/Stores/RootStore';

export interface IScoreCardProps {
	ScoreCardData: IScoreCardData;
}

export interface IScore {
	Governor: string;
	Team: string;
	Score: number;
	Logo: string;
}

export interface IScoreCardData {
	Winner: IScore;
	Loser: IScore;
}

export const ScoreCard: React.FunctionComponent<IScoreCardProps> = (props: IScoreCardProps) => {
	const { state, dispatch } = React.useContext(RootContext);
	const [ winner, SetWinner ] = React.useState<IScore>();
	const [ loser, SetLoser ] = React.useState<IScore>();

	React.useEffect(() => {
		SetWinner(props.ScoreCardData.Winner);
		SetLoser(props.ScoreCardData.Loser);
	}, []);

	return (
		<>
		{winner !== undefined && loser !== undefined &&
			<Table borderless size="sm" style={{ width: '250px' }}>
				{/* <thead>
					<tr>
						<th>
							{winner.Governor}
						</th>
						<th>
							v.
						</th>
						<th>
							{loser.Governor}
						</th>
					</tr>
				</thead> */}
				<tbody>
					<tr>
						<td>{winner.Governor}</td>
						<td><img src={winner.Logo} alt={winner.Team + " logo"} style={{ width: '20px', height: '20px'}} /></td>
						<td><b>{winner.Score}</b></td>
					</tr>
					<tr>
						<td>{loser.Governor}</td>
						<td><img src={loser.Logo} alt={loser.Team + " logo"} style={{ width: '20px', height: '20px'}} /></td>
						<td>{loser.Score}</td>
					</tr>
				</tbody>
			</Table>
		}
	</>
	);
}