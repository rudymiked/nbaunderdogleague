import React from 'react';
import BootstrapTable, { ColumnDescription } from 'react-bootstrap-table-next';
import { IGroupStandingsData } from '../../Pages/GroupStandings';
import { RootContext } from '../../services/Stores/RootStore';
import { sortCaretFunc } from '../../Utils/Utils';
import { GroupStandingsTable } from '../Standings/GroupStandingsTable';

interface IFullStandingsData {}

export interface IFullStandingsProps {}

export const FullStandings: React.FunctionComponent<IFullStandingsProps> = (props: IFullStandingsProps) => {
	const { state, dispatch } = React.useContext(RootContext);

    React.useEffect(() => {

    }, [])

	return (
		<GroupStandingsTable 
            data={[]} 
        /> 
	);
}