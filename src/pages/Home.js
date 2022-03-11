import { useEffect, useState, useContext } from "react";
import { Button, InputGroup, FormControl, Card, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { API } from "../config/api";
import bookmarkIcon from "../images/Vector.png";
import { ModalContext } from "../context/ModalContext";
import { UserContext } from "../context/userContext";

export default function Home() {
  const navigate = useNavigate();
  const [, , toggle] = useContext(ModalContext);
  const [user] = useContext(UserContext);
  const [allJourney, setAllJourney] = useState();
  const [inputText, setInputText] = useState("");
  const [message, setMessage] = useState(null);

  const journeys = async () => {
    try {
      const response = await API.get("/journeys");
      setAllJourney(
        response.data.journeys.map((x) => ({
          ...x,
          isSelected: false,
        }))
      );
      console.log(
        response.data.journeys.map((x) => ({
          ...x,
          isSelected: false,
        }))
      );
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    journeys();
  }, []);

  const handleChange = (value, index) => {
    allJourney[index].isSelected = value;
    setAllJourney([...allJourney]);
  };

  const handleSubmit = async (e, id) => {
    e.preventDefault();
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      const data = {
        journeyId: allJourney.filter((x) => x.isSelected).map((x) => x.id),
      };
      console.log(data);
      const body = JSON.stringify(data);

      const response = await API.post(`/bookmark`, body, config);
      console.log(response);

      if (response.data.message === "success") {
        const alert = (
          <Alert variant="success" className=" py-1 fw-bold">
            Add Bookmark Success
          </Alert>
        );
        setMessage(alert);
      }
    } catch (error) {
      console.log(error.response);
    }
  };

  const inputHandler = (e) => {
    setInputText(e.target.value);
  };

  // let dataSearch = allJourney.data.filter((item) => {
  //   return Object.keys(
  //     item.some((key) =>
  //       item[key]
  //         .toString()
  //         .toLowerCase()
  //         .includes(journey.toString().toLowerCase())
  //     )
  //   );
  // });

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
            onChange={inputHandler}
            className="shadow"
            style={{ background: "white", borderWidth: 0 }}
            value={inputText}
            placeholder="Search Journey"
          />

          <Button className="btn-blue shadow fw-bold" variant="" id="">
            Search
          </Button>
        </InputGroup>
      </div>
      <div className="container row mx-auto" style={{ width: "77rem" }}>
        <div>{message && message}</div>
        {allJourney &&
          allJourney.map((item, index) => (
            <div className="col-3 my-3 mx-start" key={index}>
              <Card
                style={{ width: "16.5rem", borderRadius: "0.5rem" }}
                className="shadow mx-auto"
              >
                <Card.Img
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    navigate(`/detailJourney/${item.id}`);
                  }}
                  variant="top"
                  src={`http://localhost:5000/uploads/${item.image}`}
                />
                <span
                  onClick={(e) => {
                    if (user) {
                      handleChange(!item.isSelected, index);
                      handleSubmit(e, item.id);
                    } else {
                      toggle("Login");
                    }
                  }}
                  style={{
                    cursor: "pointer",
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
                    {new Date(item.updatedAt).toDateString()}
                  </p>
                  <Card.Text
                    className="text-truncate"
                    style={{
                      fontSize: "0.9rem",
                      minHeight: "2.5rem",
                      maxHeight: "2.5rem",
                    }}
                    dangerouslySetInnerHTML={{ __html: item.description }}
                  ></Card.Text>
                </Card.Body>
              </Card>
            </div>
          ))}
      </div>
    </div>
  );
}
