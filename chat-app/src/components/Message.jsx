import PropTypes from 'prop-types'

const Message = ({ message = null }) => {
  return (
    <div className="message">
      <div>
        <span className="user">{message.user}</span>
        <span className="time">{message.time}</span>
      </div>
      <div>{message.text}</div>
    </div>
  )
}

// Validate the props
Message.propTypes = {
  message: PropTypes.shape({
    user: PropTypes.string,
    time: PropTypes.string,
    text: PropTypes.string,
  })
}

export default Message