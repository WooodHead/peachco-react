import React from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router'
import "./LinkButton.css";

const LinkButton = (props) => {
  const {
    history,
    location,
    match,
    staticContext,
    to,
    onClick,
    type,
    id,
    // ⬆ filtering out props that `button` doesn’t know what to do with.
    ...rest
  } = props
  return (
    <button className="button"
      {...rest} // `children` is just another prop!
      onClick={(event) => {
        onClick && onClick(event)
        history.push(to, {type: type, id: id})
      }}
    />
  )
}

LinkButton.propTypes = {
  to: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  type: PropTypes.node.isRequired,
  id: PropTypes.node.isRequired
}

export default withRouter(LinkButton);