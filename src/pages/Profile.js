import {
  Stack,
  Button,
  InputGroup,
  FormControl,
  Card,
  Image,
} from "react-bootstrap";
import { API, setAuthToken } from "../config/api";
import imageProfile from "../images/profile2.png";
import bm1 from "../images/bm-1.png";
import { useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/userContext";
import bookmarkIcon from "../images/Vector.png";

export default function Profile() {
  const { myId } = useParams();
  const [getJourney, setGetJourney] = useState();
  const [getProfile, setGetProfile] = useState();
  const [user, setUser] = useContext(UserContext);

  const myJourney = async () => {
    try {
      setAuthToken(localStorage.getItem("token"));
      const response = await API.get("my-journeys");
      setGetJourney(response.data.data.allprofile);
      setGetProfile(response.data.data.allprofile[0]);
      console.log(response.data.data.allprofile[0]);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    myJourney();
  }, []);

  return (
    <div
      className="container px-0 py-5"
      style={{ backgroundColor: "#ececec", height: "100vh" }}
    >
      <div className="container row mx-auto mb-4 fw-bold">
        <p className="" style={{ fontSize: "2.5rem" }}>
          My Profile
        </p>
      </div>
      <div className="">
        <div className="mx-auto mb-3 d-flex justify-content-center align-items-center">
          <Image src={imageProfile} />
        </div>
        <div className="mx-auto mb-5 d-flex-row text-center fs-2">
          {getProfile && getProfile.name}
          <p className="mt-1" style={{ fontSize: "1.2rem" }}>
            {getProfile && getProfile.email}
          </p>
        </div>
      </div>
      <div
        className="container row mx-auto d-flex justify-content-center aling-items-center"
        style={{ width: "77rem" }}
      >
        {getJourney &&
          getJourney.map((item, index) => (
            <div key={index} className="col-3 m-4 ">
              <Card
                style={{ width: "16.5rem", borderRadius: "0.5rem" }}
                className="shadow"
              >
                <Card.Img
                  variant="top"
                  src={`http://localhost:5000/uploads/${item.image}`}
                />
                <span
                  onClick=""
                  style={{
                    background: "white",
                    borderRadius: "0.1rem",
                    margin: "0.5rem",
                  }}
                  className="shadow position-absolute top-0 end-0 p-2"
                >
                  <img src={bookmarkIcon} alt="bm" />
                </span>
                <Card.Body>
                  <Card.Title className="text-truncate">
                    {item.title}
                  </Card.Title>
                  <p className="opacity-50" style={{ fontSize: "0.8rem" }}>
                    02-10-2020
                  </p>
                  <Card.Text className="text-truncate">
                    {item.description}
                  </Card.Text>
                </Card.Body>
              </Card>
            </div>
          ))}
      </div>
    </div>
  );
}
