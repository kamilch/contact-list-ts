import React, { memo, NamedExoticComponent, useEffect, useMemo } from "react";

import { useScrollListener } from "../hooks/use-scroll-listener";
import VirtualListItemType from "../types/VirtualListItemType";

type Props = {
    Item: NamedExoticComponent<VirtualListItemType>;
    itemCount: number;
    height: number;
    childHeight: number;
    overScanRowCount?: number;
    edgeScrollHandler?: (isNearEnd: boolean) => void;
}

const VirtualList = (props: Props) => {
    const {
        Item,
        itemCount,
        height,
        childHeight,
        overScanRowCount = 20,
        edgeScrollHandler
    } = props;

    const { scrollTop, ref } = useScrollListener();
    const totalHeight = itemCount * childHeight;

    let startNode = Math.floor((scrollTop as number) / childHeight) - overScanRowCount;
    startNode = Math.max(0, startNode);

    let visibleNodeCount = Math.ceil(height / childHeight) + 2 * overScanRowCount;
    visibleNodeCount = Math.min(itemCount - startNode, visibleNodeCount);

    const offsetY = startNode * childHeight;
    const isNearEnd = scrollTop > 0 && (totalHeight - (childHeight * 4) <= scrollTop);

    const visibleChildren = useMemo(() =>
        new Array(visibleNodeCount).fill(null).map((_, index) => (
            <Item
                key={index + startNode}
                index={index + startNode}
            />
        )),
        // eslint-disable-next-line
    [ startNode, visibleNodeCount, Item ]
    );

    useEffect(() => {
        if (edgeScrollHandler) {
            edgeScrollHandler(isNearEnd);
        }
    }, [ isNearEnd, edgeScrollHandler ]);

    return (
        <div
            ref={ref}
            style={{ height, overflow: "auto" }}
        >
            <div
                className="viewport"
                style={{
                    position: "relative",
                    overflow: "hidden",
                    willChange: "transform",
                    height: totalHeight
                }}
            >
                <div
                    style={{
                        willChange: "transform",
                        transform: `translateY(${offsetY}px)`
                    }}
                >
                    {visibleChildren}
                </div>
            </div>
        </div>
    );
};

export default memo(VirtualList);
