import React, { useState, useContext } from "react";
import PendingMember from "../PendingMember/PendingMember";
import "./NewMembers.css";
import WpService from "../../Services/wp-api-service";
import WorkPlaceContext from "../../context/WorkPlaceContext";

export default function NewMembers() {
  // pending users
  let [penUsers, setPenUsers] = useState([]);

  // err
  let [err, setErr] = useState(null);

  // show pending users
  let [show, setShow] = useState(false);

  let context = useContext(WorkPlaceContext);

  const handleAccept = id => {
    // PATCH user type from 'pending' to 'member'
    WpService.acceptPendingUser(id)
      .then(res => {
        if (res) {
          const remainingUsers = penUsers.filter(user => user.user_id !== id);
          // update pending users in state
          setPenUsers(remainingUsers);
        }
      })
      .catch(err => setErr(err));
    setShow(!show);
  };

  const handleShowPenUsers = () => {
    //fetch pending users
    WpService.getUsers(context.wpId, "pending").then(users => {
      // toggle pending users
      if (penUsers < 1) {
        setErr("There are no pending users");
      }
      if (penUsers.length > 1) {
        setPenUsers([]);
      } else {
        setPenUsers(users);
      }
    });
    // show pending users
    setShow(!show);
  };

  const handleDecline = id => {
    // PATCH user type from 'pending' to 'member'
    WpService.declinePendingUser(id)
      .then(res => {
        if (res) {
          const remainingUsers = penUsers.filter(user => user.user_id !== id);
          // update pending users in state
          setPenUsers(remainingUsers);
        }
      })
      .catch(err => setErr(err));

    setShow(!show);
  };

  return (
    <div
      className={
        show && (penUsers.length >= 1 || err)
          ? "pending-members show-members"
          : "pending-members"
      }
    >
      <button className="pen-title" onClick={handleShowPenUsers}>
        Pending Members
      </button>
      {penUsers.length >= 1 ? (
        penUsers.map((user, i) => (
          <PendingMember
            key={i}
            member={user}
            accept={handleAccept}
            decline={handleDecline}
          />
        ))
      ) : (
        <>
          <p className="error">{err}</p>
        </>
      )}
    </div>
  );
}
