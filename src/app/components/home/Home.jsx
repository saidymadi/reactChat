import React, { PropTypes , Component} from 'react';


export default class Home extends Component {

  static propTypes = {
    messages: PropTypes.array.isRequired,
    user: PropTypes.object.isRequired,
    socket: PropTypes.object.isRequired
  };
  constructor(props) {
    super(props);
    
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
                        <input type="text" className="form-control" placeholder="type in a user name"/>
                        <span className="input-group-btn">  
                          <button type="button" className="btn btn-primary">Add</button>
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

}