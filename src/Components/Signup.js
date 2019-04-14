import React, {Component} from 'react';

    class  Signup extends Component {
        constructor(props) {
            super(props);
            this.state = {
                username: "",
            }
            this.handleChange = this.handleChange.bind(this);
            this.handleSubmit = this.handleSubmit.bind(this);
        }
        handleChange(e) {
            this.setState({username: e.target.value});
        }
        handleSubmit(e) {
            e.preventDefault()
            this.props.onSubmit(this.state.username);
        }
        render() {
            return(
                <div style={signupStyle} className="form-container">
                    <h1>Let's Talk</h1>
                    <form onSubmit={this.handleSubmit} className="form">
                        <label htmlFor="email">What is your email?</label>
                        <input type="email" name="username" onChange={this.handleChange} className="input" />
                        <button className="btn btn-outline-primary submit">Submit</button>
                    </form>
                </div>
            )
        }
    }

    const signupStyle = {
        width: '50%',
        margin: 'auto',
        marginTop: '10rem'
    }
    export default Signup;