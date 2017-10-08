import { DuplicateKey, NotFound } from './errors'

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

    function show(key: string): any {
      if (!entries.hasOwnProperty(key)) {
        throw new NotFound(key)
      }
      return entries[key]
    }

    return {
      create: (key: string, value: any): any => {
        if (!key) {
          key = `${id}`
          id += 1
        } else if (show(key) !== undefined) {
          throw new DuplicateKey(key)
        }
        entries[key] = {_id: key, ...value}
        return entries[key]
      },
      destroy: (key: string): any => {
        show(key)
        const value = entries[key]
        delete entries[key]
        return value
      },
      index: (): [any] => (<any>Object).values(entries),
      show: show,
      truncate: () => {
        entries = {}
        id = 1
      },
      update: (key: string, value: any): any => {
        show(key)
        var updatedValue = {...entries[key], ...value}
        entries[key] = updatedValue
        return updatedValue

      },
    }
}
