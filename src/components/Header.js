import React from "react";
import LoadingBar from 'react-redux-loading-bar'
 
export default class Header extends React.Component {
  render() {
    return (
        <LoadingBar upateTime={100} showFastActions style={{backgroundColor: 'black', height: '10px'}} />
    )
  }
}