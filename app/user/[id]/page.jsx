"use client";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useEffect, useState } from "react";
import Image from "next/image";

const supabase = createClientComponentClient();

const UserProfile = ({ params }) => {
  const [profileData, setProfileData] = useState(null);
  useEffect(() => {
    const fetchUserData = async () => {
      console.log(params.id);
      const { data, error } = await supabase
        .from("users")
        .select("*")
        .eq("display_name", params.id)
        .single();

      if (error) {
        console.error("Error fetching user data:", error);
      } else {
        setProfileData(data);
      }
    };

    fetchUserData();
  }, []);
  if (profileData) {
    return (
      <div className="user-profile">
        <Image
          width={200}
          height={200}
          alt={"profile image"}
          src={`https://xlvjgjhetfrtaigrimtd.supabase.co/storage/v1/object/public/profile-pictures/${profileData.id}/profile`}
        />
        <p>{profileData.display_name}</p>
      </div>
    );
  } else {
    return (
      <div className="user-profile">
        <p>Loading......</p>
      </div>
    );
  }
};

export default UserProfile;
