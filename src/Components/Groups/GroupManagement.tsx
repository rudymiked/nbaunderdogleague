import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { SetupDraft } from "../Profile/SetupDraft";
import { UsersInGroupTable } from "../Profile/UsersInGroupTable";
import { JoinGroupRequestsTable } from "../Profile/JoinGroupRequestsTable";

interface IGroupManagementProps {}

export const GroupManagement: React.FunctionComponent<IGroupManagementProps> = (props: IGroupManagementProps) => {
    const [refresh, SetRefresh] = React.useState<number>(0);
    
    return (
        <>
            <Container>
                <Row>
                    <Col>
                        <UsersInGroupTable refresh={refresh} />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <JoinGroupRequestsTable refresh={refresh} SetRefresh={SetRefresh} />
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