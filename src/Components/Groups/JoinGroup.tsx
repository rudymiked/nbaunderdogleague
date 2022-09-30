import React from 'react';
import GetAllGroups from '../../services/data/GetGroups';
import { RootContext } from '../../services/Stores/RootStore';

// Join a group that someone else has created for this season

export const JoinGroup: React.FunctionComponent = () => {
	const joinGroupText = "Join a group";

	const { state, dispatch } = React.useContext(RootContext);

	React.useEffect(() => {
		GetAllGroups().then((response: any) => {
			
		}).catch((reason: any) => {
			console.log(reason);
		});
	}, [])

	return (
		<div>
			<p>{joinGroupText}</p>
		</div>
	);
}