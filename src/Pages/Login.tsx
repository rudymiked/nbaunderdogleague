import React from 'react';

interface ILoginPageProps {}

export const Login: React.FunctionComponent = (props: ILoginPageProps) => {
	return (
		<>
			<a href="/.auth/login/facebook">Facebook Login</a>
			<a href="/.auth/login/google">Google Login</a>
		</>
	);
}