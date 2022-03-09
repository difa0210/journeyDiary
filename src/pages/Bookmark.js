import { useEffect, useState } from "react";
import { Stack, Button, InputGroup, FormControl, Card } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { API, setAuthToken } from "../config/api";
import bookmarkIcon from "../images/Vector.png";

export default function Bookmark() {
  const { myId } = useParams();
  const [getBookmarks, setGetBookmarks] = useState();

  const bookmarks = async () => {
    try {
      setAuthToken(localStorage.getItem("token"));
      const response = await API.get("/bookmarks");
      setGetBookmarks(response.data.bookmarks);
      console.log(response.data.bookmarks);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    bookmarks();
  }, []);

  return (
    <div
      className="container px-0 py-5"
      style={{ backgroundColor: "#ececec", height: "100vh" }}
    >
      <div className="container row mx-auto mb-5 fw-bold">
        <p className="" style={{ fontSize: "2.5rem" }}>
          My Bookmark
        </p>
      </div>

      <div className="container row mx-auto" style={{ width: "77rem" }}>
        {getBookmarks &&
          getBookmarks.map((item, index) => (
            <div key={index} className="col-3 my-3 mx-auto px-0">
              <Card
                style={{ width: "16.5rem", borderRadius: "0.5rem" }}
                className="shadow mx-auto px-0"
              >
                <Card.Img
                  variant="top"
                  src={`http://localhost:5000/uploads/${item.Journey.image}`}
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
                    {item.Journey.title}
                  </Card.Title>
                  <p className="opacity-50" style={{ fontSize: "0.8rem" }}>
                    02-10-2020
                  </p>
                  <Card.Text className="text-truncate">
                    {item.Journey.description}
                  </Card.Text>
                </Card.Body>
              </Card>
            </div>
          ))}
      </div>
    </div>
  );
}
