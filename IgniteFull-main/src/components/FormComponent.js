import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useHistory } from "react-router-dom";
import styled from "styled-components";
import { motion } from "framer-motion";

const FormComponent = ({ updObject }) => {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [phoneNumber, setPhoneNumber] = useState();
  const [hobbies, setHobbies] = useState();
  const [error, setError] = useState();
  const history = useHistory();
  useEffect(() => {
    if (updObject) {
      setName(updObject.name);
      setEmail(updObject.email);
      setPhoneNumber(updObject.phoneNumber);
      setHobbies(updObject.hobbies);
    }
  }, [updObject]);
  const formsubmit = (e) => {
    //alert("form");
    e.preventDefault();

    if (updObject) {
      console.log(updObject);
      axios
        .post("http://localhost:7000/api/update", {
          _id: updObject._id,
          name: name,
          email: email,
          phoneNumber: phoneNumber,
          hobbies: hobbies,
        })
        .then((res) => {
          history.push("/viewtable");
          window.location.reload(false);
        })
        .catch((e) => console.log("error"));
    } else {
      axios
        .post("http://localhost:7000/api/insert", {
          name: name,
          email: email,
          phoneNumber: phoneNumber,
          hobbies: hobbies,
        })
        .then((res) => {
          history.push("/viewtable");
          window.location.reload(false);
        })
        .catch((e) => console.log("error"));
    }
  };
  return (
    <div>
      <Card>
        <Details>
          {error && <div>{error}</div>}
          <Form onSubmit={formsubmit}>
            <Label for="fname">Name:</Label>
            <br></br>
            <Input
              type="text"
              id="fname"
              name="fname"
              defaultValue={updObject ? updObject.name : ""}
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
            <br></br>
            <Label for="email">Email:</Label>
            <br></br>
            <Input
              type="email"
              id="email"
              name="email"
              defaultValue={updObject ? updObject.email : ""}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
            <br></br>
            <Label for="pn">PhoneNumber:</Label>
            <br></br>
            <Input
              type="number"
              id="phoneNumber"
              name="pn"
              defaultValue={updObject ? updObject.phoneNumber : ""}
              onChange={(e) => {
                setPhoneNumber(e.target.value);
              }}
            />
            <br></br>
            <Label for="hobbies">Hobbies:</Label>
            <br></br>
            <Input
              type="text"
              id="hobbies"
              name="hobbies"
              defaultValue={updObject ? updObject.hobbies : ""}
              onChange={(e) => {
                setHobbies(e.target.value);
              }}
            />
            <br></br>
            <button type="submit">
              {updObject ? "Udpate Data" : "Insert Data"}
            </button>
          </Form>
        </Details>
      </Card>
    </div>
  );
};

const Label = styled(motion.label)`
  font-size: 1.5rem;
  font-family: "Montserrat";
  color: black;
`;

const Input = styled(motion.input)`
  width: 100%;
  border: 2px solid black;
  height: 40px;
  margin-bottom: 20px;
  color: black;
  font-family: "Montserrat";
  padding: 1.1rem 0rem;
  font-size: 1.5rem;
`;

const Form = styled(motion.form)`
  width: 100%;
  colour: black;
`;

const Card = styled(motion.div)`
  width: 100%;
  overflow-y: scroll;
  min-height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  position: fixed;
  top: 0;
  left: 0;
  z-index: 10;
  display: flex;

  &::-webkit-scrollbar {
    width: 0.5rem;
  }

  &::-webkit-scrollbar-thumb {
    background: #ff7676;
  }

  &::-webkit-scrollbar-track {
    background: white;
  }
`;

const Details = styled(motion.div)`
  width: 90%;
  border-radius: 1rem;
  padding: 2rem 5rem;
  position: absolute;
  top: 10%;
  left: 5%;
  background: #ffffff;
  z-index: 15;
`;

export default FormComponent;
