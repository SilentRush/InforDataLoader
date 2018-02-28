import React, { Component } from 'react';
import {QuerySdata,ProcessBatch} from '../SdataHelper';
import { Dropdown,Input,Table,List, Label,Button,Grid,Progress,Modal,Accordion, Icon,Menu } from 'semantic-ui-react'
import _ from 'lodash'
import json2csv from 'json2csv';
import NumericInput from 'react-numeric-input';

const fs = window.require('fs');


class Main extends Component {
  constructor(props){
    super(props);
    this.state = {
      entities:[],
      headers:[],
      records:[],
      recordResults:[],
      properties:[],
      selectedEntity:"",
      isLoading:false,
      progressPercentage:0,
      activeIndex:-1,
      recordsIndex:0,
      batchsize:25
    }
    this.handleFileUpload = this.handleFileUpload.bind(this);
    this.onSelectEntity = this.onSelectEntity.bind(this);
    this.getEntityProperties = this.getEntityProperties.bind(this);
    this.onSelectProperty = this.onSelectProperty.bind(this);
    this.batchInsert = this.batchInsert.bind(this);
    this.batchUpdate = this.batchUpdate.bind(this);
    this.batchDelete = this.batchDelete.bind(this);
    this.clear = this.clear.bind(this);
    this.updateRecord = this.updateRecord.bind(this);
    this.exportResults = this.exportResults.bind(this);
  }

  handleClick = (e, titleProps) => {
    const { index } = titleProps
    const { activeIndex } = this.state
    const newIndex = activeIndex === index ? -1 : index

    this.setState({ activeIndex: newIndex })
  }

  batchDelete(){
    let {instance} = this.props;
    let {records,headers,selectedEntity,entities,batchsize} = this.state;
    let entity = entities.find((entity)=>entity.name === selectedEntity);
    let mappedArray = records.map((rec)=>{
      let record = {$httpMethod:"DELETE"};
      headers.forEach((header)=>{
        record[(header.isKey) ? "$key" : header.property] = rec[header.header];
      })
      return record;
    });
    this.setState({isLoading:true});
    ProcessBatch(instance,`/slx/dynamic/-/${entity.sdata.pathName}/$batch?format=json`,mappedArray,mappedArray.length,batchsize,[],{success:(result)=>{
      let recordResults = result.map((res)=>{
        return {id:res.$key,created:(res.$httpMethod === "PUT" && res.$httpStatus === 200),success:(res.$httpStatus === 200),error:(res.$diagnoses) ? res.$diagnoses[0] : ""};
      })
      this.setState({isLoading:false,recordResults,activeIndex:2,progressPercentage:0});
    },failure:(error)=>{
      this.setState({isLoading:false,recordResults:[]});
      console.log(error);
    },progress:(progress)=>{
      this.setState({progressPercentage:progress});
    }});
  }

  batchUpdate(){
    let {instance} = this.props;
    let {records,headers,selectedEntity,entities,batchsize} = this.state;
    let entity = entities.find((entity)=>entity.name === selectedEntity);
    let mappedArray = records.map((rec)=>{
      let record = {$httpMethod:"PUT"};
      headers.forEach((header)=>{
        record[(header.isKey) ? "$key" : header.property] = rec[header.header];
      })
      return record;
    });
    this.setState({isLoading:true});
    ProcessBatch(instance,`/slx/dynamic/-/${entity.sdata.pathName}/$batch?format=json`,mappedArray,mappedArray.length,batchsize,[],{success:(result)=>{
      let recordResults = result.map((res)=>{
        return {id:res.$key,created:(res.$httpMethod === "PUT" && res.$httpStatus === 200),success:(res.$httpStatus === 200),error:(res.$diagnoses) ? res.$diagnoses[0] : ""};
      })
      this.setState({isLoading:false,recordResults,activeIndex:2,progressPercentage:0});
    },failure:(error)=>{
      this.setState({isLoading:false,recordResults:[]});
      console.log(error);
    },progress:(progress)=>{
      this.setState({progressPercentage:progress});
    }});
  }

  batchInsert(){
    let {instance} = this.props;
    let {records,headers,selectedEntity,entities,batchsize} = this.state;
    let entity = entities.find((entity)=>entity.name === selectedEntity);
    let mappedArray = records.map((rec)=>{
      let record = {$httpMethod:"POST"};
      headers.forEach((header)=>{
        record[header.property] = rec[header.header];
      })
      return record;
    });
    this.setState({isLoading:true});
    ProcessBatch(instance,`/slx/dynamic/-/${entity.sdata.pathName}/$batch?format=json`,mappedArray,mappedArray.length,batchsize,[],{success:(result)=>{
      let recordResults = result.map((res)=>{
        return {id:res.$key,created:(res.$httpMethod === "PUT" && res.$httpStatus === 200),success:(res.$httpStatus === 200),error:(res.$diagnoses) ? res.$diagnoses[0] : ""};
      })
      this.setState({isLoading:false,recordResults,activeIndex:2,progressPercentage:0});
    },failure:(error)=>{
      this.setState({isLoading:false,recordResults:[]});
      console.log(error);
    },progress:(progress)=>{
      this.setState({progressPercentage:progress});
    }});
  }

  onSelectEntity(e,data){
    this.getEntityProperties(data.value);
    this.setState({selectedEntity:data.value});
  }

  onSelectProperty(property,index){
    let {headers,properties} = this.state;
    let p = properties.find((prop)=>prop.propertyName === property);
    headers[index].property = property;
    headers[index].isKey = p.isKey;
    this.setState({headers});
  }

  getEntityProperties(selectedEntity){
    let {instance} = this.props;
    QuerySdata(instance,`/slx/metadata/-/entities('${selectedEntity}')/properties?format=json&count=50&where=isReadOnly eq false&select=propertyName,isKey&orderby=propertyName asc`,[],{success:(result)=>{
      this.setState({properties:result});
    },failure:(error)=>{
      console.log(error);
      this.setState({properties:[]});
    }});
  }

  updateRecord(value,prop,index){
    let {records} = this.state;
    let recs = [...records];
    recs[index][prop] = value;
    this.setState({records:recs});
  }

  componentDidMount(){
    let {instance} = this.props;
    QuerySdata(instance,'/slx/metadata/-/entities?format=json&select=name,tableName,displayName,sdata/pathName&count=50&orderby=name asc',[],{success:(result)=>{
      this.setState({entities:result});
    },failure:(error)=>{
      console.log(error);
      this.setState({entities:[]});
    }});
  }

  clear(){
    document.getElementById('file-input').value = null;
    this.setState({records:[],headers:[],recordResults:[]});
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
          this.setState({headers:headers.map((header)=>{return {header:header,property:""}}),activeIndex:0});
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

  exportResults(){
    let {recordResults,headers} = this.state;
    var fields = ['id','success','created','error'];
    var data = recordResults.map((rec)=>{return {...rec,error:(rec.error) ? rec.error.message : ""}})
    const Json2csvParser = require('json2csv').Parser;
    const json2csvParser = new Json2csvParser({ fields });
    var csv = json2csvParser.parse(data);
    let file = new Blob([csv], { type: 'data:text/csv;charset=utf-8' });
    if (window.navigator.msSaveOrOpenBlob) // IE10+
        window.navigator.msSaveOrOpenBlob(file, 'result.csv');
    else { // Others
      var url = URL.createObjectURL(file);
      var link = document.createElement("a");
      link.setAttribute("href", url);
      link.setAttribute("download", "result.csv");
      document.body.appendChild(link); // Required for FF

      link.click();
      document.body.removeChild(link);
    }
  }

  render() {
    let {headers,records,entities,selectedEntity,properties,recordResults,activeIndex,recordsIndex,batchsize} = this.state;
    let selectedProperties = headers.filter((header)=>header.property).map((header)=>header.property);
    return (
      <div style={{margin:'10px'}}>
        <Grid columns={2}>
          <Grid.Row>
            <Grid.Column>
              <Label style={{fontSize:'16px'}}>Selected Entity:</Label>
              <Dropdown label="Selected Entity" value={selectedEntity} onChange={this.onSelectEntity} placeholder='Select Entity' search selection options={entities.map((entity)=>{
                return {key:entity.name,value: entity.name, text: entity.name}
              })} />
            </Grid.Column>
            <Grid.Column>
              <Label style={{fontSize:'16px'}}>File:</Label>
              <Input type="file" onChange={this.handleFileUpload} input={<input type="file"  accept=".csv" id='file-input' />} />
              <Button color='orange' onClick={this.clear}>Clear</Button>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column width={16}>
            <Accordion styled style={{width:"100%"}}>
              <Accordion.Title active={activeIndex === 0} index={0} onClick={this.handleClick}>
                <Icon name='dropdown' />
                Column Headers ({headers.length})
              </Accordion.Title>
              <Accordion.Content active={activeIndex === 0}>
                <List celled>
                  {headers.map((header,index)=>{
                    return (
                      <List.Item key={header.header + index}>
                        <List.Content style={{padding:0}}>
                          <Label pointing='right' horizontal style={{fontSize:"16px"}}>{header.header}</Label>
                          <Dropdown placeholder='Select Property' value={header.property} onChange={(e,data)=>this.onSelectProperty(data.value,index)} search selection options={properties.filter((property)=>header.property == property.propertyName || !selectedProperties.includes(property.propertyName)).map((property)=>{
                            return {key:property.propertyName,value: property.propertyName, text: property.propertyName}
                          })} />
                        </List.Content>
                      </List.Item>
                    )
                  })}
                </List>
              </Accordion.Content>
              <Accordion.Title active={activeIndex === 1} index={1} onClick={this.handleClick}>
                <Icon name='dropdown' />
                Records ({records.length})
              </Accordion.Title>
              <Accordion.Content active={activeIndex === 1}>
              {activeIndex === 1 &&
                <Table celled striped className="tableBodyScroll">
                  <Table.Header>
                    <Table.Row>
                      <Table.HeaderCell style={{width:"50px"}}>#</Table.HeaderCell>
                      {headers.map((header,index)=>{
                        return (<Table.HeaderCell key={header.header + index}>{header.header} {(header.property) && <span style={{fontSize:11}}>({header.property})</span>}</Table.HeaderCell>)
                      })}
                    </Table.Row>
                  </Table.Header>

                  <Table.Body>
                    {records.slice(recordsIndex * 25, (recordsIndex * 25 + 26)).map((record,index)=>{
                      return (
                        <Table.Row key={record[headers[0].header] + index}>
                          <Table.Cell style={{width:"50px"}}>{index + 1}</Table.Cell>
                          {headers.map((header,i)=>(
                            <Table.Cell key={`${record[header.header]} ${index} ${i}`}>
                              <input style={{width:"100%",border:0}} defaultValue={record[header.header]} onBlur={(e)=>{this.updateRecord(e.target.value,header.header,index)}} />
                            </Table.Cell>)
                          )}
                        </Table.Row>)
                    })}
                  </Table.Body>
                  <Table.Footer>
                    <Table.Row>
                      <Table.HeaderCell colSpan='3'>
                        <Menu floated='right' pagination>
                          <Menu.Item as='a' icon>
                            <Icon name='chevron left' />
                          </Menu.Item>
                          {_.times((records.length / 25) || 1,(index)=>{
                            return <Menu.Item as='a' key={index} onClick={()=>this.setState({recordsIndex:index})}>{index + 1}</Menu.Item>
                          })}
                          <Menu.Item as='a' icon>
                            <Icon name='chevron right' />
                          </Menu.Item>
                        </Menu>
                      </Table.HeaderCell>
                    </Table.Row>
                  </Table.Footer>
                </Table>
              }
              </Accordion.Content>
              <Accordion.Title active={activeIndex === 2} index={2} onClick={this.handleClick}>
                <Icon name='dropdown' />
                Records Result ({recordResults.length})
              </Accordion.Title>

              <Accordion.Content active={activeIndex === 2}>
                {activeIndex === 2 &&
                  <Grid columns={1}>
                    <Grid.Row>
                      <Grid.Column>
                        <Table celled striped className="tableBodyScroll">
                          <Table.Header>
                            <Table.Row>
                              <Table.HeaderCell style={{width:"50px"}}>#</Table.HeaderCell>
                              <Table.HeaderCell>Id</Table.HeaderCell>
                              <Table.HeaderCell>Success</Table.HeaderCell>
                              <Table.HeaderCell>Created</Table.HeaderCell>
                              <Table.HeaderCell>Error</Table.HeaderCell>
                            </Table.Row>
                          </Table.Header>

                          <Table.Body>
                            {recordResults.map((record,index)=>{
                              return (
                                <Table.Row key={index} className={(!record.success) ? "error" : ""}>
                                  <Table.Cell style={{width:"50px"}}>{index + 1}</Table.Cell>
                                  <Table.Cell>{record.id}</Table.Cell>
                                  <Table.Cell>{record.success ? "true" : "false"}</Table.Cell>
                                  <Table.Cell>{record.created ? "true" : "false"}</Table.Cell>
                                  <Table.Cell>{record.error && record.error.message}</Table.Cell>
                                </Table.Row>)
                            })}
                          </Table.Body>
                        </Table>
                      </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                      <Grid.Column>
                        <Button color='green' onClick={this.exportResults}>Export to Csv</Button>
                      </Grid.Column>
                    </Grid.Row>
                  </Grid>
                }
              </Accordion.Content>
            </Accordion>
          </Grid.Column>
        </Grid.Row>
          {selectedEntity &&
          <Grid.Row>
            <Grid.Column width={16} floated='right' textAlign='right'>
              <Input labelPosition='left' label="Batch Size" type="number" input={<NumericInput style={{input: {height: '100%'}}} min={0} max={200} value={50} valueAsNumber onChange={(b)=>this.setState({batchsize:b})}  value={batchsize} />} />
              <Button color='teal' onClick={this.batchInsert}>Insert</Button>
              <Button color='purple' onClick={this.batchUpdate}>Update</Button>
              <Button color='red' onClick={this.batchDelete}>Delete</Button>
            </Grid.Column>
          </Grid.Row>
          }

        </Grid>
        <Modal
          size="fullscreen"
          open={this.state.isLoading}
          style={{marginTop:"200px"}}
          basic
        >
          <Modal.Content>
            <Progress percent={this.state.progressPercentage} indicating color='blue' progress />
          </Modal.Content>
        </Modal>
        <Button onClick={()=>this.props.history.push('/')}>Logout</Button>
      </div>
    );
  }
}

export default Main;
