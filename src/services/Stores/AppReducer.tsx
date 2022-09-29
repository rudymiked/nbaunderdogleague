export interface IAppState {
    Name: string;
    Email: string;
    Token: string;
    GroupId: string;
}

export const AppInitialState = {
    Name: "",
    Email: "",
    Token: "",
    GroupId: "",
}

export enum AppActionEnum {
    LOGIN = "LOGIN",
    LOGOUT = "LOGOUT",
    UPDATE_TOKEN = "UPDATE_TOKEN",
    UPDATE_GROUP = "UPDATE_GROUP",
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
} | {
    type: AppActionEnum.UPDATE_GROUP,
    GroupId: string;
};;

export const AppReducer = (state: IAppState, action: AppActions): IAppState => {
    switch (action.type) {
        case AppActionEnum.LOGIN:
            return {...state, Name: action.Name, Email: action.Email, Token: action.Token};
        case AppActionEnum.UPDATE_TOKEN:
            return {...state, Token: action.Token};
        case AppActionEnum.UPDATE_GROUP:
            return {...state, GroupId: action.GroupId};
        default:
            return state;
    }
}