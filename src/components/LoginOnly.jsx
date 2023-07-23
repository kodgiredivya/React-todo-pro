import React, { useContext } from 'react'
import { UserState } from '../App'

export default function LoginOnly({ element }) {
    const { login } = useContext(UserState)
    return login.name ? element : "Unauthorized Access"
}
