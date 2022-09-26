import React from 'react';

export const Error: React.FunctionComponent = () => {
	const somethingWentWrongText = "Something went wrong!";

	return (
		<div>
			<p>{somethingWentWrongText}</p>
		</div>
	);
}