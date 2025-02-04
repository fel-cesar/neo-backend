import { Cpf } from "../../src/entities/cpf";

describe("CPF Entity", () => {
  it("should create a valid CPF", () => {
    const cpf = new Cpf({ value: "12345678901", blocked: false });
    expect(cpf.value).toBe("12345678901");
  });

  it("should throw an error for an invalid CPF", () => {
    expect(() => new Cpf({ value: "123", blocked: false })).toThrow("Invalid CPF");
  });
});
