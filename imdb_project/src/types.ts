export type User = {
    id: string,
    username: string;
    email: string;
    password: string;
    passwordText: string;
    profilePicture?: string;
    role: string         
  }
  export type ChildrenElementType = {
    children: React.ReactElement
  }
  export type UsersReducerActionTypes = 
  { type: 'setUsers', data: User[]} |
  { type: 'addUser', newUser: User } |
  { type: 'deleteUser', id: User['id'] }
  
  export type UsersContextTypes = {
    loggedInUser: User | null,
    setLoggedInUser: React.Dispatch<React.SetStateAction<User | null>>,
    users: User[],
    dispatch: React.ActionDispatch<[UsersReducerActionTypes]>
  }