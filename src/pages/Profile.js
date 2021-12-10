import React from 'react'
import {Fragment, useContext} from 'react'
import UserContext from '../UserContext'
import {Navigate} from 'react-router-dom'
import styled from "styled-components";
import Orders from '../components/OrderAccordion'

const Container = styled.div`
	height: auto;
	display: flex;
	align-items: start;
	flex-direction:column;
`

const Profile = () => {

  const { user } = useContext(UserContext)

	return (
		(user.id === null) ? 
		<Navigate to = "/" /> :
		<Fragment>
			<Container>
			<h1>Your Profile</h1>
			<p>Full Name: {user.firstName} {user.lastName}</p>

			<p>email address: {user.email}</p>
			<p>(Is this still your email? Click <a href="/">here</a> to change.)</p>

			<p>See your orders:</p>
			<Orders/>
		</Container>
		</Fragment>
	)
}

export default Profile