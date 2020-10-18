import React from "react";
import { shallow } from "enzyme";

import { Button } from "./Button";

describe("Button", () => {
    test("component has proper values", () => {
        const props = {
            id: "id",
            label: "Label",
            onClick: () => {},
        };

        const button = shallow(<Button {...props} />);

        expect(button.prop("id")).toEqual(props.id);
        expect(button.text()).toEqual(props.label);
        expect(button.prop("onClick")).toEqual(props.onClick);
    });

    test("component triggered on click event", () => {
        let testValue = 5;
        const props = {
            id: "id",
            label: "Label",
            onClick: () => {
                testValue = 10;
            },
        };

        const button = shallow(<Button {...props} />);

        expect(testValue).toEqual(5);

        button.find('button').simulate('click');

        expect(testValue).toEqual(10);
    });
});