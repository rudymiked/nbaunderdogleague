import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { IGroupData } from "../../Pages/Profile";
import { SetupDraft } from "../Profile/SetupDraft";
import { UsersInGroupTable } from "../Profile/UsersInGroupTable";

interface IGroupManagementProps {
    ownedGroups: IGroupData[];
    dataLoaded: boolean;
}

export const GroupManagement: React.FunctionComponent<IGroupManagementProps> = (props: IGroupManagementProps) => {
    return (
        <>
            <Container>
                <Row>
                    <Col>
                        <UsersInGroupTable />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <SetupDraft {...{
                            dataLoaded: props.dataLoaded,
                            ownedGroups: props.ownedGroups 
                        }} />
                    </Col>
                </Row>
            </Container>
        </>
    );
}