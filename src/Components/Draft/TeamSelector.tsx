import React from 'react';
import { Button, Card, Dropdown } from 'react-bootstrap';
import './TeamSelector.css';
import { LeagueStandingsTable } from '../Standings/LeagueStandingsTable';
import { ILeagueStandingData } from '../../Pages/LeagueStandings';

export interface ITeamSelectorProps {
	data: ILeagueStandingData[];
}

export const TeamSelector: React.FunctionComponent<ITeamSelectorProps> = (props: ITeamSelectorProps) => {
	const [ selectedTeam, SetSelectedTeam ] = React.useState<ILeagueStandingData>({
		governor: "",
		teamName: "",
		teamCity: "",
		projectedWin: 0,
		projectedLoss: 0,
		win: 0,
		loss: 0,
		playoffs: ""
	});

	const handleChange = (value: string) => {
		const newSelectedTeam = props.data.find((team: ILeagueStandingData) => team.teamName === value);
		SetSelectedTeam(newSelectedTeam);
	};

	const handleDraftClicked = () => {
		// TODO Make this have state so the value is actually correct. Having a default blank/disabled is kind of a workaround
		if (selectedTeam.teamName !== '') {
			console.log("Drafting: " + selectedTeam.teamName);
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
					{props.data.map((option: ILeagueStandingData) => <Dropdown.Item key={option.teamName} value={option.teamName}>{option.teamName}</Dropdown.Item>)}
				</Dropdown.Menu>
				</Dropdown>
				<br />
				<Button onClick={() => handleDraftClicked()}>
					Draft!
				</Button>
				<hr/>
				<LeagueStandingsTable data={props.data} />
			</Card.Body>
		</Card>
	);
}