import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { AuthContext } from '../../shared/context/auth-context'
import Avatar from '../../shared/components/UIElements/Avatar'
import Card from '../../shared/components/UIElements/Card'
import './UserItem.css'

const UserItem = (props) => {
  const auth = useContext(AuthContext)

  return (
    <>
      {!auth.isLoggedIn ? (
        <li className="user-item">
          <Card className="user-item__content">
            <div className="user-item__image">
              <Avatar name={props.name} />
            </div>
            <div className="user-item__info">
              <h2>{props.name}</h2>
              <h3>
                {props.courseCount}{' '}
                {props.courseCount === 1 ? 'Course' : 'Courses'}
              </h3>
            </div>
          </Card>
        </li>
      ) : (
        <li className="user-item">
          <Card className="user-item__content">
            <Link to={`/${props.id}/courses`}>
              <div className="user-item__image">
                <Avatar name={props.name} />
              </div>
              <div className="user-item__info">
                <h2>{props.name}</h2>
                <h3>
                  {props.courseCount}{' '}
                  {props.courseCount === 1 ? 'Course' : 'Courses'}
                </h3>
              </div>
            </Link>
          </Card>
        </li>
      )}
    </>
  )
}

export default UserItem
