'use client'

import React from 'react'
import Store from './store'
import { Provider } from 'react-redux'


export default function Prov({children}) {
  return (

      <Provider store={Store}>
        {children}
      </Provider>
  )
}
