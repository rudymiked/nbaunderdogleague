export interface IAppState {
    Name: string;
    Email: string;
    Token: string;
}

export const AppInitialState = {
    Name: "",
    Email: "",
    Token: "",
}

export enum AppActionEnum {
    LOGIN = "LOGIN",
    LOGOUT = "LOGOUT",
    UPDATE_TOKEN = "UPDATE_TOKEN"
}

export type AppActions = |
{
    type: AppActionEnum.LOGIN,
    Name: string,
    Email: string,
    Token: string
} | {
    type: AppActionEnum.UPDATE_TOKEN,
    Token: string;
};

export const AppReducer = (state: IAppState, action: AppActions): IAppState => {
    switch (action.type) {
        case AppActionEnum.LOGIN:
            return {...state, Name: action.Name, Email: action.Email, Token: action.Token};
        case AppActionEnum.UPDATE_TOKEN:
            return {...state, Token: action.Token};
        default:
            return state;
    }
}