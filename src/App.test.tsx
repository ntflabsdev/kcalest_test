import React from "react";
import { render, act, waitForElementToBeRemoved } from "@testing-library/react";
import App from "./App";
import ReactDOM from "react-dom";
import { ionFireEvent as fireEvent } from '@ionic/react-test-utils';


//@ts-ignore
global.crypto = require("@trust/webcrypto");



it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});

// test('renders without crashing', () => {
//   const { baseElement } = render(<App />);
//   expect(baseElement).toBeDefined();
// });
