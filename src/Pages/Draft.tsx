import React from 'react';
import { Card } from 'react-bootstrap';
import GetUserData from '../services/data/GetUserData';

interface IDraftPageProps {}

interface IUserInfo {
    email: string;
    team: string;
}
export const Draft: React.FunctionComponent = (props: IDraftPageProps) => {

    const [ users, SetUsers ] = React.useState<IUserInfo[]>([{email: "", team: ""}]);

    React.useEffect(() => {
        GetUserData().then((response: any) => {
            if (response?.data) {
                const userData: IUserInfo[] = response.data;

                SetUsers(userData);
            }
        }).catch((reason: any) => {
            console.log(reason);
        })
    },[])

    return (
        <div className='PageBody'>
            <Card style={{padding: '10px'}}>
                <Card.Title>{"Draft"}</Card.Title>
                <Card.Body>
                    {users[0].team} {users[0].email}
                </Card.Body>
            </Card>
        </div>
    );
}