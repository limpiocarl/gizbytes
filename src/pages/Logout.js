import { useEffect, useContext } from "react";
import UserContext from "../UserContext";
import Swal from "sweetalert2";

const Logout = () => {
  const { unsetUser, setUser } = useContext(UserContext);

  unsetUser();

  useEffect(() => {
    setUser({ id: null });
  });

  return (
    <div>
      {Swal.fire({
        title: "Logout success",
        icon: "success",
        text: "You have logged out.",
      }).then((redirect) => {
        window.location = "/login";
      })}
    </div>
  );
};

export default Logout;
