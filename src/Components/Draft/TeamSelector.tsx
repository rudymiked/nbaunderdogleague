import React from 'react';
import { Button, Card, Dropdown } from 'react-bootstrap';
import './TeamSelector.css';
import { StandingsTable } from '../Standings/StandingsTable';
import { IStandingData } from '../../Pages/Standings';

export interface ITeamSelectorProps {
	data: IStandingData[];
}

export const TeamSelector: React.FunctionComponent<ITeamSelectorProps> = (props: ITeamSelectorProps) => {
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
		const newSelectedTeam = props.data.find((team: IStandingData) => team.teamFullName === value);
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
				<Dropdown>
				<Dropdown.Toggle id="dropdown-basic-button" title="Select a Team">Select a Team</Dropdown.Toggle>
				<Dropdown.Menu>
					{props.data.map((option: IStandingData) => <Dropdown.Item key={option.teamFullName} value={option.teamFullName}>{option.teamFullName}</Dropdown.Item>)}
				</Dropdown.Menu>
				</Dropdown>
				<br />
				<Button onClick={() => handleDraftClicked()}>
					Draft!
				</Button>
				<hr/>
				<StandingsTable data={props.data} />
			</Card.Body>
		</Card>
	);
}