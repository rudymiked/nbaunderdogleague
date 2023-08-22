import React from "react";
import { Button, Card } from "react-bootstrap";
import { Loading } from "./Loading";
import { LoginEnum } from "../../services/Stores/AppReducer";
import { RootContext } from "../../services/Stores/RootStore";

const googleAuthLink: string = ".auth/login/google?post_login_redirect_uri=";

export interface IPleaseLoginProps {
    redirectPage?: string;
}

export const PleaseLogin: React.FunctionComponent<IPleaseLoginProps> = (props: IPleaseLoginProps) => {
	const [redirectPage, SetRedirectPage] = React.useState<string>("");
    const { state, dispatch } = React.useContext(RootContext);

    React.useEffect(() => {
        if (props.redirectPage && props.redirectPage !== "") {
            SetRedirectPage(props.redirectPage);
        } else {
            const page: string = window.location.href.split("/").at(-1);
            SetRedirectPage(page);
        }
    },[props]);
    
    return (
        <div>
            {state.AppStore.LoginStatus === LoginEnum.NotLoggedIn || state.AppStore.LoginStatus === LoginEnum.Fail ? (
                <div>
                    <div>
                        <p>Please Login to Continue</p>
                        <Button
                            href={googleAuthLink + redirectPage}
                            aria-controls="login-with-google"
                            variant={"light"}>
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
                                {/* {state.AppStore.LoginStatus === LoginEnum.Fail ? (
                                    <span>{FAILED_LOGIN}</span>
                                ) : (
                                    <></> // Successful Login
                                )
                                } */}
                            </div>
                        )
                    }
                    </div>
                )
            }
        </div>
    );
}