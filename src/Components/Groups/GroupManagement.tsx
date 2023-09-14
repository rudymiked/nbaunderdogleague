import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { SetupDraft } from "../Profile/SetupDraft";
import { UsersInGroupTable } from "../Profile/UsersInGroupTable";
import { JoinGroupRequestsTable } from "../Profile/JoinGroupRequestsTable";
import { YourGroups } from "../Profile/YourGroups";

interface IGroupManagementProps {}

export const GroupManagement: React.FunctionComponent<IGroupManagementProps> = (props: IGroupManagementProps) => {
    const [refresh, SetRefresh] = React.useState<number>(0);

    return (
        <Container style={{maxWidth:"100vw"}}>
            <Row style={{padding: '5px'}} className="justify-content-md-center">
                <Col style={{padding: '5px'}} md="auto">
                    <YourGroups 
                        refresh={refresh} 
                        SetRefresh={SetRefresh}
                    />
                </Col>
            </Row>
            <Row style={{padding: '5px'}} className="justify-content-md-center">
                <Col style={{padding: '5px'}} md="auto">
                    <UsersInGroupTable refresh={refresh} />
                </Col>
            </Row>
            <Row style={{padding: '5px'}} className="justify-content-md-center">
                <Col style={{padding: '5px'}} md="auto">
                    <JoinGroupRequestsTable refresh={refresh} SetRefresh={SetRefresh} />
                </Col>
            </Row>
            <Row style={{padding: '5px'}} className="justify-content-md-center">
                <Col style={{padding: '5px'}} md="auto">
                    <SetupDraft refresh={refresh} />
                </Col>
            </Row>
        </Container>
    );
}