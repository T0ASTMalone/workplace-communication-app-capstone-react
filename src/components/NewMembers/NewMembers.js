import React, { useEffect, useState } from "react";
import testUsers from "../../test-users";
import PendingMember from "../PendingMember/PendingMember";
import "./NewMembers.css";

export default function NewMembers() {
  let [penUsers, setPenUsers] = useState([]);

  let [show, setShow] = useState(false);

  useEffect(() => {
    let users = testUsers.filter(user => user.user_type === "pending");
    setPenUsers(users);
  }, []);

  const handleAccept = name => {
    const remainingUsers = penUsers.filter(user => user.user_alias !== name);
    setPenUsers(remainingUsers);
  };

  const handleShowPenUsers = () => {
    setShow(!show);
  };

  return penUsers.length >= 1 ? (
    <div className={show ? "pending-members show-members" : "pending-members"}>
      <a className="pen-title" onClick={handleShowPenUsers}>
        Pending Members
      </a>
      {penUsers.map((user, i) => (
        <PendingMember key={i} member={user} accept={handleAccept} />
      ))}
    </div>
  ) : (
    <></>
  );
}
