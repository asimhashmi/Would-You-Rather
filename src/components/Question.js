import React, { Component, Fragment } from 'react'
import { connect }  from 'react-redux'
import { Redirect } from 'react-router-dom'
import { handleAnswerQuestion } from '../actions/questions'

class Question extends Component {
    state = {
      selectedOption: null
    }

    handleOptionChange = (value) => {
      this.setState({selectedOption: value})
    }

    handleSubmit = (e) => {
      e.preventDefault()
      this.props.dispatch(handleAnswerQuestion({qID: this.props.question.id, answer: this.state.selectedOption, authedUser: this.props.authedUser}))
    }

    render() {

				const { author, question, answer, loading } = this.props
				const {optionOne, optionTwo} = question || {}
				const totalVotes = question && optionOne.votes.length + optionTwo.votes.length
				const optionOneVotes = question && optionOne.votes.length
        const optionTwoVotes = question && optionTwo.votes.length
        
        return (
					<Fragment>
            {loading === 0 && !question && <Redirect to="/not-found"></Redirect> }
						{loading === 0 && <div className="container-fluid">
							<div className="col-8 offset-2 pt-4">
							  <div className="card shadow">
							    <h5 className="card-header">{author && author.name} asks:</h5>
							    <div className="card-body">
							      <div className="row no-gutters">
									    <div className="col-md-3 border-right pr-3">
										    <img src={author ?  author.avatarURL : undefined } className="card-img" alt="avatar" />
									    </div>
									    {!answer && <div className="col-md-6 ml-2">
										<h3 className="font-weight-bold">Would You Rather</h3>
										<form className="form" onSubmit={this.handleSubmit}>
										<div className="form-check">
											<input checked={this.state.selectedOption === 'optionOne'} className="form-check-input" type="radio" onChange={(e) => this.handleOptionChange(e.target.value)} name="optionRadios" id="optionOne" value="optionOne" />
											<label className="form-check-label" htmlFor="optionOne">
												{question && question.optionOne.text}
											</label>
											</div>
										<div className="form-check">
											<input checked={this.state.selectedOption === 'optionTwo'} className="form-check-input" type="radio" onChange={(e) => this.handleOptionChange(e.target.value)} name="optionRadios" id="optionTwo" value="optionTwo" />
											<label className="form-check-label" htmlFor="optionTwo">
											{question && question.optionTwo.text}
											</label>
										</div>
										<div className="pt-3">
											<button type="submit" disabled={!this.state.selectedOption} className="btn btn-secondary">Submit</button>
										</div>
									</form>
									</div>}
									    {answer && <div className="col-md-8 ml-2">
                        <h5 className="font-weight-bold">Results</h5>

                        <div className="row w-100">
                          <div className="col-sm-12 mb-2">
                            <div className="card">
                            { answer === 'optionOne' && <div className="ribbon-wrapper">
                                <div className="ribbon green">your choice</div>
                              </div>}
                              <div className="card-body">
                                <h5 className="card-title">Would you rather {question && optionOne.text}?</h5>
                                <div className="card-text">
                                  <div className="progress">
                                    <div className="progress-bar bg-success" role="progressbar" style={{width: `${Math.round(optionOneVotes/totalVotes*100.0)}%`}}>{Math.round(optionOneVotes/totalVotes*100.0)}%</div>
                                  </div>
                                  {optionOne && <span>({optionOneVotes} of {totalVotes} votes)</span>}
                                </div>                         
                              </div>
                            </div>
                          </div>
                          <div className="col-sm-12">
                            <div className="card">
                              { answer === 'optionTwo' && <div className="ribbon-wrapper">
                                <div className="ribbon green">your choice</div>
                              </div>}
                              <div className="card-body">

                                <h5 className="card-title">Would you rather {question && optionTwo.text}?</h5>
                                <div className="card-text">
                                  <div className="progress">
                                    <div className="progress-bar bg-success" role="progressbar" style={{width: `${Math.round(optionTwoVotes/totalVotes*100.0)}%`}} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">{Math.round(optionTwoVotes/totalVotes*100.0)}%</div>
                                  </div>
                                  {optionTwo && <span>({optionTwo.votes.length} of {optionOne.votes.length + optionTwo.votes.length} votes)</span>}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>}
                    </div>
                  </div>
                </div>
              </div>
            </div>}
					</Fragment>
        )
    }
}

function mapStateToProps({questions, users, loadingBar, authedUser}, {id}) {
    const currentUser = users[authedUser]
    const question = questions[id]
		const author = question !== undefined && users[question.author]
		const alreadyAnswered = currentUser !== undefined && Object.keys(currentUser.answers).find( qID => qID === id)

    return {
				loading: loadingBar.default,
        author: author,
        answer: alreadyAnswered && currentUser.answers[alreadyAnswered],
        question,
        authedUser
    }
}

export default connect(mapStateToProps)(Question)
