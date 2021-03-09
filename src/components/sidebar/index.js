import React from "react";

import useUser from "../../hooks/use-user";

// Acceptance Criteria
//   - Destructure out the values from 'user'
//   - The values we want are docId, userId, following, username, fullName
//   - Make sure we see the values by using console.log (these can be removed once verified)

export default function Sidebar() {
  const {
    user: { docId, userId, following, username, fullName } = {},
  } = useUser();

  return (
    <div>
      <h1>Sidebar</h1>
    </div>
  );
}
