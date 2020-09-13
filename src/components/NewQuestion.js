import React, { Component } from "react";
import { connect } from "react-redux";
import { handleAddQuestion } from "../actions/questions";

class NewQuestion extends Component {
  state = {
    optionOneText: '',
    optionTwoText: ''
  }

  handlChange = (property, value) => {
    this.setState({[property]: value})
  }
  toHome = () => {
    this.props.history.push('/')
  }
  handleSubmit = (e) => {
    e.preventDefault()

    const {optionOneText, optionTwoText}  = this.state
    this.props.dispatch(handleAddQuestion({optionOneText, optionTwoText, author: this.props.authedUser}, this.toHome))
    this.setState({optionOneText: '', optionTwoText: ''})
  }

  render() {
    const { optionOneText, optionTwoText} = this.state
    return (
      <div className="container">
        <div className="offset-md-2 col-md-8 pt-4">
          <div className="card shadow m-1">
            <h5 className="card-header">Create New Question</h5>
            <div className="card-body">
              <div className="row no-gutters">
                <div className="col-md-8 ml-2">
                  <h5>Would You Rather</h5>
                  <form onSubmit={this.handleSubmit}>
                    <div className="form-group pt-2">
                    <input
                        value={this.state.optionOneText}
                        onChange={e => this.handlChange('optionOneText', e.target.value)}
                        type="text"
                        className="form-control"
                        placeholder="Enter option one text here"
                      />
                    </div>
                    <div className="text-center m-3">OR</div>
                    <div className="form-group">
                      <input
                        value={this.state.optionTwoText}
                        onChange={e => this.handlChange('optionTwoText', e.target.value)}
                        type="text"
                        className="form-control"
                        placeholder="Enter option two text here"
                      />
                    </div>
                    <input type="submit" className="btn btn-secondary" disabled={!(optionOneText && optionTwoText)} value="Submit" />
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps({ authedUser }) {
  return {
    authedUser
  };
}

export default connect(mapStateToProps)(NewQuestion);
