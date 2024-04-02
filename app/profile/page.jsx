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
  const [userName, setUserName] = useState(user.user_metadata.userName);
  const router = useRouter();
  useEffect(() => {
    if (!user) {
      router.push("/login");
    }
  }, []);

  console.log(user);

  const handleSave = async (userId) => {
    console.log(userId);
    try {
      const { data, error } = await supabase.auth.updateUser({
        data: {
          userName: userName,
          // Include other metadata properties here
        },
      });

      if (error) {
        console.error("Error updating user metadata:", error.message);
      } else {
        console.log("User metadata updated successfully:", data.user);
        setUser(data.user);
      }
    } catch (error) {
      console.error("Error updating user metadata:", error.message);
    }
  };

  useEffect(() => {
    console.log(user, "this is the new user");
  }, [user]);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
    router.push("/");
  };

  if (user) {
    return (
      <div className="profile-page d-flex flex-column align-items-center">
        <div className="profile-picture-wrapper mt-5">
          <img className="profile-picture" src="/no-image.webp" alt="" />
        </div>
        <h2>{user.user_metadata.userName}</h2>
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
                    value={`${user.user_metadata.email}`}
                    placeholder="Email"
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="email">
                  <Form.Control
                    // onChange={(e) => setEmail(e.target.value)}
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
                  <Form.Control type="file" accept="image/*" />
                </Form.Group>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlTextarea1"
                >
                  <Form.Label>Bio</Form.Label>
                  <Form.Control as="textarea" rows={3} />
                </Form.Group>
                <Button onClick={() => handleSave(user.id)}>Save</Button>
              </Form>
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>

        <Button onClick={() => handleSignOut}>Sign out</Button>
      </div>
    );
  }
};

export default ProfilePage;
