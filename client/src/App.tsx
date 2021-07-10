import React, { FC } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Landing from './pages/Landing'
import Regulator from './pages/Regulator'
import Participant from './pages/Participant'

const App: FC = () => {
  return (
    <div>
      <Router>
        <Route exact path={'/'} component={Landing} />
        <Route exact path={'/regulator'} component={Regulator} />
        <Route exact path={'/participant'} component={Participant} />
      </Router>
    </div>
  )
}

export default App
