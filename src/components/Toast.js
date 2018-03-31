import React from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import { fadeInOut } from 'styled-animate'

const Notification = styled.div`
  border: 1px solid brown;
  position: fixed;
  top: 10;
  right: 10;
`

const AnimatedNotification = fadeInOut(Notification, '500ms linear')

const Toast = ({ message, visible }) => (
  <div>
    <AnimatedNotification data-testid="notification" in={visible}>
      {message}
    </AnimatedNotification>
  </div>
)

export default connect(({ notifications: { message, visible } }) => ({
  message,
  visible
}))(Toast)
