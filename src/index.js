import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import './styles/normalize.css'
import './styles/reset.css'
import './styles/base.css'
import './styles/vars.css'

import App from './App'
import registerServiceWorker from './registerServiceWorker'

ReactDOM.render(<App />, document.getElementById('root'))
registerServiceWorker()
