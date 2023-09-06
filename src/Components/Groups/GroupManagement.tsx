import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { SetupDraft } from "../Profile/SetupDraft";
import { UsersInGroupTable } from "../Profile/UsersInGroupTable";
import { JoinGroupRequestsTable } from "../Profile/JoinGroupRequestsTable";

interface IGroupManagementProps {}

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
                        <JoinGroupRequestsTable />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <SetupDraft  />
                    </Col>
                </Row>
            </Container>
        </>
    );
}