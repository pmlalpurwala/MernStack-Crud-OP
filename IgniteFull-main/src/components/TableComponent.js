import React, { useState, useEffect } from "react";
import axios from "axios";
import FormComponent from "../components/FormComponent";
import { Link, useHistory } from "react-router-dom";
// import { Link } from "react-router-dom";
import styled from "styled-components";
import { motion } from "framer-motion";

const TableComponent = (props) => {
  const pathId = props.match.params.pathId;
  const idd = props.match.params.id;
  const [information, setInformation] = useState({});
  const [flag, setFlag] = useState(false);
  const [sortBy, setSortBy] = useState();
  const [sortOrder, setSortOrder] = useState();
  useEffect(() => {
    axios
      .get("http://localhost:7000/api/display")
      .then((res) => {
        res.data.forEach((element) => {
          element.checkboxFlag = false;
        });
        setInformation(res.data);
      })
      .catch((e) => {
        console.log("Error");
      });
  }, []);

  useEffect(() => {
    axios
      .get("http://localhost:7000/api/display", {
        params: { sortBy: sortBy, sortOrder: sortOrder },
      })
      .then((res) => {
        res.data.forEach((item) => {
          item.checkboxFlag = false;
        });
        setInformation(res.data);
      })
      .catch((e) => console.log(e));
  }, [sortBy, sortOrder]);

  const deletehandler = (id) => {
    axios
      .post("http://localhost:7000/api/deletedata", [id])
      .then(() => {
        console.log(id);
      })
      .catch((e) => {
        console.log("Error");
      });
    window.location.reload(false);
  };

  const mailHandler = () => {
    const list = information
      .filter((items) => items.checkboxFlag === true)
      .map((items) => items._id);
    console.log(information);
    console.log(list);
    axios
      .post("http://localhost:7000/api/mail", list)
      .then((res) => setFlag(true))
      .catch((e) => console.log("Errpr"));
  };

  return (
    <div>
      {pathId === "insertform" && <FormComponent updObject={""} />}
      {pathId === "update" && (
        <FormComponent
          updObject={information.filter((item) => item._id === idd)[0]}
        />
      )}
      <div>
        <div>
          {information.length > 0 ? (
            <div>
              <Table>
                <tbody>
                  <tr>
                    <Heading>
                      <td>selectrow</td>
                    </Heading>
                    <Heading>
                      <td
                        onClick={(e) => {
                          if (sortBy === "_id") {
                            setSortOrder(sortOrder === 1 ? -1 : 1);
                          } else {
                            setSortBy("_id");
                            setSortOrder(1);
                          }
                        }}
                      >
                        Sr . number
                      </td>
                    </Heading>
                    <Heading>
                      <td
                        onClick={(e) => {
                          if (sortBy === "name") {
                            setSortOrder(sortOrder === 1 ? -1 : 1);
                          } else {
                            setSortBy("name");
                            setSortOrder(1);
                          }
                        }}
                      >
                        name
                      </td>
                    </Heading>
                    <Heading>
                      <td
                        onClick={(e) => {
                          if (sortBy === "email") {
                            setSortOrder(sortOrder === 1 ? -1 : 1);
                          } else {
                            setSortBy("email");
                            setSortOrder(1);
                          }
                        }}
                      >
                        email
                      </td>
                    </Heading>
                    <Heading>
                      <td
                        onClick={(e) => {
                          if (sortBy === "phoneNumber") {
                            setSortOrder(sortOrder === 1 ? -1 : 1);
                          } else {
                            setSortBy("phoneNumber");
                            setSortOrder(1);
                          }
                        }}
                      >
                        phone no.
                      </td>
                    </Heading>
                    <Heading>
                      <td
                        onClick={(e) => {
                          if (sortBy === "hobbies") {
                            setSortOrder(sortOrder === 1 ? -1 : 1);
                          } else {
                            setSortBy("hobbies");
                            setSortOrder(1);
                          }
                        }}
                      >
                        hobbies
                      </td>
                    </Heading>
                    <Heading>
                      <td>Edit</td>
                    </Heading>
                  </tr>
                  {information.map((info, idx) => {
                    return (
                      <tr>
                        <Attribute>
                          <input
                            type="checkbox"
                            onChange={(e) => {
                              info.checkboxFlag = e.target.checked;
                            }}
                          />
                        </Attribute>
                        <Attribute>{idx + 1}</Attribute>
                        <Attribute>{info.name}</Attribute>
                        <Attribute>{info.email}</Attribute>
                        <Attribute>{info.phoneNumber}</Attribute>
                        <Attribute>{info.hobbies}</Attribute>
                        <Attribute>
                          <Button
                            onClick={(e) => {
                              deletehandler(info._id);
                            }}
                          >
                            Delete
                          </Button>
                          <Link to={`/viewtable/update/${info._id}`}>
                            <Button>Update</Button>
                          </Link>
                        </Attribute>
                      </tr>
                    );
                  })}
                </tbody>
              </Table>
            </div>
          ) : (
            <p></p>
          )}
        </div>
      </div>
      <div>
        <Link to="/viewtable/insertform">
          <Button>Insert Data</Button>
        </Link>
      </div>
      <div>
        <Button onClick={mailHandler}>Mail</Button>
      </div>
      {flag ? <h2>Mail Sent ..!</h2> : <p></p>}
    </div>
  );
};
const Table = styled(motion.table)`
  border: 1px solid black;
  border-collapse: collapse;
  padding: 15px;
  font-size: 1.5rem;
  text-align: center;
`;

const Heading = styled(motion.th)`
  border: 1px solid black;
  font-family: "Montserrat";
  padding: 15px;
  font-weight: normal;
  max-width: 250px;
  word-wrap: break-word;
  cursor: pointer;
  /* white-space:pre-wrap; 
  
  overflow-x:none; */
`;

const Attribute = styled(motion.td)`
  border: 1px solid black;
  font-family: "Montserrat";
  padding: 15px;
  font-weight: normal;
  max-width: 250px;
  word-wrap: break-word;
  /* white-space:pre-wrap; 
  
  overflow-x:none; */
`;
const Button = styled(motion.button)`
  font-size: 1.5rem;
  border: none;
  padding: 0.5rem 2rem;
  cursor: pointer;
  margin: 1rem;
  background: #ff7676;
  color: white;
  width: 10rem;
`;
export default TableComponent;

// aa commit nai thtu
