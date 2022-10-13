import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { IGroupData } from "../../Pages/Profile";
import { SetupDraft } from "../Profile/SetupDraft";
import { UsersInGroupTable } from "../Profile/UsersInGroupTable";

interface IGroupManagementProps {
    ownedGroups: IGroupData[];
    dataLoaded: boolean;
}

const title: string = "Group Management";

export const GroupManagement: React.FunctionComponent<IGroupManagementProps> = (props: IGroupManagementProps) => {
    return (
        <>
            <h4>{title}</h4>
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