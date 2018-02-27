import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import instance from './instance';
import $ from 'jquery';
import materialize from 'materialize-css';
const fs = window.require('fs');


class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      entities:[],
      headers:[],
      records:[]
    }
    this.handleFileUpload = this.handleFileUpload.bind(this);
  }

  componentDidMount(){
    $(document).ready(function() {
      var selects = $('select');
      if(selects){
        $(selects).material_select();
      }
    });
    instance.get('/slx/metadata/-/entities?format=json&select=name,tableName,displayName&count=50&orderby=name asc')
      .then((response) => {
        this.setState({entities:response.data.$resources});
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  handleFileUpload(e) {
    let {files} = e.target;
    if(files && files[0]){
      fs.readFile(files[0].path,'utf-8',  (err, data) => {
        if (err) {
          throw err;
        }
        const csv=require('csvtojson')
        let records = [];
        csv()
        .fromString(data)
        .on('header',(headers)=>{
          this.setState({headers:headers});
        })
        .on('json',(jsonObj)=>{
          records.push(jsonObj);
        })
        .on('done',()=>{
          this.setState({records:records});
        })
      });
    }
  }

  render() {
    let {headers,records,entities} = this.state;
    return (
      <div>
        <div className="input-field col s12">
          <select>
            <option></option>
            {entities.map((entity)=>{
              return (<option value={entity.name} key={entity.name}>{entity.name}</option>)
            })}
          </select>
          <label>Selected Entity</label>
        </div>
        <div className="file-field input-field">
          <div className="btn">
            <span>File</span>
            <input type="file" onChange={this.handleFileUpload} accept=".csv" />
          </div>
          <div className="file-path-wrapper">
            <input className="file-path validate" type="text" />
          </div>
        </div>

        <table className="striped">
          <thead>
            <tr>
              {headers.map((header)=>{
                return (<th key={header}>{header}</th>)
              })}
            </tr>
          </thead>
          <tbody>
            {records.map((record,index)=>{
              return (
                <tr key={index}>
                  {headers.map((header)=><td>{record[header]}</td>)}
                </tr>)
            })}
          </tbody>
        </table>


      </div>
    );
  }
}

export default App;
