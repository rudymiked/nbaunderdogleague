import React from 'react';
import { Card } from 'react-bootstrap';
import './TeamSelector.css';
import { IStandingsTableProps, StandingsTable } from '../Standings/StandingsTable';
import { IStandingData } from '../../Pages/Standings';

export const TeamSelector: React.FunctionComponent<IStandingsTableProps> = (props: IStandingsTableProps) => {
	const [ selectedTeam, SetSelectedTeam ] = React.useState<IStandingData>({
		teamId: 0,
		teamCity: '',
		teamName: '',
		teamFullName: '',
		win: 0,
		loss: 0,
		winPct: 0,
		playoffs: ''
	});

	const handleChange = (value: string) => {
		const newSelectedTeam = props.data.find((team) => team.teamFullName === value);
		SetSelectedTeam(newSelectedTeam);
	};

	const handleDraftClicked = () => {
		// TODO Make this have state so the value is actually correct. Having a default blank/disabled is kind of a workaround
		if (selectedTeam.teamFullName !== '') {
			console.log("Drafting: " + selectedTeam.teamFullName);
			// TODO Make an API call
		}
	};

	return (
		<Card className='team-selector'>
			<Card.Title className='card-title'>Draft a team</Card.Title>
			<Card.Body>
				<select name='team-select' className='team-select' onChange={(e) => handleChange(e.target.value)} defaultValue={0}>
					<option disabled value={0}>Select a team...</option>
					{props.data.map((option) => <option key={option.teamFullName} value={option.teamFullName}>{option.teamFullName}</option>)}
				</select>
				<button onClick={() => handleDraftClicked()}>
					Draft!
				</button>
				<hr/>
				<StandingsTable data={props.data} />
			</Card.Body>
		</Card>
	);
}