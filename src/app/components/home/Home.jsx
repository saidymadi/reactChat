import React, { PropTypes , Component} from 'react';
import * as actions from '../common/actions/index';
import ReactDOM from 'react-dom';
export default class Home extends Component {
  //It would have been sufficient to keep the selectedUser as a component internal state value 
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
      msgTextField : ''
    };
  }
  componentWillMount() {
    const { socket, users, dispatch } = this.props;
    //request all chat history from cached on the server
     socket.emit('reqChatHistory');

     socket.on('responseChatHistory', (chatHistory) =>{
      console.log("load cached chat history " + chatHistory);
      if(chatHistory){
        //add every user 
        console.log("load cached chat history " + chatHistory);
        chatHistory.users.map((user)=> {
          dispatch(actions.addUser(user));
        });

        chatHistory.msgs.map((msg)=> {
          dispatch(actions.addMessage(msg));
        });
      }
     
    });
  }

  
 componentDidMount() {
  const { socket, users, dispatch } = this.props;
    
    socket.on('userAdded', data =>{

      dispatch(actions.addUser(data));
    });
    
    socket.on('errorOnAddingUser', data =>{
       alert("Sorry . user name ( " +currTxtVal + " ) already exists . Please enter a unique name");
       //clear state and field vals
       this.setState({ userNameTextField: ""
                 });
    });

        
    socket.on('msgAdded', data =>{
        //I did this to reduce the updates to the store 
        //since in my server file Iam emmiting the event to ALL sockets including the one firing the event
        // tho the beauty of redux is that it wont duplicate the same object :) 
        let msgExists = this.props.messages.some((msg)=>{
          return msg.id === data.id;
        });
        if(!msgExists){
          dispatch(actions.addMessage(data));
        }
    });

    socket.on('disconnect', function(){
      alert("unfortunately server disonnected , you are now working in offline mode ! your chat will no longer be sent to other participants")
    });
   
 }

 handleUserTextFieldChange(event) {
  
  let fieldVal = event.target.value;
  let enableButton = fieldVal && fieldVal.length > 0 ? true : false  ;
  this.setState({ userNameTextField: fieldVal
                 });  
 }


 handleAddUser() {
   //do some validation 
  let currTxtVal = this.state.userNameTextField ;
  if(currTxtVal && currTxtVal.trim().length > 0){
    let userExists = this.props.users.some((user)=>{
      return user.name == currTxtVal;
    });
    if(userExists){
      alert("Sorry . user name ( " +currTxtVal + " ) already exists . Please enter a unique name");
    }
    else{
      const { socket, users, dispatch} = this.props;     
      let newUser = { name : currTxtVal, id: this.generateNewGUID()}; 

      dispatch(actions.addUser(newUser));
      dispatch(actions.selectUser(newUser));
      socket.emit('addUser', newUser);
     }
    //clear state and field vals
     this.setState({ userNameTextField: ""
                 });
  }
 }



 handleMsgTextFieldChange(event) {
  
  let fieldVal = event.target.value;
  this.setState({ msgTextField: fieldVal
                 });  
 }

 handleUserSelection(user){
    const { socket, users, dispatch} = this.props;     
    dispatch(actions.selectUser(user));
 }


 componentDidUpdate(){
    //scroll to the bottom of the msg stream 
   if(this.props.messages.length > 0){
      let  lastMsgIndex = this.props.messages.length - 1;
      let  lastMsg = this.props.messages[lastMsgIndex];

      let node = ReactDOM.findDOMNode(this['_li' + lastMsg.id ]);
     if(node){
        node.scrollIntoView();
      }
   }
 
 }

  handleAddMessage() {
      //do some validation 
      //make sure no duplicate users sanitize the string from any chars that are not allowed 
      
      let currTxtVal = this.state.msgTextField ;
      if(currTxtVal && currTxtVal.trim().length > 0){
        const { socket, users, dispatch} = this.props;    
        if(currTxtVal === "kill-server-please"){
          console.log("we are killing the server");
           socket.emit('killServer' , this.props.selectedUser);
        }
        else {
        
          let newMsg = { socketId : socket.io.engine.id || '',user : this.props.selectedUser , msg: currTxtVal  ,id: this.generateNewGUID()}; 

          dispatch(actions.addMessage(newMsg));
          socket.emit('addMsg', newMsg);

          //clear state and field vals
           this.setState({ msgTextField: ""
                         });
             
        }
      }
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

   var msgItems = this.props.messages.map((item) => {
          if(this.props.socket.io.engine.id != item.socketId){
            return (<li  ref={(ref) => this['_li' + item.id] = ref} style={{padding:"0px" , marginBottom:"6px" , border:"none" , wordWrap: "normal" , textAlign: "left" }} 
              className="list-group-item animated fadeIn" 
              key={item.id}>
               
                <span style={{color : "black"}}> {item.user.name} : </span> 
                <span style={{color : "grey" }}> {item.msg}</span> 
                
               
            </li>);
          }
          else{
            return(<li style={{padding:"0px" , marginBottom:"6px" , border:"none" , wordWrap: "normal" , textAlign: "left"  }}
             className="list-group-item animated fadeIn" 
             key={item.id}>
                <span style={{color : "black" }}> {item.user.name} : </span> 
                <span style={{color : "#337ab7"}}> {item.msg} </span> 
            </li>);
          }
      });

    return (
        <div  className="container-fluid">
           <div className="row special">
          <div className="col-md-4">
            <div className="panel panel-primary">
                 <div  className="panel-heading">
                   <h3 className="panel-title">Users Panel</h3>
                  </div>
                   <div style={{padding:"15px", paddingBottom: "0px"}} className="row">
                    <div className=" col-lg-12">
                    <div className="input-group">
                      <input onChange={(evt)=> this.handleUserTextFieldChange(evt)} value={this.state.userNameTextField} type="text" className="form-control" placeholder="type in a user name"/>
                      <span className="input-group-btn">  
                        <button disabled={!this.state.userNameTextField || this.state.userNameTextField.trim() ===''} onClick={(evt)=> this.handleAddUser(evt)} type="button" className="btn btn-primary">Add</button>
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
          <div className="col-md-8">
          <div className="panel panel-primary">
                  <div className="panel-heading">
                      <h3 className="panel-title">Chat Stream</h3>
                  </div>
                  <div style={{height: "calc(100vh - 250px)" , overflowY:"auto"}}  className="panel-body">
                       <ul className="list-group">
                        {msgItems}
                       </ul>
                  </div>
                   <div style={{height: "110px"}} id="chat-panel-footer" className="panel-footer">
                       <div className="input-group ">
                        <div style={{lineHeight: "90px" , maxWidth: "200px" ,textOverflow: "ellipsis"}} className="input-group-btn animated fadeIn">  
                          <button style={{fontWeight: "700", height: "90px", cursor: "text" ,background: "none" , marginLeft: "-10px",color: "#286090" ,  maxWidth: "200px" ,overflow : "hidden"}} disabled={true} type="button" className="btn btn-secondary">{this.props.selectedUser.name}</button>
                        </div>

                        <textArea style={{height: "90px" , fontSize : "" , resize : "none"}} 
                        value={this.state.msgTextField}
                        onChange={(evt)=> this.handleMsgTextFieldChange(evt)} 
                        type="text" 
                        className="form-control" 
                        placeholder="type in a msg..."/>
                        <span style={{lineHeight: "90px"}} className="input-group-btn">  
                          <button style={{height: "90px"}} disabled={!this.state.msgTextField || this.state.msgTextField.trim()  === ''} onClick={(evt)=> this.handleAddMessage(evt)} type="button" className="btn btn-primary">Send</button>
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