"use client";
const UserProfile = ({ params }) => {
  console.log(params);
  return <div className="user-profile">{params.id}</div>;
};

export default UserProfile;
