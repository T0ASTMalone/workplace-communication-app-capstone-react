import React from "react";
import { Link } from "react-router-dom";
import "./LandingPage.css";
import invite from "../../img/svg/invite.svg";
import wp from "../../img/svg/workplace.svg";
import post from "../../img/svg/post.svg";
import idea from "../../img/svg/idea.svg";
import Footer from '../../components/Footer/Footer'


function useOnScreen(options) {
  const ref = React.useRef();
  
  const [visible, setVisible] = React.useState(false);

  React.useEffect(() => {

    const refCurCopy = ref.current;
    const observer = new IntersectionObserver(([entry]) => {
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


  return [ref, visible];
}

export default function LandingPage() {
  let [ref, visible] = useOnScreen({ threshold: 0.2 });
  let [ref2, visible2] = useOnScreen({ threshold: 0.2 });
  let [ref3, visible3] = useOnScreen({ threshold: 0.2 });
  let [ref4, visible4] = useOnScreen({ threshold: 0.2 });


  return (
    <div className="landing-page">
      <section ref={ref} className="landing-section">
        <div className={visible ? "active fade-inL" : " active undrawL"}>
          <img className="undraw-img" src={wp} alt="workplace" />
        </div>
        <div className="content card landing-info">
          <h1>WorkPlace</h1>

          <div id="existing-user" className="">
            <h3>Already part of WorkPlace</h3>
            <Link to={"/sign-in"} className="to-wp">
              <span className="to-wp">Sign In</span>
            </Link>
          </div>

          <div className="register">
            <h3> New to WorkPlace?</h3>
            <Link to={"/join"}>
              <span className="to-wp">Join a workplace</span>
            </Link>
            <p>or</p>
            <Link to={"/create"} className="to-wp">
              <span className="to-wp">Register</span>
            </Link>
          </div>
        </div>
      </section>

      <section ref={ref2}  id="register-section" className="landing-section">
        <div className={visible2 ? "active slide-inR" : "active undrawR"}>
          <img src={invite} alt="register" className="undraw-img" />
        </div>
        <div id="new-user" className="landing-info content card">
          <h3>Register</h3>
          <p className="landing-text">
            Register as a creator or member of a WorkPlace.
          </p>
          <p className="landing-text">
            When a WorkPlace is created a WorkPlace code will be generated.
          </p>

          {/* link to employer registration page */}
          <Link to={"/create"} className="to-wp">
            <span className="to-wp">Register</span>
          </Link>
          <p className="landing-text">
            As a new member you can use a WorkPlace code to join a WorkPlace.
          </p>
          {/* link to employee registration page */}
          <Link to={"/join"}>
            <span className="to-wp">Join a workplace</span>
          </Link>
        </div>
      </section>

      {
        // div describing creating events for your WorkPlace
      }

      <section ref={ref3} className="landing-section">
        <div className={visible3 ? "active slide-inL" : "active undrawL"}>
          <img src={post} alt="in the loop" className="undraw-img" />
        </div>

        <div className="landing-info card content">
          <h3 className="div-title">Keep everyone in the loop</h3>
          <p className="landing-text">
            As a member of a WorkPlace you can make posts that other members of
            your WorkPlace need to see.
          </p>
          {
            //screen shot of WorkPlace main feed
          }
        </div>
      </section>

      <section ref={ref4} id="register-section" className="landing-section">
        <div className={visible4 ? "active slide-inR" : "active undrawR"}>
          <img src={idea} alt="idea for the workplace" className="undraw-img" />
        </div>
        <div className="landing-info card content">
          <h3 className="div-title">Feedback</h3>
          <p className="landing-text">
            If you have ideas for improvement, safety concerns, or any other
            issues you might need to bring up, you can make a post under the
            ideas tab so that the creator of the WorkPlace may see your idea.
          </p>
          {
            //screen shot of ideas form / feed
          }
          <p className="landing-text">
            As the creator of the WorkPlace you can see these ideas posted by
            members of your WorkPlace.
          </p>
          <p className="landing-text">
            As a member of the WorkPlace you can see the ideas you have posted
            and if they have been seen by the creator of the WorkPlace
          </p>
        </div>
      </section>
      <Footer/>
    </div>
  );
}
