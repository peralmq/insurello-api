export class DuplicateKey extends Error {
  constructor(key: string) {
    super(`Duplicate key '${key}'`)
    this.name = 'DuplicateKey'
    Object.setPrototypeOf(this, DuplicateKey.prototype)
  }
}

export class BadState extends Error {
  constructor(state: string) {
    super(`Bad state '${state}'`)
    this.name = 'BadState'
    Object.setPrototypeOf(this, BadState.prototype)
  }
}
