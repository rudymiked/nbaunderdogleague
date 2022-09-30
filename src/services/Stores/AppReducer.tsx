export enum LoginEnum {
    Success,
    Fail,
    Unknown
}
export interface IAppState {
    Name: string;
    Email: string;
    Token: string;
    GroupId: string;
    LoginStatus: LoginEnum;
}

export const AppInitialState = {
    Name: "",
    Email: "",
    Token: "",
    GroupId: "",
    LoginStatus: LoginEnum.Unknown,
}

export enum AppActionEnum {
    LOGIN = "LOGIN",
    LOGIN_FAIL = "LOGIN_FAIL",
    LOGOUT = "LOGOUT",
    UPDATE_TOKEN = "UPDATE_TOKEN",
    UPDATE_GROUP = "UPDATE_GROUP",
}

export type AppActions = |
{
    type: AppActionEnum.LOGIN,
    Name: string,
    Email: string,
    Token: string,
    LoginStatus: LoginEnum,
} | {
    type: AppActionEnum.UPDATE_TOKEN,
    Token: string,
} | {
    type: AppActionEnum.UPDATE_GROUP,
    GroupId: string,
} | {
    type: AppActionEnum.LOGIN_FAIL,
    LoginStatus: LoginEnum,
};

export const AppReducer = (state: IAppState, action: AppActions): IAppState => {
    switch (action.type) {
        case AppActionEnum.LOGIN:
            return {...state, Name: action.Name, Email: action.Email, Token: action.Token, LoginStatus: action.LoginStatus};
        case AppActionEnum.UPDATE_TOKEN:
            return {...state, Token: action.Token};
        case AppActionEnum.UPDATE_GROUP:
            return {...state, GroupId: action.GroupId};
        case AppActionEnum.LOGIN_FAIL:
            return {...state, LoginStatus: action.LoginStatus};
        default:
            return state;
    }
}