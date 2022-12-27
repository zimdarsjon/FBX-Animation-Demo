import { Demo } from './Demo/demo.js';
import Buttons from './buttons.jsx';
import React from "react";
import reactDOM from "react-dom";

import { render } from 'react-dom';
const container = document.getElementById('root');
render(<Buttons />, container);


async function startDemo() {
  const demo = new Demo(container);
  await demo.init();
  demo.start();
}

startDemo();