import React, { useContext } from 'react'
import { AuthContext } from '../../shared/context/auth-context'
import Card from '../../shared/components/UIElements/Card'
import UserItem from './UserItem'
import './UsersList.css'

const UsersList = (props) => {
  const auth = useContext(AuthContext)

  if (props.items.length === 0) {
    return (
      <div className="center">
        <Card>
          <h2>No users found.</h2>
        </Card>
      </div>
    )
  }

  return (
    <ul className="users-list">
      {props.items.map(
        (user) =>
          auth.isAdmin &&
          auth.isLoggedIn && (
            <UserItem
              key={user.id}
              id={user.id}
              name={user.name}
              courseCount={user.courses.length}
            />
          )
      )}
    </ul>
  )
}

export default UsersList
