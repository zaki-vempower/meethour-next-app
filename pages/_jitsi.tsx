import React, { useEffect } from 'react'
import Jitsi from 'react-jitsi'

export default function jitsi() {
  useEffect(() => {
    document.body.style.overflow = 'hidden'
  },[])
  return (
    <div
    style={{ height: "100vh", width: "100%", border: 0 }}>
            <iframe
  allow="camera; microphone; fullscreen; display-capture; autoplay"
  src="https://meethour.io/zaki"
  style={{ height: "100%", width: "100%", border: 0 }}
/>
    </div>

  )
}
