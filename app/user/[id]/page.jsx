"use client";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useEffect } from "react";

const supabase = createClientComponentClient();

const UserProfile = ({ params }) => {
  useEffect(() => {
    const fetchUserData = async () => {
      console.log(params.id);

      const {
        data: { users },
        error,
      } = await supabase.auth.admin.listUsers();

      if (error) {
        console.error("Error fetching user data:", error);
      } else {
        console.log("User data:", data, users);
      }
    };

    fetchUserData();
  }, []);

  // getUserById(params.id)
  //   .then((user) => {
  //     console.log(user, "this is the userdata");
  //     // Render the user profile component with the retrieved user data
  //     return <div className="user-profile">{params.id}</div>;
  //   })
  //   .catch((error) => {
  //     console.error("Error retrieving user:", error.message);
  //     // Handle the error and render an appropriate fallback UI
  //     return <div className="user-profile">Error: {error.message}</div>;
  //   });
};

export default UserProfile;
