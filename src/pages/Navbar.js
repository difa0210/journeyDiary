import {
  Stack,
  Button,
  InputGroup,
  FormControl,
  Card,
  Dropdown,
  Image,
} from "react-bootstrap";
import { API } from "../config/api";
import imagePage from "../images/bg-home.png";
import imageLogo from "../images/logo-journey.png";
import icon1 from "../images/icon1.png";
import icon2 from "../images/icon2.png";
import icon3 from "../images/icon3.png";
import icon4 from "../images/icon4.png";
import profile from "../images/profile.png";

export default function Navbar() {
  return (
    <div className="container p-0">
      <div className="jumbotron p-5 mb-4 text-start" style={{ height: "45vh" }}>
        <div className="row mb-5">
          <div className="col">
            <img src={imageLogo} alt="logoJourney" srcset="" />
          </div>
          <div className="col d-flex justify-content-end align-items-center">
            <Button
              className="fw-bold mx-3 btn-white"
              variant=""
              type="submit"
              size="sm"
            >
              login
            </Button>
            <Button
              className="fw-bold btn-blue"
              variant=""
              type="submit"
              size="sm"
            >
              Register
            </Button>
          </div>
        </div>
        <p className="mb-0 fw-bold text-white" style={{ fontSize: "3.5rem" }}>
          The Journey
        </p>
        <p className="fw-bold text-white" style={{ fontSize: "3.5rem" }}>
          you ever dreamed of.
        </p>
        <p className="mb-0 text-white" style={{ fontSize: "1.5rem" }}>
          We made a tool so you can easily keep & share your travel memories.
        </p>
        <p className=" text-white" style={{ fontSize: "1.5rem" }}>
          But there is a lot more
        </p>
      </div>
      <div className="text-start shadow-lg px-5 py-2">
        <div className="row d-flex align-items-center">
          <div className="col">
            <img src={imageLogo} alt="logoJourney" srcset="" />
          </div>
          <div className="col d-flex justify-content-end align-items-center">
            <InputGroup className="d-flex justify-content-end align-items-center">
              <Dropdown>
                <Dropdown.Toggle>
                  <Image src={profile} />
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item
                    style={{ color: "#BD0707" }}
                    href=""
                    className="mb-3 fw-bold"
                  >
                    <Image src={icon3} className="mx-3" />
                    Profile
                  </Dropdown.Item>

                  <Dropdown.Item
                    style={{ color: "#BD0707" }}
                    href=""
                    className="mb-3 fw-bold"
                  >
                    <Image src={icon2} className="mx-3" />
                    New Journey
                  </Dropdown.Item>

                  <Dropdown.Item
                    style={{ color: "#BD0707" }}
                    href=""
                    className="mb-3 fw-bold"
                  >
                    <Image src={icon1} className="mx-3" />
                    Bookmark
                  </Dropdown.Item>
                  <hr />
                  <Dropdown.Item
                    style={{ color: "#BD0707" }}
                    href=""
                    className="fw-bold"
                  >
                    <Image src={icon4} className="me-3" />
                    Logout
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </InputGroup>
          </div>
        </div>
      </div>
    </div>
  );
}
