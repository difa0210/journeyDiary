import { Card, Image, Button } from "react-bootstrap";
import { API, setAuthToken } from "../config/api";
import imageProfile from "../images/profile2.png";
import trash from "../images/trash.png";
import edit from "../images/edit.png";
import { useNavigate, useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { ModalContext } from "../context/ModalContext";

export default function Profile() {
  const navigate = useNavigate();
  const [, , , , toggle] = useContext(ModalContext);
  const [getJourney, setGetJourney] = useState();
  const [getProfile, setGetProfile] = useState();

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

  const handleDelete = async (e, id) => {
    try {
      e.preventDefault();

      await API.delete(`/deletejourney/${id}`);
      await myJourney();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container py-5" style={{ backgroundColor: "#ececec" }}>
      <div className="container row mx-auto mb-5 fw-bold">
        <p className="animate-character" style={{ fontSize: "2.5rem" }}>
          My Profile
        </p>
      </div>
      <div className="">
        <div className="mx-auto mb-3 d-flex justify-content-center align-items-center">
          <Image src={imageProfile} />
        </div>
        {/* <div className="col d-flex justify-content-end align-items-center">
          <Button
            className="shadow fw-bold btn-blue"
            variant=""
            type="submit"
            size="sm"
            onClick={() => toggle("EditProfile")}
          >
            Edit Profile
          </Button>
        </div> */}
        <div className="mx-auto mb-5 d-flex-row text-center fs-2">
          {getProfile && getProfile.name}
          <p className="mt-1" style={{ fontSize: "1.2rem" }}>
            {getProfile && getProfile.email}
          </p>
        </div>
      </div>
      <div className="container row mx-auto" style={{ width: "77rem" }}>
        {getJourney &&
          getJourney.map((item, index) => (
            <div key={index} className="col-3 my-3 mx-start">
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
                {/* <span
                  onClick={(e) => handleDelete(e, item.id)}
                  style={{
                    cursor: "pointer",
                    background: "white",
                    borderRadius: "0.2rem",
                    margin: "0.5rem",
                  }}
                  className="fw-bold shadow-lg position-absolute top-55 end-0 px-2 py-1"
                >
                  <img src={trash} alt="" />
                </span> */}

                {/* <span
                  onClick={() => navigate(`/journey/${item.id}`)}
                  style={{
                    cursor: "pointer",
                    background: "white",
                    borderRadius: "0.2rem",
                    margin: "0.5rem",
                  }}
                  className="fw-bold shadow-lg position-absolute top-55 end-0 px-2 py-1 me-5"
                >
                  <img
                    style={{
                      width: "1.2rem",
                    }}
                    src={edit}
                    alt=""
                  />
                </span> */}
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
