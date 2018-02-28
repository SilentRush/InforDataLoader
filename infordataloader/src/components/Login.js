import React, { Component } from 'react';
import { Button, Form, Dropdown, Input } from 'semantic-ui-react'

class Login extends Component {
  constructor(props){
    super(props);
  }

  render() {
    let {username,password,url,prefix,onChangeUrl,onChangePassword,onChangeUsername,onLogin,onChangePrefix,isLoadingLogin} = this.props;
    return (
      <Form style={{margin:'20%'}}>
        <Form.Field>
          <label>Username</label>
          <input placeholder='Username' value={username} onChange={(e)=>onChangeUsername(e.target.value)} />
        </Form.Field>
        <Form.Field>
          <Form.Input label='Password' placeholder='Password' type='password' value={password} onChange={(e)=>onChangePassword(e.target.value)} />
        </Form.Field>
        <Form.Field>
          <label>Infor Sdata URL</label>
          <Input
            label={<Dropdown value={prefix} onChange={(e,data)=>onChangePrefix(data.value)} defaultValue='http://' options={[
              { key: 'http://', text: 'http://', value: 'http://' },
              { key: 'https://', text: 'https://', value: 'https://' }
            ]} />}
            labelPosition='left'
            placeholder='Infor Sdata URL'
            value={url} onChange={(e)=>onChangeUrl(e.target.value)}
          />
        </Form.Field>
        <Button type='submit' onClick={()=>onLogin(this.props.history)} loading={isLoadingLogin}>Login</Button>
      </Form>
    );
  }
}

export default Login;
