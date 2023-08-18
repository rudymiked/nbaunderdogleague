import React from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export const JoinOrSwitchGroupsButton: React.FC = () => { // React.FunctionComponent<Iprops> = (props: Iprops) => {
    const navigate = useNavigate();
    
    return (
        <div>
            <span>{"Don't see your group?"}</span>
            <br /><br />
            <Button
                onClick={() => navigate("/profile")}
                aria-controls="navigate-to-profile"
                variant="dark">
                {"Join or Switch Groups"}
            </Button>
        </div>
    );
}