import { createContext, useState } from "react";

export const ModalContext = createContext();

export const ModalContextProvider = ({ children }) => {
  const [modalRegister, setModalRegister] = useState(false);
  const [modalLogin, setModalLogin] = useState(false);
  const [modalEditProfile, setModalEditProfile] = useState(false);
  const [userId, setUserId] = useState(false);

  const toggle = (name, id) => {
    console.log(name);
    if (name === "Login") {
      setModalLogin(!modalLogin);
    } else if (name === "Register") {
      setModalRegister(!modalRegister);
    } else if (name === "EditProfile") {
      setModalEditProfile(!modalEditProfile);
      setUserId(id);
    }
  };
  return (
    <ModalContext.Provider
      value={[modalLogin, modalRegister, modalEditProfile, userId, toggle]}
    >
      {children}
    </ModalContext.Provider>
  );
};
