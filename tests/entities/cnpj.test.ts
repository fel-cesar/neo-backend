import { Cnpj } from "../../src/entities/cnpj.entity";

describe("Cnpj Entity", () => {
  it("should create a valid CNPJ entity", () => {
    const cnpj = new Cnpj({ value: "11444777000161" });
    expect(cnpj.value).toBe("11444777000161"); // Ensures CNPJ is formatted
  });

  it("should throw an error for an invalid CNPJ", () => {
    expect(() => new Cnpj({ value: "11111111000111" })).toThrow("Invalid CNPJ");
    expect(() => new Cnpj({ value: "123" })).toThrow("Invalid CNPJ");
  });

  it("should convert CNPJ to JSON correctly", () => {
    const cnpj = new Cnpj({ value: "11444777000161" });
    expect(cnpj.toJSON()).toEqual({
      id: 0,
      value: "11444777000161",
      blocked: false,
      createdAt: expect.any(Date),
    });
  });

  it("should create a CNPJ entity from JSON", () => {
    const json = {
      id: 1,
      value: "11444777000161",
      blocked: true,
      createdAt: new Date(),
    };
    const cnpj = Cnpj.fromJSON(json);
    expect(cnpj).toBeInstanceOf(Cnpj);
    expect(cnpj.value).toBe("11444777000161");
  });
});
