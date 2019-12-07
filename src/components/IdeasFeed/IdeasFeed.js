import React from "react";
import IdeasForm from "../Ideas/IdeasForm";
import WorkPlaceContext from "../../context/WorkPlaceContext";
import IdeasFrom from "../Ideas/IdeasForm";

export default class IdeasFeed extends React.Component {
  static contextType = WorkPlaceContext;
  render() {
    let { userType } = this.context;
    return (
      <div className="ideas-feed">
        {userType === "admin" ? (
          <>Hello, Ideas posted by employees will go here</>
        ) : (
          <IdeasFrom />
        )}
      </div>
    );
  }
}
