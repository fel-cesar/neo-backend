export class CNPJValidator {
  /**
   * @description Validates a CNPJ number using format and checksum rules.
   * @param {string} cnpj - The CNPJ number as a string (only digits, without formatting).
   * @returns {boolean} True if CNPJ is valid, false otherwise.
   * @example
   * CNPJValidator.isValid("11444777000161") // true
   * CNPJValidator.isValid("11111111000111") // false
   */
  static isValid(cnpj: string): boolean {
    if (!cnpj || cnpj.length !== 14 || !/^\d{14}$/.test(cnpj)) {
      return false;
    }

    // Check if all digits are the same (invalid CNPJ)
    if (cnpj.split("").every((char) => char === cnpj[0])) {
      return false;
    }

    // Validate CNPJ checksum using mathematical rules
    return CNPJValidator.validateChecksum(cnpj);
  }

  /**
   * @description Formats a CNPJ number to the pattern XX.XXX.XXX/XXXX-XX.
   * @param {string} cnpj - The CNPJ number as a string (only digits).
   * @returns {string} Formatted CNPJ or empty string if invalid.
   * @example
   * CNPJValidator.format("11444777000161") // "11.444.777/0001-61"
   */
  static format(cnpj: string): string {
    if (!this.isValid(cnpj)) return "";
    return `${cnpj.slice(0, 2)}.${cnpj.slice(2, 5)}.${cnpj.slice(
      5,
      8
    )}/${cnpj.slice(8, 12)}-${cnpj.slice(12, 14)}`;
  }

  /**
   * @description Internal method to validate CNPJ checksum.
   * @param {string} cnpj - The CNPJ number as a string.
   * @returns {boolean} True if checksum is valid, false otherwise.
   */
  private static validateChecksum(cnpj: string): boolean {
    const calcDigit = (cnpj: string, weights: number[]): number => {
      let sum = 0;
      for (let i = 0; i < weights.length; i++) {
        sum += parseInt(cnpj[i]) * weights[i];
      }
      const remainder = sum % 11;
      return remainder < 2 ? 0 : 11 - remainder;
    };

    // Weight matrices for validation
    const weightsFirst = [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
    const weightsSecond = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];

    // Compute first and second verification digits
    const firstDigit = calcDigit(cnpj, weightsFirst);
    const secondDigit = calcDigit(cnpj, weightsSecond);

    return (
      firstDigit === parseInt(cnpj[12]) && secondDigit === parseInt(cnpj[13])
    );
  }
}
