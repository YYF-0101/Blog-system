export const auth = () => {
  if (localStorage.getItem('luxdream-yanfengYang-token')) {
    return true
  } else {
    return false
  }
}