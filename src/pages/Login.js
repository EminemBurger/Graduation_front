import React, { Component } from 'react'
import '../main.css';
import '../util.css';
import '../images/icons/favicon.ico';
import '../vendor/bootstrap/css/bootstrap.min.css';
import '../fonts/font-awesome-4.7.0/css/font-awesome.min.css';
import '../fonts/iconic/css/material-design-iconic-font.min.css';
import '../vendor/animate/animate.css';
import '../vendor/css-hamburgers/hamburgers.min.css';
import '../vendor/animsition/css/animsition.min.css';
import '../vendor/select2/select2.min.css';
import '../vendor/daterangepicker/daterangepicker.css';
import { Link } from 'react-router-dom';

export default class Login extends Component {
	constructor() {
		super()
		this.state = {
		  email: '',
		  password: '',
		  errors: {}
		}
	
		this.onChange = this.onChange.bind(this)
		this.onSubmit = this.onSubmit.bind(this)
	  }
	
	  onChange(e) {
		this.setState({ [e.target.name]: e.target.value })
	  }
	  onSubmit(e) {
		e.preventDefault()
	
		const user = {
		  email: this.state.email,
		  password: this.state.password
		}
	  }
      
      render() {

    return (
        <>

		<div className="container-login100">
			<div className="wrap-login100 p-l-55 p-r-55 p-t-65 p-b-54">
				<form className="login100-form validate-form" noValidate onSubmit={this.onSubmit}>
					<span className="login100-form-title p-b-49">
						Login
					</span>

					<div className="wrap-input100 validate-input m-b-23">
						<span className="label-input100">Username</span>
						<input className="input100" type="text" name="email" placeholder="Type your username" value={this.state.email} onChange={this.onChange}></input>
						<span className="focus-input100" data-symbol="&#xf206;"></span>
					</div>

					<div className="wrap-input100 validate-input" data-validate="Password is required">
						<span className="label-input100">Password</span>
						<input className="input100" type="password" name="password" placeholder="Type your password" value={this.state.password} onChange={this.onChange}></input>
						<span className="focus-input100" data-symbol="&#xf190;"></span>
					</div>
					
					<div className="text-right p-t-8 p-b-31">
						<a href="#">
							Forgot password?
						</a>
					</div>
					
					<div className="container-login100-form-btn">
						<div className="wrap-login100-form-btn">
							<div className="login100-form-bgbtn"></div>
							<button className="login100-form-btn" type="submit">
								Login
							</button>
						</div>
					</div>

		

		

					<div className="flex-col-c p-t-155">
						<span className="txt1 p-b-17">
							Or Sign Up Using
						</span>

						<Link to="/register" className="txt2">
							Sign Up
						</Link>
					</div>
				</form>
			</div>
		</div>
	<div id="dropDownSelect1"></div>
    </>
    
        );
      }
}
