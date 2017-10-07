export interface Storage {
  create(key: string, value: any): any,
  destroy(key: string): any,
  index(): [any],
  show(key: string): any,
  truncate(),
  update(key: string, value: any): any,
}

export default (): Storage => {
    var entries = {}
    var id = 1

    return {
      create: (key: string, value: any): any => {
        if (!key) {
          // TODO make sure no conflicts here
          key = `${id}`
          id += 1
        }
        entries[key] = {_id: key, ...value}
        return entries[key]
      },
      destroy: (key: string): any => {
        const value = entries[key]
        delete entries[key]
        return value
      },
      index: (): [any] => (<any>Object).values(entries),
      show: (key: string): any => entries[key],
      truncate: () => {
        entries = {}
        id = 1
      },
      update: (key: string, value: any): any => {
        var updatedValue = {...entries[key], ...value}
        entries[key] = updatedValue
        return updatedValue

      },
    }
}
