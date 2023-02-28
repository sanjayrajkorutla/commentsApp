// Write your code here
import './index.css'

const CommentItem = props => {
  const {eachCommentInfo, commentsAfterDeleting, toggleIsLiked} = props
  const {
    id,
    name,
    comment,
    time,
    randBackgroundColor,
    isLiked,
  } = eachCommentInfo
  const likeHighLight = isLiked ? '' : 'like-high-light'

  const likeImgUrl = isLiked
    ? 'https://assets.ccbp.in/frontend/react-js/comments-app/like-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/comments-app/liked-img.png'

  const onDeletingComment = () => {
    commentsAfterDeleting(id)
  }
  const onClickingLike = () => {
    toggleIsLiked(id)
  }
  const firstLetter = name[0].toUpperCase()
  return (
    <li>
      <div className="img-name-comment-container">
        <div className={`first-letter ${randBackgroundColor}`}>
          {firstLetter}
        </div>
        <div className="name-comment-container">
          <div className="name-time-container">
            <h1 className="name">{name}</h1>
            <p className="time">{time}</p>
          </div>
          <p className="comment">{comment}</p>
        </div>
      </div>
      <div className="like-delete-container">
        <div className="img-like-container">
          <img src={likeImgUrl} className="like-img" alt="like" />
          <button
            type="button"
            className={`button ${likeHighLight}`}
            onClick={onClickingLike}
          >
            Like
          </button>
        </div>

        <button type="button" onClick={onDeletingComment} data-testid="delete">
          <img
            src="https://assets.ccbp.in/frontend/react-js/comments-app/delete-img.png"
            className="delete-icon"
            alt="delete"
          />
        </button>
      </div>
      <hr />
    </li>
  )
}
export default CommentItem
