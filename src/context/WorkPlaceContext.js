import React, { Component } from "react";

const WorkPlaceContext = React.createContext({
  userType: null,
  userName: "",
  userId: "",
  nickname: "",
  workPlace: "",
  wpId: "",
  posts: [],
  logged: null,
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
      logged: null,
      userName: "",
      nickname: "",
      userId: "",
      workPlace: "",
      wpId: "",
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
    console.log(id);
    this.setState({ wpId: id });
  };

  setPosts = posts => {
    this.setState({ posts });
  };

  setLogged = logged => {
    this.setState({ logged });
  };

  render() {
    const value = {
      userType: this.state.userType,
      userName: this.state.userName,
      userId: this.state.userId,
      nickname: this.state.nickname,
      workPlace: this.state.workPlace,
      wpId: this.state.wpId,
      logged: this.state.logged,
      posts: this.state.posts,
      error: this.state.error,
      setUserType: this.setUserType,
      setWp: this.setWp,
      setPosts: this.setPosts,
      setUserName: this.setUserName,
      setIdeas: this.setIdeas,
      setLogged: this.setLogged,
      setWpId: this.setWpId,
      setUserId: this.setUserId,
      setNickname: this.setNickname
    };

    return (
      <WorkPlaceContext.Provider value={value}>
        {this.props.children}
      </WorkPlaceContext.Provider>
    );
  }
}
