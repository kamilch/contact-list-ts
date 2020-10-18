import React from "react";
import { shallow } from "enzyme";

import Buttons from "./Buttons";

describe("Buttons", () => {
    test("component has visible no btn", () => {
        const buttons = shallow(
            <Buttons
                error={null}
                loadMoreBtn={false}
                loadData={() => {}}
            />
        );

        expect(buttons.find('Button').length).toEqual(0);
    });

    test("component has visible only load more btn", () => {
        const buttons = shallow(
            <Buttons
                error={null}
                loadMoreBtn={true}
                loadData={() => {}}
            />
        );

        expect(buttons.find('Button').length).toEqual(1);
        expect(buttons.find('Button').props().id).toEqual("load-more-btn");
        expect(buttons.find('Button').props().label).toEqual("Load more...");
    });

    test("component has visible only reload data btn", () => {
        const buttons = shallow(
            <Buttons
                error={"error"}
                loadMoreBtn={true}
                loadData={() => {}}
            />
        );

        expect(buttons.find('Button').length).toEqual(1);
        expect(buttons.find('Button').props().id).toEqual("reload-data-btn");
        expect(buttons.find('Button').props().label).toEqual("Try to load again");
    });

});