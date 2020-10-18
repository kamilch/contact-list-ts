import React from "react";

import { Button } from "../Button/Button";

import "./Buttons.css";

type Props = {
    loadData: () => void;
    error: string | null;
    loadMoreBtn: boolean;
};

export default (props: Props) => {
    const { loadData, error, loadMoreBtn } = props;

    return (
        <div className={"buttons-container"}>
            {error && (
                <Button
                    id={"reload-data-btn"}
                    onClick={loadData}
                    label={"Try to load again"}
                />
            )}
            {loadMoreBtn && !error && (
                <Button
                    id={"load-more-btn"}
                    onClick={loadData}
                    label={"Load more..."}
                />
            )}
        </div>
    )
}