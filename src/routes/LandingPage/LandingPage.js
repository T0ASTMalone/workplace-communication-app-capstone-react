import React from "react";
import { Redirect } from "react-router-dom";
import "./LandingPage.css";
import invite from "../../img/svg/invite.svg";
import wp from "../../img/svg/workplace.svg";
import post from "../../img/svg/post.svg";
import idea from "../../img/svg/idea.svg";
import Footer from "../../components/Footer/Footer";
import WpInfo from "../../components/Wpinfo/WpInfo";
import WpScreenshot from "../../img/screenshots/workplace.png";

function useOnScreen(options) {
  // hook to observe when element enters the viewport
  const ref = React.useRef();

  const [visible, setVisible] = React.useState(false);

  React.useEffect(() => {
    const refCurCopy = ref.current;

    const observer = new IntersectionObserver(([entry]) => {
      // set to visible to true if element is in viewport
      setVisible(entry.isIntersecting);
    }, options);

    if (refCurCopy) {
      observer.observe(refCurCopy);
    }

    return () => {
      if (refCurCopy) {
        observer.unobserve(refCurCopy);
      }
    };
  }, [ref, options]);

  // return ref.current and whether it is visible
  return [ref, visible];
}

export default function LandingPage() {
  // redirect to join workplace
  const [toJoin, setToJoin] = React.useState(false);
  // redirect to create workplace
  const [toCreate, setToCreate] = React.useState(false);
  // redirect to sign in
  const [toSignIn, setToSignIn] = React.useState(false);

  // monitor if imgs are in the viewport
  let [ref, visible] = useOnScreen({ threshold: 0.2 });
  let [ref2, visible2] = useOnScreen({ threshold: 0.2 });
  let [ref3, visible3] = useOnScreen({ threshold: 0.2 });
  let [ref4, visible4] = useOnScreen({ threshold: 0.2 });

  const goToJoin = () => {
    setToJoin(true);
  };

  const goToCreate = () => {
    setToCreate(true);
  };

  const goToSignIn = () => {
    setToSignIn(true);
  };

  return (
    <div className="landing-page">
      {toJoin ? <Redirect to="/join" /> : null}
      {toCreate ? <Redirect to="/create" /> : null}
      {toSignIn ? <Redirect to="/sign-in" /> : null}

      <section ref={ref} className="landing-section">
        <div className={visible ? "active fade-inL" : " active undrawL"}>
          <img className="undraw-img" src={wp} alt="workplace" />
        </div>
        <div id="landing-info" className="content card landing-info">
          <h1 className="App-name"> WorkPlace</h1>

          <div id="existing-user" className="">
            <h3>Already part of a WorkPlace</h3>

            <button id="sign-in-button" onClick={goToSignIn} className="to-wp">
              Sign In
            </button>
          </div>

          <div className="register">
            <h3> New to WorkPlace?</h3>

            <button className="accept" onClick={goToJoin}>
              Join a Wp
            </button>
            <p>or</p>
            <button onClick={goToCreate} className="accept">
              Create a Wp
            </button>
          </div>
        </div>
      </section>

      <section ref={ref2} id="register-section" className="landing-section">
        <div className={visible2 ? "active slide-inR" : "active undrawR"}>
          <img src={invite} alt="register" className="undraw-img" />
        </div>
        <div id="new-user" className="landing-info content card">
          <h3>Register</h3>
          <p className="landing-text">
            When joining or creating a WorkPlace, new members will register
            using the name that other members of the WorkPlace page know you by
            and a username that will be used for signing in.
          </p>
          <p className="landing-text">
            When a WorkPlace is created a name must be given to the WorkPlace
            page. (i.e. A Company, Team or Project name) A WorkPlace code will
            be generated and new members can use this code to join your
            WorkPlace.
          </p>
          <div className="demo-wp-info">
            <p className="input-desc">Demo Wp Creator</p>
            <WpInfo
              nickname="Cris006"
              userName="Ramon Ponce"
              userType="creator"
              wpCode="Mmcrhjrm"
              workPlace="Tesla"
            />
          </div>
        </div>
      </section>

      <section ref={ref3} className="landing-section">
        <div className={visible3 ? "active slide-inL" : "active undrawL"}>
          <img src={post} alt="in the loop" className="undraw-img" />
        </div>

        <div id="in-the-loop" className="landing-info card content">
          <h3 className="div-title">Keep everyone in the loop</h3>
          <p className="landing-text">
            As a member you can make posts that other members of your WorkPlace
            need to see under the{" "}
            <img
              className="feed-icon-landing"
              src="https://img.icons8.com/material-outlined/24/000000/activity-feed.png"
              alt="feed-icon"
            />{" "}
            posts tab
          </p>
        </div>
      </section>

      <section ref={ref4} id="register-section" className="landing-section">
        <div className={visible4 ? "active slide-inR" : "active undrawR"}>
          <img src={idea} alt="idea for the workplace" className="undraw-img" />
        </div>
        <div className="landing-info card content">
          <h3 className="div-title">Ideas</h3>
          <p className="landing-text">
            If you have ideas for improvement, safety concerns, or any other
            issues you might need to bring up, you can make a post under the{" "}
            <img
              className="feed-icon-landing"
              src="https://img.icons8.com/material-outlined/24/000000/idea.png"
              alt="feed-icon"
            />{" "}
            ideas tab so that the creator of the WorkPlace may see your idea.
          </p>
          <p className="landing-text">
            As the creator of the WorkPlace you can see the ideas posted by
            members of your WorkPlace. As a member of the WorkPlace you can see
            the ideas you have posted and if they have been seen by the creator
            of the WorkPlace
          </p>
        </div>
      </section>

      <section id="demo" className="landing-section">
        <div className=" demo-screenshot">
          <img
            src={WpScreenshot}
            alt="wp-page"
            className="wp-screenshot card"
          />
        </div>
        <div className="landing-info content">
          <h3 className="demo-title">Try Out WorkPlace</h3>
          <a href={`/sign-in?u=Cris&p=Thisis@testpassword!2`}>
            <div className="demo-account card">
              <h4 className="div-title">Demo Creator</h4>

              <ul className="demo-user">
                <li className="demo-info">
                  <span className="bold">Username:</span> Cris
                </li>
                <li className="demo-info">
                  <span className="bold">Password:</span> Thisis@testpassword!2
                </li>
              </ul>
            </div>
          </a>
          <a href={`/sign-in?u=map&p=Thisis@testpassword!2`}>
            <div className="demo-account card">
              <h4>Demo Member</h4>
              <ul className="demo-user">
                <li className="demo-info">
                  <span className="bold">Username:</span> map
                </li>
                <li className="demo-info">
                  <span className="bold">Password:</span> Thisis@testpassword!2
                </li>
              </ul>
            </div>
          </a>
        </div>
      </section>
      <Footer />
    </div>
  );
}
