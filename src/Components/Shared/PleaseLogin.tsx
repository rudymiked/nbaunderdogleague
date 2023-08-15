import React from "react";
import { Button, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { Loading } from "./Loading";
import { LoginEnum } from "../../services/Stores/AppReducer";
import { FAILED_LOGIN } from "../../Utils/AppConstants";
import { RootContext } from "../../services/Stores/RootStore";

export interface IPleaseLoginProps {
    redirectPage?: string;
}

export const PleaseLogin: React.FunctionComponent<IPleaseLoginProps> = (props: IPleaseLoginProps) => {
    const [redirectPage, SetRedirectPage] = React.useState<string>();
    const { state, dispatch } = React.useContext(RootContext);
    
    const navigate = useNavigate();

    React.useEffect(() => {
        if (props.redirectPage && props.redirectPage !== "") {
            SetRedirectPage(props.redirectPage);
        } else {
            SetRedirectPage("/profile");
        }
    },[props]);
    
    return (
        <div>
            {state.AppStore.LoginStatus === LoginEnum.NotLoggedIn ? (
                <div>
                    <span>{"Please Login"}</span>
                    <br /><br />
                    <div>
                        <Button
                            href={redirectPage}
                            aria-controls="login-with-google">
                            {"Login with Google"}
                        </Button>
                        <br />
                        <br />
                        {/* <Button
                            href={"/.auth/login/facebook?post_login_redirect_uri=/home"}
                            aria-controls="login-with-facebook">
                            {"Login with Facebook"}
                        </Button> */}
                    </div>
                </div>
                ) : (
                    <div>
                        {state.AppStore.LoginStatus === LoginEnum.LoggingIn ? (
                        <Card style={{padding: '10px'}}>
                            <Card.Title className='card-title'>Please wait while we log you in...</Card.Title>
                            <Card.Body>
                                <Loading />
                            </Card.Body>
                        </Card>
                        ) : (
                            <div>
                                {state.AppStore.LoginStatus === LoginEnum.Fail ? (
                                    <span>{FAILED_LOGIN}</span>
                                ) : (
                                    <></> // successfully logged in.
                                )} 
                            </div>
                        )
                    }
                    </div>
                )
            }
        </div>
    );
}