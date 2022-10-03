import React from "react";
import { ColumnDescription } from "react-bootstrap-table-next";

export const sortCaretFunc = (order: any, column: ColumnDescription) => {
    var upArrow = '\u2191';
    var downArrow = '\u2193';
    if (!order) return ("");
    else if (order === 'asc') return (<span>{upArrow}</span>);
    else if (order === 'desc') return (<span>{downArrow}</span>);
    return null;
}