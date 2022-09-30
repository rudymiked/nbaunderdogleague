import React from "react";
import basketball from "../../images/BasketballLoading.gif";

interface ILoadingProps {};

export const Loading: React.FunctionComponent<ILoadingProps> = (props: ILoadingProps) => {

    return (
        <img src={basketball} alt="Loading!" />
    );
}