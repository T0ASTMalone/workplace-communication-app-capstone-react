import React, { Component } from "react";

const WorkPlaceContext = React.createContext({
  userType: null,
  userName: "",
  workPlace: "",
  posts: [],
  addPost: () => {},
  setUserType: () => {},
  setUserName: () => {},
  setWo: () => {},
  setPosts: () => {}
});

export default WorkPlaceContext;

export class WorkPlaceProvider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userType: null,
      userName: "",
      workPlace: "",
      posts: [],
      error: null
    };
  }

  setUserType = userType => {
    this.setState({ userType });
  };

  setUserName = userName => {
    this.setState({ userName });
  };

  setWp = workPlace => {
    this.setState({ workPlace });
  };

  setPosts = posts => {
    this.setState({ posts });
  };

  render() {
    const value = {
      userType: this.state.userType,
      userName: this.state.userName,
      workPlace: this.state.workPlace,
      posts: this.state.posts,
      error: this.state.error,
      setUserType: this.setUserType,
      setWp: this.setWp,
      setPosts: this.setPosts,
      setUserName: this.setUserName
    };

    return (
      <WorkPlaceContext.Provider value={value}>
        {this.props.children}
      </WorkPlaceContext.Provider>
    );
  }
}
