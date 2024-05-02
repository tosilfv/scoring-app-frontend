import React, { useContext } from 'react'
import { AuthContext } from '../../shared/context/auth-context'
import Card from '../../shared/components/UIElements/Card'
import { style } from '../../shared/styles/styles'

const Profile = () => {
  const auth = useContext(AuthContext)

  return (
    <React.Fragment>
      <Card>
        <h3 style={style.profileheader}>LOGGED IN USER</h3>
        <div style={style.profileusername}>{auth.userName}</div>
      </Card>
    </React.Fragment>
  )
}

export default Profile
