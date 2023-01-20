import React from "react";
import { Routes, Route } from "react-router-dom";

import Home from "../src/components/Home";
import Register from "./components/register/Register";
import Input from "./components/input/Input";
import Output from "./components/output/Output";

const RoutesProp = props =>
    <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/register" element={<Register />} />
        <Route exact path="/input" element={<Input />} />
        <Route exact path="/output" element={<Output />} />
        <Route path="*" element={<Home />} />
    </Routes>

export default RoutesProp;