import React from "react";
import basketball from "../../images/BasketballLoading.gif";

console.log(basketball);

interface ILoadingProps {};

export const Loading: React.FunctionComponent<ILoadingProps> = (props: ILoadingProps) => {

    return (
        <img src={basketball} alt="Loading!" />
    );
}