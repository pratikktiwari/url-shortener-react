import React from "react";
export default class FooterComponent extends React.Component{
  render(){
    return(
      <div style={{
        textAlign:"center",
        marginTop:"60px"
      }}>
        <p>Developed by: Pratik K Tiwari</p>
        <div>
          &hearts;
        </div>
      </div>
    )
  }
}