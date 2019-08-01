import React from 'react'

import Assessment from '@material-ui/icons/Assessment'
import Dashboard from '@material-ui/icons/Dashboard'

// List of all route and its name and link
export const route = [
  {
    name: 'Dashboard',
    link: '/',
    icon: <Dashboard />
  },
  {
    name: 'Recap',
    link: '/recap',
    icon: <Assessment />
  }
]

// Websocket address for data streaming in dashboard
export const wsAddress = 'wss://backend-deteksifraud.herokuapp.com/ulb/predict/'

// Rest API address for fetching data in recap
export const restAddress = 'http://backend-deteksifraud.herokuapp.com/ulb/api/labeled-list/fraud/'

// List of columns that will be used
export const tableColumns = [
  {
    "title": "Timestamps",
    "field": "Timestamps",
    "defaultSort": "desc",
  },
  {
    "title": "Detect",
    "field": "Detect",
  },
  {
    "title": "Time",
    "field": "Time",
  },
  {
    "title": "V1",
    "field": "V1",
  },
  {
    "title": "V2",
    "field": "V2",
  },
  {
    "title": "V3",
    "field": "V3",
  },
  {
    "title": "V4",
    "field": "V4",
  },
  {
    "title": "V5",
    "field": "V5",
  },
  {
    "title": "V6",
    "field": "V6",
  },
  {
    "title": "V7",
    "field": "V7",
  },
  {
    "title": "V8",
    "field": "V8",
  },
  {
    "title": "V9",
    "field": "V9",
  },
  {
    "title": "V10",
    "field": "V10",
  },
  {
    "title": "V11",
    "field": "V11",
  },
  {
    "title": "V12",
    "field": "V12",
  },
  {
    "title": "V13",
    "field": "V13",
  },
  {
    "title": "V14",
    "field": "V14",
  },
  {
    "title": "V15",
    "field": "V15",
  },
  {
    "title": "V16",
    "field": "V16",
  },
  {
    "title": "V17",
    "field": "V17",
  },
  {
    "title": "V18",
    "field": "V18",
  },
  {
    "title": "V19",
    "field": "V19",
  },
  {
    "title": "V20",
    "field": "V20",
  },
  {
    "title": "V21",
    "field": "V21",
  },
  {
    "title": "V22",
    "field": "V22",
  },
  {
    "title": "V23",
    "field": "V23",
  },
  {
    "title": "V24",
    "field": "V24",
  },
  {
    "title": "V25",
    "field": "V25",
  },
  {
    "title": "V26",
    "field": "V26",
  },
  {
    "title": "V27",
    "field": "V27",
  },
  {
    "title": "V28",
    "field": "V28",
  },
]