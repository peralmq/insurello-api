export interface Storage {
  create(key: string, value: any),
  destroy(key: string): any,
  index(): [any],
  show(key: string): any,
  update(key: string, value: any): any,
}

export default (): Storage => {
    const entries = {}

    return {
      create: (key: string, value: any) => {
          entries[key] = value
      },
      destroy: (key: string): any => {
        const value = entries[key]
        delete entries[key]
        return value
      },
      index: (): [any] => (<any>Object).values(entries),
      show: (key: string): any => entries[key],
      update: (key: string, value: any): any => {
        var updatedValue = {...entries[key], ...value}
        entries[key] = updatedValue
        return updatedValue

      },
    }
}
