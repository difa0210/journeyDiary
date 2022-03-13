import { useContext, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { API } from "../config/api";
import { ModalContext } from "../context/ModalContext";

export default function ModalLogin() {
  const [isOpen, , , , toggle] = useContext(ModalContext);

  const [message, setMessage] = useState(null);
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const { email, password } = form;
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();

      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      const body = JSON.stringify(form);

      const response = await API.post("/login", body, config);
      window.location.reload();
      localStorage.setItem("token", response.data.token);
      console.log(response);
    } catch (error) {
      setMessage(error.response);
    }
  };

  return (
    <Modal className="" show={isOpen} onHide={() => toggle("Login")} centered>
      <Modal.Body>
        {message && <div>{message}</div>}
        <Form
          onSubmit={handleSubmit}
          className="p-5"
          style={{
            color: "#0e67ec",
          }}
        >
          <Form.Label className="fs-2 fw-bold mb-5">Login</Form.Label>
          <Form.Group
            className="mb-4"
            controlId="formBasicEmail"
            style={{
              borderRadius: "0.3rem",
            }}
          >
            <Form.Control
              className="shadow"
              style={{
                borderWidth: 2,
                background: "#e2e2e2",
                height: "3rem",
              }}
              type="email"
              value={email}
              name="email"
              onChange={handleChange}
              placeholder="Email"
            />
          </Form.Group>

          <Form.Group
            className="mb-5"
            controlId="formBasicPassword"
            style={{
              borderRadius: "0.3rem",
            }}
          >
            <Form.Control
              className="shadow"
              style={{
                borderWidth: 2,
                background: "#e2e2e2",
                height: "3rem",
              }}
              type="password"
              value={password}
              name="password"
              onChange={handleChange}
              placeholder="Password"
            />
          </Form.Group>
          <Button
            className="container mb-3 btn-blue fw-bold fs-5"
            variant=""
            type="submit"
            style={{
              borderRadius: "0.3rem",
            }}
          >
            Login
          </Button>
          <p className="text-black text-center">
            Don't have an account ? Klik{" "}
            <span>
              <label
                style={{ cursor: "pointer" }}
                className="text-decoration-none fw-bold text-black"
                onClick={() => {
                  toggle("Login");
                  toggle("Register");
                }}
              >
                Here
              </label>
            </span>
          </p>
        </Form>
      </Modal.Body>
    </Modal>
  );
}
