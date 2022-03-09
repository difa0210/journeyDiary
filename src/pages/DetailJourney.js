import {
  Stack,
  Button,
  InputGroup,
  FormControl,
  Card,
  Image,
} from "react-bootstrap";
import { API, setAuthToken } from "../config/api";
import image from "../images/detail.png";
import bm1 from "../images/bm-1.png";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function DetailJourney() {
  const { journeyId } = useParams();
  const [getJourney, setGetJourney] = useState([]);

  const journey = async () => {
    try {
      const response = await API.get(`/journey/${journeyId}`);
      setGetJourney(response.data.journey);
      console.log(response.data.journey);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    journey();
  }, []);

  return (
    <div
      className="container px-0 py-5"
      style={{ backgroundColor: "#ececec", height: "100vh" }}
    >
      <div className="container d-flex mx-auto px-5 fw-bold justify-content-between align-items-center">
        <p className="mb-0" style={{ fontSize: "2.5rem" }}>
          {getJourney.title}
        </p>
        <p className="mb-0" style={{ fontSize: "1.5rem" }}>
          {getJourney.name}
        </p>
      </div>
      <div className="container row mx-auto px-5 mb-5">
        <p className="mb-0 p-0" style={{ fontSize: "1.2rem" }}>
          02-02-2022
        </p>
      </div>
      <div className="container">
        <div className="container row mx-auto mb-4 d-flex justify-content-center align-items-center">
          <Image src={`http://localhost:5000/uploads/${getJourney.image}`} />
        </div>
        <div className="mx-auto mb-5 d-flex-row text-center">
          <p className="" style={{ fontSize: "1rem" }}>
            {getJourney.description}
          </p>
        </div>
      </div>
    </div>
  );
}
