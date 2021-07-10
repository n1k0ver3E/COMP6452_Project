import React, { FC } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Landing from './pages/Landing'
import Home from './pages/Home'

const App: FC = () => {
  return (
    <div>
      <Router>
        <Route exact path={'/'} component={Home} />
      </Router>
    </div>
  )
}

export default App
