import { NextRouter, useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
import { MEETHOUR_LINK, STATIC_ROOM } from '../../utils/contants';
import { parseURLParams } from '../../utils/parseUrl'

interface stateTypes {
  mt: string | null;
  isLoading: boolean;
  room: string | null;
  link: string;

}

const stateM = {
  mt: null,
  isLoading: false,
  room: null,
  link: ''
}


const removeQueryParam = (param,router: NextRouter) => {
    const { pathname, query } = router;
    const params = new URLSearchParams(query);
    param && params.delete(param);
    router.replace(
        { pathname, query: params.toString() },
        undefined, 
        { shallow: true }
    );
};



export default function Room() {
  const router = useRouter();
  const [state,setState] =  useState<stateTypes>(stateM)
  const { room } = router.query
  React.useEffect(() => {
    setState(prev => ({
      ...prev,
      isLoading:!prev.isLoading
    }))
    const isMt = parseURLParams(window.location.href, true, 'search')
    if('mt' in isMt){
    //   removeQueryParam(undefined,router);
      const linkMH = room ? MEETHOUR_LINK + '/' + room + '?mt=' + isMt['mt'] : MEETHOUR_LINK + '/' + STATIC_ROOM + '?mt=' + isMt['mt']
      setTimeout(() => {
        setState(prev => ({
          ...prev,
          mt: isMt['mt'],
          link: linkMH,
          isLoading: false
        }))

      },1000)

    } else {
        const linkMH = room ? MEETHOUR_LINK + '/' + room : MEETHOUR_LINK + '/' + STATIC_ROOM
        setTimeout(() => {
          setState(prev => ({
            ...prev,
            link: linkMH,
            isLoading: false
          }))
  
        },1000)
    }
  },[room])

  useEffect(() => {
    document.body.style.overflow = 'hidden'
  },[])

  if(state.isLoading){
    return <div>Loading...</div>
  }

  console.log('linkMH',state.link)

  return (
    <div
    style={{ height: "100vh", width: "100%", border: 0 }}>
            <iframe
  allow="camera; microphone; fullscreen; display-capture; autoplay"
  src={state.link}
  key={state.link}
  style={{ height: "100%", width: "100%", border: 0 }}
/>
    </div>

  )
}
