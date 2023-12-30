const { myFunction } = require("../scripts/main");

describe("myFunction", () => {
  it("should return true when input is valid", () => {
    const input = "valid input";
    const output = myFunction(input);
    expect(output).toBe(true);
  });

  it("should return false when input is invalid", () => {
    const input = "invalid input";
    const output = myFunction(input);
    expect(output).toBe(false);
  });
});
