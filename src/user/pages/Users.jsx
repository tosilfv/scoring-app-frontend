import React, { useEffect, useState } from 'react'
import { useHttpClient } from '../../shared/hooks/http-hook'
import ErrorModal from '../../shared/components/UIElements/ErrorModal'
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner'
import UsersList from '../components/UsersList'

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
