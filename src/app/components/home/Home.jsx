import React, { PropTypes , Component} from 'react';
import * as actions from '../common/actions/index';

export default class Home extends Component {

  static propTypes = {
    messages: PropTypes.array.isRequired,
    users: PropTypes.array.isRequired,
    selectedUser: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired
  };

  constructor(props, context) {
    super(props , context);

    this.state = {
      userNameTextField: '',
      userBtnStatus: false
    };
  }

 componentDidMount() {

  const { socket, users, dispatch } = this.props;

   // socket.emit('reqChatHistory');
    
    socket.on('userAdded', data =>{
      console("i will add the new user "+data)
      dispatch(actions.addUser(data));
    //  dispatch(actions.selectUser(user));
    });

   

    socket.on('respChatHistory', (chatInfo) =>{
      if(chatInfo){
        //add every user 
        console.log("Saeed" + chatInfo);
        chatInfo.users.filter((user)=> {
          dispatch(actions.addUser(user));
        });
      }
     
    });

 }

 handleAddUser() {
  //do some validation 
  //make sure no duplicate users sanitize the string from any chars that are not allowed 


  const { socket, users, dispatch} = this.props;     
  let newUser = { name : this.state.userNameTextField , id: this.generateNewGUID()}; 

  dispatch(actions.addUser(newUser));
  dispatch(actions.selectUser(newUser));
  socket.emit('addUser', newUser);

  //clear state and field vals
   this.setState({ userNameTextField: "",
                    userBtnStatus: false
                 });
     

 }
 handleUserSelection(user){
    const { socket, users, dispatch} = this.props;     
  
    
    dispatch(actions.selectUser(user));
 }
 

 handleUserTextFieldChange(event) {

  let fieldVal = event.target.value;
  let enableButton = fieldVal && fieldVal.length > 0 ? true : false  ;
  this.setState({ userNameTextField: fieldVal,
                    userBtnStatus: enableButton
                 });

    
 }

  render(){

    var listItems = this.props.users.map((item) => {
  

        if(this.props.selectedUser.id != item.id){
          return (<li style={{padding:"0px" , marginBottom:"6px" , border:"none"}} className="list-group-item animated fadeIn" key={item.id}>
             <button   onClick={()=> this.handleUserSelection(item)}  style={{width: "100%"}} className="btn btn-secondary">  {item.name}</button>
          </li>);
        }
        else{
          return(
           <li style={{padding:"0px" , marginBottom:"6px", border:"none"}} className="list-group-item animated fadeIn" key={item.id}>
            <button  onClick={()=> this.handleUserSelection(item)} style={{width: "100%"}} className="btn btn-primary">  {item.name}</button>
          </li>);
        }
   
    });


    return (
        <div className="container-fluid">
           <div className="row">
          <div className="col-md-3">
            <div className="panel panel-primary">
                 <div  className="panel-heading">
                   <h3 className="panel-title">Users Panel</h3>
                  </div>
                   <div style={{padding:"15px", paddingBottom: "0px"}} className="row">
                    <div className=" col-lg-12">
                    <div className="input-group">
                      <input onChange={(evt)=> this.handleUserTextFieldChange(evt)} value={this.state.userNameTextField} type="text" className="form-control" placeholder="type in a user name"/>
                      <span className="input-group-btn">  
                        <button disabled={!this.state.userBtnStatus} onClick={(evt)=> this.handleAddUser(evt)} type="button" className="btn btn-primary">Add</button>
                      </span>
                    </div>
                    </div>
                  </div>
                 <div style={{height: "calc(100vh - 200px)" , overflowY:"auto", paddingTop: "0px"}} className="panel-body">
                 
                    <div style={{color:"grey" , fontWeight:"700", marginTop:"15px", borderBottom:"1px solid lightgrey "}} ><h3 className="panel-title">Select a user and chat on their behalf</h3></div>
                    <div style={{marginTop:"10px"}}>
                       <ul className="list-group">
                        {listItems}
                       </ul>
                    </div>
                  </div>
                 
              </div>
          </div>

          <div className="col-md-9">
          <div className="panel panel-primary">
                  <div className="panel-heading">
                      <h3 className="panel-title">Chat Stream</h3>
                  </div>
                  <div style={{height: "calc(100vh - 250px)" , overflowY:"auto"}}  className="panel-body">
                      Panel content
                  </div>
                   <div style={{height: "110px"}} id="chat-panel-footer" className="panel-footer">
                       <div className="input-group ">
                        <span style={{lineHeight: "90px"}} className="input-group-btn animated fadeIn">  
                          <button style={{fontWeight: "700", height: "90px", cursor: "text" ,background: "none" , marginLeft: "-10px",color: "#286090"}} disabled={true} type="button" className="btn btn-secondary">{this.props.selectedUser.name}</button>
                        </span>

                        <textArea style={{height: "90px" , fontSize : ""}} onChange={this.handleUserTextFieldChange.bind(this)} type="text" className="form-control" placeholder="type in a msg..."/>
                        <span style={{lineHeight: "90px"}} className="input-group-btn">  
                          <button style={{height: "90px"}} disabled={!this.state.userBtnStatus} onClick={this.handleAddUser.bind(this)} type="button" className="btn btn-primary">Send</button>
                        </span>
                      </div>

                  </div>
              </div>
            </div>
          </div>
       
        </div>
    );
  }

 generateNewGUID() {
            function s4() {
                return Math.floor((1 + Math.random()) * 0x10000)
                    .toString(16)
                    .substring(1);
            }
            return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
                s4() + '-' + s4() + s4() + s4();
  }


}