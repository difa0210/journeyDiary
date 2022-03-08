import { Stack, Button, InputGroup, FormControl, Card } from "react-bootstrap";
import { API } from "../config/api";

export default function Home() {
  return (
    <div
      className="container p-0"
      style={{ backgroundColor: "#ececec", height: "100vh" }}
    >
      <div className="container row text-black mx-auto mb-4 fw-bold">
        <p className="" style={{ fontSize: "2.5rem" }}>
          Journey
        </p>
      </div>
      <div className="container row mx-auto mb-3" style={{ width: "80vw" }}>
        <InputGroup className="mb-3 ">
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
      <div className="container row">
        <div className="col-3 m-4">
          <Card style={{ width: "18rem" }} className="shadow">
            <Card.Img variant="top" src="holder.js/100px180" />
            <span className="position-absolute top-0 end-0 p-4 bg-success rounded-circle"></span>
            <Card.Body>
              <Card.Title>Card Title</Card.Title>
              <p className="opacity-50" style={{ fontSize: "0.8rem" }}>
                02-10-2020
              </p>
              <Card.Text className="text-wrap text-truncate">
                Some quick example text to build on the card title and make up
                the bulk of the card's content.
              </Card.Text>
            </Card.Body>
          </Card>
        </div>
      </div>
    </div>
  );
}
