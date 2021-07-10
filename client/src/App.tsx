import React, { FC } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Landing from './pages/Landing'

const App: FC = () => {
  return (
    <div>
      <Router>
        <Route exact path={'/'} component={Landing} />
      </Router>
    </div>
  )
}

export default App
