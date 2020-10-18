import React, { memo } from "react";

import PersonInfo from "./PersonInfo/PersonInfo";
import PersonInfoType from "../types/PersonInfoType";
import VirtualList from "./VirtualList";
import VirtualListItemType from "../types/VirtualListItemType";
import { singleCardHeight } from "../common/constants";

type Props = {
    data: PersonInfoType[],
    selected: string[]
};

export default (props: Props) => {
    const { data, selected } = props;

    const SelectedItem = memo(({ index }: VirtualListItemType) => (
        <PersonInfo
            key={index}
            data={data[index]}
        />
    ));

    return (
        <div className="selected-items">
            {data.length > 0 && (
                <span>Selected contacts: {selected.length}</span>
            )}

            <div className={"list-bordered"}>
                {selected.length > 0 && (
                    <VirtualList
                        height={singleCardHeight}
                        childHeight={singleCardHeight}
                        itemCount={selected.length}
                        Item={SelectedItem}
                    />
                )}
            </div>
        </div>
    );
}