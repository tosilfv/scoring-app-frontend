import React, { useEffect, useState } from 'react'

import UsersList from '../components/UsersList'
import ErrorModal from '../../shared/components/UIElements/ErrorModal'
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner'
import { useHttpClient } from '../../shared/hooks/http-hook'

const Users = () => {
  const { isLoading, error, sendRequest, clearError } = useHttpClient()
  const [loadedUsers, setLoadedUsers] = useState()

  useEffect(() => {
    const fetchUsers = async () => {
      let responseData
      try {
        responseData = await sendRequest(
          process.env.VITE_BACKEND_URL + '/users'
        )
      } catch (err) {
        console.log('err Users: ', err)
      }
      responseData && setLoadedUsers(responseData.users)
    }
    fetchUsers()
  }, [sendRequest])

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && (
        <div className="center">
          <LoadingSpinner />
        </div>
      )}
      {!isLoading && loadedUsers && <UsersList items={loadedUsers} />}
    </React.Fragment>
  )
}

export default Users
