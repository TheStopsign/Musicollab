import React, { Component } from 'react'
import { Route, Redirect } from 'react-router-dom'

export const ProtectedRoute = ({ component: Component, ...rest}) => {
	const isLoggedIn = localStorage.getItem('isLoggedIn');
	return(
		<Route {...rest} render={
			(props) => {
				if (isLoggedIn === 'true'){
					return <Component {...props} />
				}else{
					return (
						<Redirect to={{
							pathname: "/",
							state: { from: props.location }
							}}
						/>
					);
				}
			}}
		/>
	);
};