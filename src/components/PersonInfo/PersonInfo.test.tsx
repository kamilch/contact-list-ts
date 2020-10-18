import React from 'react';
import { shallow } from "enzyme";

import PersonInfo from "./PersonInfo";

const TEST_PERSON_DATA = {
    id: "1",
    firstNameLastName: "Full Name",
    emailAddress: "test@test.com",
    jobTitle: "job"
};

describe("PersonInfo", () => {
    test("component has three children", () => {
        const personInfo = shallow(
            <PersonInfo
                isSelected={false}
                data={TEST_PERSON_DATA}
            />
        );

        expect(personInfo.children().length).toEqual(3);
    });

    test("children render with proper values", () => {
        const personInfo = shallow(
            <PersonInfo
                isSelected={false}
                data={TEST_PERSON_DATA}
            />
        );

        expect(personInfo.find({ className: "name" }).text()).toEqual(TEST_PERSON_DATA.firstNameLastName);
        expect(personInfo.find({ className: "job-title" }).text()).toEqual(TEST_PERSON_DATA.jobTitle);
        expect(personInfo.find({ className: "email-address" }).text()).toEqual(TEST_PERSON_DATA.emailAddress);
    });

    test("component has selected class", () => {
        const personInfo = shallow(
            <PersonInfo
                isSelected={true}
                data={TEST_PERSON_DATA}
            />
        );

        expect(personInfo.hasClass("person-info selected")).toBeTruthy();
    });

    test("component select changed when clicked", () => {
        let isSelected = false;

        const personInfo = shallow(
            <PersonInfo
                isSelected={isSelected}
                data={TEST_PERSON_DATA}
                cardClick={() => {
                    isSelected = !isSelected;
                }}
            />
        );

        expect(personInfo.hasClass("person-info")).toBeTruthy();

        personInfo.simulate("click");
        personInfo.setProps({ "isSelected": isSelected });

        expect(personInfo.hasClass("person-info selected")).toBeTruthy();

        personInfo.simulate("click");
        personInfo.setProps({ "isSelected": isSelected });

        expect(personInfo.hasClass("person-info")).toBeTruthy();
    });
});