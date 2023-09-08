import React from "react";
import { Button } from "react-bootstrap";
import { Loading } from "./Loading";
import { AppActionEnum, LoginEnum } from "../../services/Stores/AppReducer";
import { RootContext } from "../../services/Stores/RootStore";
import { GetAuthInformation } from "../../services/data/GetRequests";

const googleAuthLink: string = "/.auth/login/google?post_login_redirect_uri=/";
const givenName: string = "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/givenname";
const surname: string = "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/surname";

export interface IPleaseLoginProps {
    redirectPage?: string;
}

export const PleaseLogin: React.FunctionComponent<IPleaseLoginProps> = (props: IPleaseLoginProps) => {
    const [authEmail, SetAuthEmail] = React.useState<string>("");
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

    React.useEffect(() => {
        console.log("getAuthInfo");
        getAuthInfo();
    }, []);

    const getAuthInfo = () => {
        dispatch({
            type: AppActionEnum.LOGIN,
            LoginStatus: LoginEnum.LoggingIn,
        });

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
            console.log(reason);
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
                        <div>
                            <p>Please wait while we log you in...</p>
                            <Loading />
                        </div>
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