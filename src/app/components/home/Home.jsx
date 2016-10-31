import React, { PropTypes , Component} from 'react';
import * as actions from '../common/actions/index';

export default class Home extends Component {

  static propTypes = {
    messages: PropTypes.array.isRequired,
    users: PropTypes.array.isRequired,
    selectedUserId: PropTypes.string.isRequired,
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
  socket.on('userAdded', user =>{
      dispatch(actions.addUser(user));
    });
    socket.on('loadChatStream', data =>{
      console.log("helllllo" + data)
      dispatch(actions.addUser(user));
    });

 }

 handleAddUser() {

  const { socket, users, dispatch} = this.props;     
  let newUser ={name : this.state.userNameTextField , id: this.generateNewGUID()}; 
 
  debugger;
  dispatch(actions.addUser(newUser));
 // dispatch(actions.selectUser(newUser));
  socket.emit('addUser', newUser);

 }

 handleUserTextFieldChange(event) {

  let fieldVal = event.target.value;
  let enableButton = fieldVal && fieldVal.length > 0 ? true : false  ;
  this.setState({ userNameTextField: fieldVal,
                    userBtnStatus: enableButton
                 });
    
 }

  render(){
    return (
        <div className="container-fluid">
           <div className="row">
          <div className="col-md-6">
            <div className="panel panel-primary">
                 <div className="panel-heading">
                   <h3 className="panel-title">Users Panel</h3>
                  </div>
                 <div className="panel-body">
                    <div className="row">
                      <div className="col-offset-3 col-lg-6">
                      <div className="input-group">
                        <input onChange={this.handleUserTextFieldChange.bind(this)} type="text" className="form-control" placeholder="type in a user name"/>
                        <span className="input-group-btn">  
                          <button disabled={!this.state.userBtnStatus} onClick={this.handleAddUser.bind(this)} type="button" className="btn btn-primary">Add</button>
                        </span>
                    
                      </div>
                      </div>
                    </div>
                  </div>
              </div>
          </div>

          <div className="col-md-6">
          <div className="panel panel-primary">
                  <div className="panel-heading">
                      <h3 className="panel-title">Chat Stream</h3>
                  </div>
                  <div className="panel-body">
                      Panel content
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