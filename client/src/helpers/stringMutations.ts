const titleCase = (str: string): string => {
  return str.toLowerCase().replace(/(^|\s)(\w)/g, function (x) {
    return x.toUpperCase()
  })
}

export { titleCase }
