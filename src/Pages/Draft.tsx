import React from 'react';
import { Card } from 'react-bootstrap';
import BootstrapTable, { ColumnDescription } from 'react-bootstrap-table-next';
import GetUserData from '../services/data/GetUserData';

interface IDraftPageProps {}

interface IUserData {
    email: string;
    team: string;
}

interface IUserDataResponse {
	data: [ IUserData ]
}
export const Draft: React.FunctionComponent = (props: IDraftPageProps) => {

    const [ users, SetUsers ] = React.useState<IUserData[]>([{ email: "", team: "" }]);
    
    React.useEffect(() => {
        GetUserData().then((response: IUserDataResponse) => {
            if (response?.data) {
                const userData: IUserData[] = response.data;
                SetUsers(userData);
            }
        }).catch((reason: any) => {
            console.error(reason);
        })
    },[])

    const columns: ColumnDescription[] = [
        {
            dataField: 'email',
            text: 'Email'
        },
        {
            dataField: 'team',
            text: 'Team'
        }
    ];

    return (
        <div className='PageBody'>
            <Card style={{padding: '10px'}}>
                <Card.Title>{"Draft"}</Card.Title>
                <Card.Body>
                    <BootstrapTable keyField='email' data={ users } columns={ columns } />
                </Card.Body>
            </Card>
        </div>
    );
}