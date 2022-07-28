export const BaseUrl = "https://app.spiritx.co.nz/api/"

export const auth = () => {
  if (localStorage.getItem('token')) {
    return true
  } else {
    return false
  }
}