import React, {Component} from 'react'
import { connect } from 'react-redux';


class VoteScore extends Component{


    scoreChange=function(e){
        console.log(e.target.value);
       var isScoreUp =e.target.value
       this.props.dispatch(this.props.action({id:this.props.id, isScoreUp:isScoreUp}))
    }

    render(){
        return (
            <div className= "vote-score">
                <span>{this.props.score}</span>
                <button onClick={(e)=>this.scoreChange(e) } value={true}>up</button>
                <button onClick={(e)=>this.scoreChange(e)} value={false}>down</button>
            </div>
        )
    }

}


  
export default connect() (VoteScore)