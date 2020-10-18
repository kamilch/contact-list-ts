import React from "react";

import "./Button.css";

type Props = {
    id: string;
    label: string;
    onClick: () => void;
}

export const Button = ({ id, label, onClick }: Props) => {
    return (
        <button id={id} className={"btn"} onClick={onClick}>
            {label}
        </button>
    );
};