import React, { useState } from "react";
import testUsers from "../../test-users";
import PendingMember from "../PendingMember/PendingMember";
import "./NewMembers.css";

export default function NewMembers() {
  // pending users
  let [penUsers, setPenUsers] = useState([]);

  // err
  let [err, setErr] = useState("");

  // show pending users
  let [show, setShow] = useState(false);

  const handleAccept = name => {
    // PATCH user type from 'pending' to 'member'
    // update pending users in state
  };

  const handleShowPenUsers = () => {
    //fetch pending users
    let users = testUsers.filter(user => user.user_type === "pending");
    // toggle pending users
    if (users.length < 1) {
      setErr(`There are no pending users`);
    }
    if (penUsers.length > 1) {
      setPenUsers([]);
    } else {
      setPenUsers(users);
    }
    // show pending users
    setShow(!show);
  };

  const handleDecline = name => {
    // delete users
    // update users
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
      <p className="err">{err}</p>
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
        <></>
      )}
    </div>
  );
}
