export class CPFValidator {
  /**
   * @description Validates a CPF number using format and checksum rules.
   * @param {string} cpf - The CPF number as a string (only digits, without formatting).
   * @returns {boolean} True if CPF is valid, false otherwise.
   * @example
   * CPFValidator.isValid("12345678909") // true
   * CPFValidator.isValid("11111111111") // false
   */
  static isValid(cpf: string): boolean {
    if (!cpf || cpf.length !== 11 || !/^\d{11}$/.test(cpf)) {
      return false;
    }

    // Check if all digits are the same (invalid CPF)
    if (cpf.split("").every((char) => char === cpf[0])) {
      return false;
    }

    // Validate CPF checksum using mathematical rules
    return CPFValidator.validateChecksum(cpf);
  }

  /**
   * @description Formats a CPF number to the pattern XXX.XXX.XXX-XX.
   * @param {string} cpf - The CPF number as a string (only digits).
   * @returns {string} Formatted CPF or empty string if invalid.
   * @example
   * CPFValidator.format("12345678909") // "123.456.789-09"
   */
  static format(cpf: string): string {
    if (!this.isValid(cpf)) return "";
    return `${cpf.slice(0, 3)}.${cpf.slice(3, 6)}.${cpf.slice(
      6,
      9
    )}-${cpf.slice(9, 11)}`;
  }

  /**
   * @description Internal method to validate CPF checksum.
   * @param {string} cpf - The CPF number as a string.
   * @returns {boolean} True if checksum is valid, false otherwise.
   */
  private static validateChecksum(cpf: string): boolean {
    const calcDigit = (factor: number) => {
      let total = 0;
      for (let i = 0; i < factor - 1; i++) {
        total += parseInt(cpf[i]) * (factor - i);
      }
      const remainder = total % 11;
      return remainder < 2 ? 0 : 11 - remainder;
    };

    // Check first and second verification digits
    const firstDigit = calcDigit(10);
    const secondDigit = calcDigit(11);

    return firstDigit === parseInt(cpf[9]) && secondDigit === parseInt(cpf[10]);
  }
}
