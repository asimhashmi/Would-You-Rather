import React, { Component } from 'react'
import { connect } from 'react-redux';
import LeaderBoardCard from './LeaderBoardCard';

class LeaderBoard extends Component {
    render() {
        return (
            <div className="container">
              <div className="col-md-6 offset-md-3 pt-4">
                <ul className="list-group">
                 {this.props.userIDs.map( uid => (
                   <LeaderBoardCard key={uid} id={uid} />
                 ))}              
               </ul>

               </div>
             </div>
        )
    }
}

function mapStateToProps({ users, loadingBar }) {
  const userIDs = Object.keys(users)
  .sort((a, b) => {
    const aTotalCount = users[a].questions.length + Object.keys(users[a].answers).length
    const bTotalCount = users[b].questions.length + Object.keys(users[b].answers).length
    return  bTotalCount - aTotalCount
  })

  return {userIDs, loading: loadingBar.default}
}

export default connect(mapStateToProps)(LeaderBoard)