"use client";

import useUserStore from "../useUserStore";
import { useRouter } from "next/navigation";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen } from "@fortawesome/free-solid-svg-icons";

const ProfilePage = () => {
  const supabase = createClientComponentClient();
  const { setUser, user } = useUserStore();
  const router = useRouter();

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
    console.log(user, "after setting user to null");
    router.push("/");
  };

  return (
    <div className="profile-page d-flex flex-column align-items-center">
      <div className="profile-picture-wrapper mt-5">
        <img className="profile-picture" src="/no-image.webp" alt="" />
        <div className="edit-wrapper">
          <FontAwesomeIcon className="edit-icon" icon={faPen} />
        </div>
      </div>
      <Button onClick={handleSignOut}>Sign out</Button>
    </div>
  );
};

export default ProfilePage;
