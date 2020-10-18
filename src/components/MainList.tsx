import React, { memo } from "react";

import { singleCardHeight } from "../common/constants";
import VirtualList from "./VirtualList";
import VirtualListItemType from "../types/VirtualListItemType";
import PersonInfo from "./PersonInfo/PersonInfo";
import PersonInfoType from "../types/PersonInfoType";

type Props = {
    data: PersonInfoType[];
    selected: string[],
    handleCardClick: (card: PersonInfoType) => void;
    handleEdgeScroll: (isNearEnd: boolean) => void
};

export default (props: Props) => {
    const { data, selected, handleCardClick, handleEdgeScroll } = props;

    const Item = memo(({ index }: VirtualListItemType) => {
        let card = data[index];
        let isSelected = selected.indexOf(card.id) > -1;

        return (
            <PersonInfo
                key={index}
                data={card}
                cardClick={() => handleCardClick(card)}
                isSelected={isSelected}
            />
        );
    });

    return (
        <VirtualList
            height={window.innerHeight - (singleCardHeight * 2)}
            childHeight={singleCardHeight}
            itemCount={data.length}
            Item={Item}
            edgeScrollHandler={handleEdgeScroll}
        />
    );
}