export const BaseUrl = "https://app.spiritx.co.nz/api/"

export const auth = () => {
  if (localStorage.getItem('luxdream-yanfengYang-token')) {
    return true
  } else {
    return false
  }
}
