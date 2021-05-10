import React, { useState, useEffect } from "react";
import FormComponent from "../components/FormComponent";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { motion } from "framer-motion";

const TableComponent = (props) => {
  const pathId = props.match.params.pathId;
  const [information, setInformation] = useState({});
  const [flag, setFlag] = useState(false);
  useEffect(() => {}, []);
  return (
    <div>
      {pathId === "insertform" && <FormComponent />}

      <div>
        <div>
          {information.length > 0 ? (
            <div>
              <table>
                <tbody>
                  <tr>
                    <th>
                      <td>selectrow</td>
                    </th>
                    <th>
                      <td>Sr . number</td>
                    </th>
                    <th>
                      <td>name</td>
                    </th>
                    <th>
                      <td>email</td>
                    </th>
                    <th>
                      <td>phone no.</td>
                    </th>
                    <th>
                      <td>hobbies</td>
                    </th>
                    <th>
                      <td>Edit</td>
                    </th>
                  </tr>
                  {information.map((info, idx) => {
                    <tr>
                      <td>
                        <input type="checkbox" />
                      </td>
                      <td>{idx + 1}</td>
                      <td>{info.name}</td>
                      <td>{info.email}</td>
                      <td>{info.phoneNumber}</td>
                      <td>{info.hobbies}</td>
                      <td>
                        <button>Update</button>
                        <button>Delete</button>
                      </td>
                    </tr>;
                  })}
                </tbody>
              </table>
            </div>
          ) : (
            <p></p>
          )}
        </div>
      </div>
      <div>
        <Link to="/viewtable/insertform">
          <button>Insert Data</button>
        </Link>
      </div>
      <div>
        <button>Mail</button>
      </div>
      {flag ? <h2>Mail Sent ..!</h2> : <p></p>}
    </div>
  );
};

export default TableComponent;
