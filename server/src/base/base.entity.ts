export abstract class BaseEntity<T extends Record<string, unknown>> {
  constructor(public readonly data: T) {}

  validateHasAllProperty(): string | null {
    if (!this.arrayEquals(Object.keys(this.validater), Object.keys(this.data))) return 'invalid data'
    return null
  }

  /**
   * @return エラーメッセージ
   */
  validateSchema(): string | null {
    try {
      Object.values(this.validater).forEach((v) => v())
      return null
    } catch (e) {
      return e.message
    }
  }

  protected abstract readonly validater: Record<keyof T, () => string | null>

  private arrayEquals<T>(arr1: T[], arr2: T[]) {
    return arr1.every((elem) => arr2.includes(elem))
  }
}
