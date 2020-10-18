import React from "react";
import PersonInfoType from "../../types/PersonInfoType";

import "./PersonInfo.css";

type Props = {
    data: PersonInfoType;
    cardClick?: () => void;
    isSelected?: boolean;
}

function PersonInfo(props: Props) {
    const {
        data,
        isSelected = false,
        cardClick = () => {},
    } = props;

    return (
        <div
            className={"person-info" + (isSelected ? " selected" : "")}
            onClick={cardClick}
        >
              <div className="name">
                  {data.firstNameLastName}
              </div>
              <div className="job-title">
                  {data.jobTitle}
              </div>
              <div className="email-address">
                  {data.emailAddress}
              </div>
        </div>
    );
}

export default PersonInfo;
