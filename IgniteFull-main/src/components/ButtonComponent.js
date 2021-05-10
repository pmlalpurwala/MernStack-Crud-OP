import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { motion } from "framer-motion";

const ButtonComponent = () => {
  return (
    <Div>
      <Link to="/viewtable">
        <Button>View Table </Button>
      </Link>
    </Div>
  );
};

const Button = styled(motion.button)`
  font-size: 1.5rem;
  border: none;
  padding: 0.5rem 2rem;
  cursor: pointer;
  background: #ff7676;
  color: white;
`;
const Div = styled(motion.div)`
  display: flex;
  justify-content: center;
`;
export default ButtonComponent;
