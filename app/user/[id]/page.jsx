"use client";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useEffect, useState } from "react";
import Image from "next/image";
import BackBtn from "../../components/BackBtn";

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
      <div className="user-profile d-flex flex-column align-items-center">
        <div className="profile-picture-wrapper mt-5">
          <BackBtn />
          <Image
            className="profile-picture"
            width={200}
            height={200}
            alt="Profile Image"
            src={`https://xlvjgjhetfrtaigrimtd.supabase.co/storage/v1/object/public/profile-pictures/${profileData.id}/profile`}
          />
        </div>
        <h2 className="mt-4">{profileData.display_name}</h2>
        <div className="stat-wrapper">
          <div className="stat-block d-flex flex-column align-items-center">
            <span className="stat-number">30</span>
            <span className="stat-title">Contributions</span>
          </div>
          <div className="stat-block d-flex flex-column align-items-center">
            <span className="stat-number">NC</span>
            <span className="stat-title">Location</span>
          </div>
        </div>
        <div className="bio-block">
          <p>{profileData.bio}</p>
        </div>
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
