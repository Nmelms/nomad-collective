"use client";
import { faPlus, faBars, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import useUserStore from "../useUserStore";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import Link from "next/link";

const BottomNav = () => {
  const { setShowOffcanvas, showOffcanvas } = useUserStore();
  const { user } = useUserStore();
  const router = useRouter();

  const handleAddClick = async (
    e: React.MouseEvent<SVGSVGElement>,
    cavnas: string
  ) => {
    if (cavnas === "add") {
      setShowOffcanvas(true);
    }
    // if (cavnas === "profile") {
    //   router.push("/profile");
    // }
  };
  return (
    <div className="container bottom-nav">
      <div className="row h-100 ">
        <div className="col-4 d-flex justify-content-center align-items-center">
          <FontAwesomeIcon
            onClick={(e) => handleAddClick(e, "add")}
            className="plus-icon btn-border"
            icon={faPlus}
          />
        </div>
        <div className="col-4 d-flex justify-content-center align-items-center">
          <a href="/profile">
            <FontAwesomeIcon
              onClick={(e) => handleAddClick(e, "menu")}
              className="plus-icon btn-border"
              icon={faBars}
            />
          </a>
        </div>
        <div className="col-4 d-flex justify-content-center align-items-center">
          <a href="/profile" className="plus-icon-link">
            <FontAwesomeIcon
              onClick={(e) => handleAddClick(e, "profile")}
              className="plus-icon btn-border"
              icon={faUser}
            />
          </a>
        </div>
      </div>
    </div>
  );
};

export default BottomNav;
