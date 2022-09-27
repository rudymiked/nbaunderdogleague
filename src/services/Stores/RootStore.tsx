// import * as React from "react";
// import { isBreakOrContinueStatement } from "typescript";


// interface IRootState {
//     AppStore: IAppState;
// }

// export type RootActions = | AppActions;

// const RootInitialState: IRootState = {
//     AppStore: AppInitialState;
// }

// const RootContext = React.createContext<{
//     state: IRootState;
//     dispatch: React.Dispatch<any>;
// }>({
//     state: RootInitialState,
//     dispatch: () => {},
// });

// const mainReducer = (rootState: IRootState, action: RootActions) => ({
//     AppStore: AppReducer(rootstate.AppStore, action as AppActions),
// });

// const RootProvider: React.FunctionComponent = ({ children }) => {
//     const [state, dispatch] = React.useReducer(mainReducer, RootInitialState);

//     return(
//         <RootContext.Provider value={{state, dispatch}}>
//             {children}
//         </RootContext.Provider>
//     )
// }

// export {RootContext, RootProvider}