import React from "react";
import { Button, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { Loading } from "./Loading";
import { AppActionEnum, LoginEnum } from "../../services/Stores/AppReducer";
import { FAILED_LOGIN } from "../../Utils/AppConstants";
import { RootContext } from "../../services/Stores/RootStore";
import { GetAuthInformation, LoginWithGoogle } from "../../services/data/GetRequests";

const givenName: string = "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/givenname";
const surname: string = "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/surname";

export interface IPleaseLoginProps {
    redirectPage?: string;
}

export const PleaseLogin: React.FunctionComponent<IPleaseLoginProps> = (props: IPleaseLoginProps) => {
	const [redirectPage, SetRedirectPage] = React.useState<string>("");
    const [authEmail, SetAuthEmail] = React.useState<string>("");
    const { state, dispatch } = React.useContext(RootContext);

    React.useEffect(() => {
        if (props.redirectPage && props.redirectPage !== "") {
            SetRedirectPage(props.redirectPage);
        } else {
            const page: string = window.location.href.split("/").at(-1);
            SetRedirectPage(page);
        }
    },[props]);

    React.useEffect(() => {
        getAuthInfo();
    },[]);

    const getAuthInfo = () => {
		GetAuthInformation().then((response: any) => {
			if (response?.data !== undefined) {
				const data = response.data[0];

				const provider_name = data.provider_name;
				console.log("logged in using: " + provider_name);

				let firstName: string = "";
				let lastName: string = "";

				for(const d of data?.user_claims) {
					if (d.typ === givenName) {
						firstName = d.val;
					}

					if (d.typ === surname) {
						lastName = d.val;
					}
				}

				const email = data?.user_id!;
				const token = data?.access_token!;

				if (email === "") {
					dispatch({
						type: AppActionEnum.LOGIN_FAIL,
						LoginStatus: LoginEnum.Fail,
					});
				} else {
					SetAuthEmail(email);
					if (firstName === "") {
						firstName = email;
					}

					dispatch({
						type: AppActionEnum.LOGIN,
						Name: firstName + " " + lastName,
						Email: email,
						Token: token,
						LoginStatus: LoginEnum.Success,
					});
				}
			}
		}).catch((reason: any) => {
			dispatch({
				type: AppActionEnum.LOGIN_FAIL,
				LoginStatus: LoginEnum.Fail,
			});
		});
	}
    
    return (
        <div>
            {state.AppStore.LoginStatus === LoginEnum.NotLoggedIn || state.AppStore.LoginStatus === LoginEnum.Fail ? (
                <div>
                    <div>
                        <Button
                            onClick={() => LoginWithGoogle(redirectPage)}
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