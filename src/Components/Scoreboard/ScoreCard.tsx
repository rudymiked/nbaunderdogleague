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
	Home: IScore;
	Visitor: IScore;
}

export const ScoreCard: React.FunctionComponent<IScoreCardProps> = (props: IScoreCardProps) => {
	const [ home, SetHome ] = React.useState<IScore>();
	const [ visitor, SetVisitor ] = React.useState<IScore>();

	React.useEffect(() => {
		SetHome(props.ScoreCardData.Home);
		SetVisitor(props.ScoreCardData.Visitor);
	}, []);

	return (
		<>
		{home !== undefined && visitor !== undefined &&
			<Table borderless size="sm" style={{ width: '250px' }}>
				<tbody>
					<tr>
						<td>{home.Governor}</td>
						<td><img src={home.Logo} alt={home.Team + " logo"} style={{ width: '20px', height: '20px'}} /></td>
						<td>{home.Score}</td>
					</tr>
					<tr>
						<td>{visitor.Governor}</td>
						<td><img src={visitor.Logo} alt={visitor.Team + " logo"} style={{ width: '20px', height: '20px'}} /></td>
						<td>{visitor.Score}</td>
					</tr>
				</tbody>
			</Table>
		}
	</>
	);
}