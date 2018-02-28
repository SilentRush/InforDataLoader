import React, { Component } from 'react';
import {Route} from 'react-router';
import { Modal,Button } from 'semantic-ui-react'
import Login from './components/Login'
import Main from './components/Main'
import GetInstance from './instance';
import './App.css'

const renderMergedProps = (component, ...rest) => {
  const finalProps = Object.assign({}, ...rest);
  return (
    React.createElement(component, finalProps)
  );
}

const PropsRoute = ({ component, ...rest }) => {
  return (
    <Route {...rest} render={routeProps => {
      return renderMergedProps(component, routeProps, rest);
    }}/>
  );
}

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      username:"",
      password:"",
      url:"",
      prefix:"http://",
      instance:null,
      error:"",
      errorModal:false,
      isLoadingLogin:false
    }
    this.onChangeUrl = this.onChangeUrl.bind(this);
    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.onLogin = this.onLogin.bind(this);
  }

  close = () => this.setState({ errorModal: false })
  onChangePrefix = (prefix) => this.setState({prefix})


  onChangeUsername(username){
    this.setState({username})
  }

  onChangePassword(password){
    this.setState({password})
  }

  onChangeUrl(url){
    this.setState({url})
  }

  onLogin(history){
    let {username,password,url,prefix} = this.state;
    if(username && url){
      let instance = GetInstance(username,password,prefix + url);
      try{
        this.setState({isLoadingLogin:true})
        instance.get('/slx/dynamic/-/accounts?count=1&select=AccountName')
          .then((response)=>{
            this.setState({instance,isLoadingLogin:false},()=>{history.push("/main")})
          })
          .catch((error)=>{
            this.setState({errorModal:true,isLoadingLogin:false,error:`Invalid Url: ${error.message}`})
          })
      }catch(error){
        this.setState({errorModal:true,isLoadingLogin:false,error:`Invalid Url: ${error.message}`})
      }
    }else{
      this.setState({error:"Username and Url are required",errorModal:true})
    }

  }

  render() {
    let {username,password,url,prefix,instance,error,errorModal,isLoadingLogin} = this.state;
    return (
      <div>
        <PropsRoute exact path="/" component={Login} username={username} password={password} url={url} prefix={prefix} isLoadingLogin={isLoadingLogin} onChangeUrl={this.onChangeUrl} onChangeUsername={this.onChangeUsername} onChangePassword={this.onChangePassword} onLogin={this.onLogin} onChangePrefix={this.onChangePrefix} />
        <PropsRoute exact path="/main" component={Main} instance={instance} />
        <Modal size={"tiny"} open={errorModal} onClose={this.close} style={{marginTop:"200px",marginLeft:`${(window.innerWidth - 510)/2}px`}}>
          <Modal.Header>
            Error
          </Modal.Header>
          <Modal.Content>
            {error}
          </Modal.Content>
          <Modal.Actions>
            <Button positive icon='checkmark' labelPosition='right' content='ok' onClick={this.close} />
          </Modal.Actions>
        </Modal>
      </div>
    );
  }
}

export default App;
