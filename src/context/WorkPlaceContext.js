import React, { Component } from "react";

const WorkPlaceContext = React.createContext({
  userType: null,
  userName: "",
  userId: "",
  nickname: "",
  workPlace: "",
  wpId: "",
  posts: [],
  ideas: [],
  wpCode: null,
  addPost: () => {},
  setUserType: () => {},
  setUserName: () => {},
  setWp: () => {},
  setPosts: () => {},
  setIdeas: () => {},
  setWpId: () => {}
});

export default WorkPlaceContext;

export class WorkPlaceProvider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userType: null,
      wpCode: null,
      userName: "",
      nickname: "",
      userId: "",
      workPlace: "",
      wpId: "",
      posts: [],
      ideas: [],
      error: null
    };
  }

  setUserType = userType => {
    this.setState({ userType });
  };

  setUserName = userName => {
    this.setState({ userName });
  };
  setNickname = nickname => {
    this.setState({ nickname });
  };

  setUserId = id => {
    this.setState({ userId: id });
  };

  setWp = workPlace => {
    this.setState({ workPlace });
  };

  setWpId = id => {
    this.setState({ wpId: id });
  };

  setPosts = posts => {
    this.setState({ posts });
  };

  setIdeas = ideas => {
    this.setState({ ideas });
  };

  setCode = wpCode => {
    this.setState({ wpCode });
  };

  render() {
    const value = {
      userType: this.state.userType,
      userName: this.state.userName,
      userId: this.state.userId,
      nickname: this.state.nickname,
      workPlace: this.state.workPlace,
      wpId: this.state.wpId,
      wpCode: this.state.wpCode,
      posts: this.state.posts,
      ideas: this.state.ideas,
      error: this.state.error,
      setUserType: this.setUserType,
      setWp: this.setWp,
      setPosts: this.setPosts,
      setUserName: this.setUserName,
      setCode: this.setCode,
      setWpId: this.setWpId,
      setUserId: this.setUserId,
      setNickname: this.setNickname,
      setIdeas: this.setIdeas
    };

    return (
      <WorkPlaceContext.Provider value={value}>
        {this.props.children}
      </WorkPlaceContext.Provider>
    );
  }
}
