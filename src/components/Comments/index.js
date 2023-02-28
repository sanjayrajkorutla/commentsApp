// Write your code here
import {Component} from 'react'
import {v4} from 'uuid'
import {formatDistanceToNow} from 'date-fns'
import CommentItem from '../CommentItem'

import './index.css'

const commentsImgUrl =
  'https://assets.ccbp.in/frontend/react-js/comments-app/comments-img.png '

const initialContainerBackgroundClassNames = [
  'amber',
  'blue',
  'orange',
  'emerald',
  'teal',
  'red',
  'light-blue',
]
class Comments extends Component {
  state = {
    commentsList: [],
    nameTitle: '',
    commentsDetails: '',
  }

  onChangeNameInput = event => {
    this.setState({nameTitle: event.target.value})
  }

  onChangeTextAreaInput = event => {
    this.setState({commentsDetails: event.target.value})
  }

  onAddingComment = event => {
    event.preventDefault()
    const {nameTitle, commentsDetails} = this.state
    const timeNow = new Date()
    const timeGap = formatDistanceToNow(timeNow)
    const randomColor =
      initialContainerBackgroundClassNames[
        Math.floor(Math.random() * initialContainerBackgroundClassNames.length)
      ]
    const commentInfo = {
      id: v4(),
      name: nameTitle,
      comment: commentsDetails,
      time: timeGap,
      randBackgroundColor: randomColor,
      isLiked: true,
    }
    this.setState(prevState => ({
      commentsList: [...prevState.commentsList, commentInfo],
      nameTitle: '',
      commentsDetails: '',
    }))
  }

  commentsAfterDeleting = id => {
    const {commentsList} = this.state
    const newCommentsList = commentsList.filter(
      eachComment => eachComment.id !== id,
    )
    this.setState({commentsList: newCommentsList})
  }

  toggleIsLiked = id => {
    this.setState(prevState => ({
      commentsList: prevState.commentsList.map(eachComment => {
        if (id === eachComment.id) {
          return {...eachComment, isLiked: !eachComment.isLiked}
        }
        return eachComment
      }),
    }))
  }

  render() {
    const {commentsList, nameTitle, commentsDetails} = this.state
    const count = commentsList.length
    return (
      <div className="main-container">
        <h1 className="main-heading">Comments</h1>
        <form className="sub-container1" onSubmit={this.onAddingComment}>
          <div className="input-elements-container">
            <p className="say-something-para">
              Say something about 4.0 Technologies
            </p>
            <input
              type="text"
              value={nameTitle}
              onChange={this.onChangeNameInput}
              className="input"
              placeholder="Your Name"
            />
            <textarea
              rows="10"
              cols="40"
              className="text-area-element"
              onChange={this.onChangeTextAreaInput}
              value={commentsDetails}
              placeholder="Your Comment"
            />
            <button type="submit" className="add-button">
              Add Comment
            </button>
          </div>
          <img src={commentsImgUrl} className="main-img" alt="comments" />
        </form>
        <hr />
        <div className="comments-count-container">
          <div className="count">{count}</div>
          <p className="comments-para">Comments</p>
        </div>
        <ul>
          {commentsList.map(eachCommentInfo => (
            <CommentItem
              eachCommentInfo={eachCommentInfo}
              commentsAfterDeleting={this.commentsAfterDeleting}
              toggleIsLiked={this.toggleIsLiked}
              key={eachCommentInfo.id}
            />
          ))}
        </ul>
      </div>
    )
  }
}
export default Comments
