const test = async (user) => {
  console.log(user)
  return { user: user }
}

const UserService = {
  test: test
}

export default UserService