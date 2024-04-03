"use client";
import useUserStore from "../useUserStore";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import Accordion from "react-bootstrap/Accordion";
import { Form } from "react-bootstrap";

const ProfilePage = () => {
  const supabase = createClientComponentClient();
  const [isEditable, setIsEditable] = useState(true);
  const { setUser, user } = useUserStore();
  // console.log(user.user_metadata.userName, "user in profile");

  const [localUser, setLocalUser] = useState(null);
  const [userName, setUserName] = useState(null);
  const router = useRouter();
  // const userId = localStorage.getItem("userId");
  const checkUser = async () => {
    console.log("check user ran");
    const res = await supabase.auth.getUser();
    if (res.data.user) {
      setLocalUser(res.data.user);
      setUserName(res.data.user.user_metadata.userName);
    }
  };
  useEffect(() => {
    checkUser();
  }, []);

  async function uploadImage(file) {
    try {
      const res = await supabase.storage
        .from("profile-pictures")
        .upload(`${localUser.id}/${file.name}`, file, {
          cacheControl: "3600",
          upsert: false,
        });
      if (res) {
        const { data, error } = await supabase.auth.updateUser({
          data: {
            profilePic: res.data.path,
          },
        });
        checkUser();
      }
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  }

  const handleSave = async (userId) => {
    try {
      const { data, error } = await supabase.auth.updateUser({
        data: {
          // Include other metadata properties here
          userName: userName,
        },
      });

      if (error) {
        console.error("Error updating user metadata:", error.message);
      } else {
        console.log("User metadata updated successfully:", data.user);
        setUser(data.user);
        checkUser();
      }
    } catch (error) {
      console.error("Error updating user metadata:", error.message);
    }
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setLocalUser(null);
    router.push("/");
  };

  if (localUser) {
    return (
      <div className="profile-page d-flex flex-column align-items-center">
        <div className="profile-picture-wrapper mt-5">
          <img
            className="profile-picture"
            src={
              localUser.user_metadata.profilePic
                ? `https://xlvjgjhetfrtaigrimtd.supabase.co/storage/v1/object/public/profile-pictures/${localUser.user_metadata.profilePic}`
                : "/no-image.webp"
            }
            alt=""
          />
        </div>
        <h2>{localUser.user_metadata.userName}</h2>
        <Accordion className="w-100 px-3" defaultActiveKey="0">
          <Accordion.Item eventKey="0">
            <Accordion.Header> Account Info</Accordion.Header>
            <Accordion.Body className="d-flex flex-column">
              <FontAwesomeIcon
                onClick={() => setIsEditable(!isEditable)}
                className="edit-icon"
                icon={faPen}
              />
              <Form>
                <Form.Group className="mb-3" controlId="email">
                  <Form.Control
                    // onChange={(e) => setEmail(e.target.value)}
                    readOnly
                    plaintext
                    type="email"
                    value={`${localUser.user_metadata.email}`}
                    placeholder="Email"
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="email">
                  <Form.Control
                    type="text"
                    readOnly={isEditable}
                    plaintext={isEditable}
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    placeholder="Email"
                  />
                </Form.Group>
                <Form.Group controlId="formImageUpload">
                  <Form.Label>Upload Image</Form.Label>
                  <Form.Control
                    onChange={(e) => uploadImage(e.target.files[0])}
                    type="file"
                    accept="image/*"
                  />
                </Form.Group>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlTextarea1"
                >
                  <Form.Label>Bio</Form.Label>
                  <Form.Control as="textarea" rows={3} />
                </Form.Group>
                <Button onClick={() => handleSave(localUser.id)}>Save</Button>
              </Form>
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>

        <Button onClick={() => handleSignOut()}>Sign out</Button>
      </div>
    );
  }
};

export default ProfilePage;
