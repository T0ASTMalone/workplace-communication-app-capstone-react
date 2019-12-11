import React, { Component } from "react";

const WorkPlaceContext = React.createContext({
  userType: null,
  userName: "",
  workPlace: "",
  posts: [],
  logged: null,
  addPost: () => {},
  setUserType: () => {},
  setUserName: () => {},
  setWp: () => {},
  setPosts: () => {},
  setIdeas: () => {}
});

export default WorkPlaceContext;

export class WorkPlaceProvider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userType: null,
      logged: null,
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
    console.log(posts);
    this.setState({ posts });
  };

  setLogged = logged => {
    this.setState({ logged });
  };

  render() {
    const value = {
      userType: this.state.userType,
      userName: this.state.userName,
      workPlace: this.state.workPlace,
      logged: this.state.logged,
      posts: this.state.posts,
      error: this.state.error,
      setUserType: this.setUserType,
      setWp: this.setWp,
      setPosts: this.setPosts,
      setUserName: this.setUserName,
      setIdeas: this.setIdeas,
      setLogged: this.setLogged
    };

    return (
      <WorkPlaceContext.Provider value={value}>
        {this.props.children}
      </WorkPlaceContext.Provider>
    );
  }
}
