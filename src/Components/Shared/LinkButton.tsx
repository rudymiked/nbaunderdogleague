import React from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export interface ILinkButtonProps {
    url: string;
    text: string;
}

export const LinkButton: React.FC<ILinkButtonProps> = (props: ILinkButtonProps) => {
    const navigate = useNavigate();
    
    return (
            <Button
                onClick={() => navigate(props.url)}
                aria-controls={"navigate-to-" + props.text}
                variant="dark">
                {props.text}
            </Button>
    );
}