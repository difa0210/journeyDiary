import { useEffect, useState } from "react";
import { Stack, Button, InputGroup, FormControl, Card } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { API, setAuthToken } from "../config/api";
import bookmarkIcon from "../images/Vector.png";

export default function Home() {
  const navigate = useNavigate();
  const { journeyId } = useParams();
  const [getJourney, setGetJourney] = useState([]);
  const [allJourney, setAllJourney] = useState();

  // const [form, setForm] = useState({
  //   journeyIds: "",
  // });

  // const { journeyIds } = form;
  // const handleChange = (e) => {
  //   setForm({
  //     ...form,
  //     [e.target.name]: e.target.value,
  //   });
  // };

  // const journey = async () => {
  //   try {
  //     const response = await API.get(`/journey/${journeyId}`);
  //     setGetJourney(response.data.journey);
  //     console.log(response.data.journey);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  const journeys = async () => {
    try {
      const response = await API.get("/journeys");
      setAllJourney(response.data.journeys);
      console.log(response.data.journeys);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    journeys();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Configuration
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      const data = {
        journeyIds: allJourney.id,
      };

      const body = JSON.stringify(data);

      // Insert data user to database
      const response = await API.post("/bookmark", body, config);
      window.location.reload();
      console.log(response);
    } catch (error) {
      console.log(error.response);
    }
  };
  return (
    <div className="container py-5" style={{ backgroundColor: "#ececec" }}>
      <div className="container row text-black mx-auto mb-5 fw-bold">
        <p className="" style={{ fontSize: "2.5rem" }}>
          Journey
        </p>
      </div>
      <div className="container row mx-auto mb-3" style={{ width: "68rem" }}>
        <InputGroup className="mb-5">
          <FormControl
            className="shadow"
            style={{ background: "white", borderWidth: 0 }}
            placeholder="Search Journey"
            aria-label="Recipient's username"
            aria-describedby=""
          />
          <Button className="btn-blue shadow" variant="" id="">
            Search
          </Button>
        </InputGroup>
      </div>
      <div className="container row mx-auto" style={{ width: "77rem" }}>
        {allJourney &&
          allJourney.map((item, index) => (
            <div
              className="col-3 my-3 mx-auto"
              key={index}
              style={{ cursor: "pointer" }}
            >
              <Card
                style={{ width: "16.5rem", borderRadius: "0.5rem" }}
                className="shadow mx-auto"
                onClick={() => navigate(`/detailJourney/${item.id}`)}
              >
                <Card.Img
                  variant="top"
                  src={`http://localhost:5000/uploads/${item.image}`}
                />
                <span
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
                  <Card.Text
                    className="text-truncate"
                    style={{ fontSize: "0.9rem" }}
                  >
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
