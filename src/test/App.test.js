import TestRenderer from "react-test-renderer";
import App from "../App";

const testRenderer = TestRenderer.create(<App />);

describe("App Core Functionality", () => {
  it("Renders <App/> component without crashing", () => {
    expect(testRenderer.toJSON().type).toBe("div");
  });
});
