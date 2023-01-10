import React from "react";
import { render, waitForElementToBeRemoved } from "@testing-library/react";
import Login from "./Login";
import { ionFireEvent as fireEvent } from "@ionic/react-test-utils";

function mockFetch(data: any) {
  return jest
    .spyOn(window, "fetch")
    .mockResolvedValue(new Response(JSON.stringify(data)));
}

beforeEach(() => mockFetch([]));

test("page should have a title of Login", async () => {
  const { findByText } = render(<Login />);
  await findByText("Login");
});


