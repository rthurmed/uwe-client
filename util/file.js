export const download = (uri, name) => {
  const link = document.createElement('a')
  link.download = name
  link.href = uri
  link.click()
}
