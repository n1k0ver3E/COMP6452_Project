import React, { FC } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Landing from './pages/Landing'
import ProfileContract from './pages/ProfileContract'

const App: FC = () => {
  return (
    <div>
      <Router>
        <Route exact path={'/'} component={Landing} />
        <Route path={'/profile-contract'} component={ProfileContract} />
      </Router>
    </div>
  )
}

export default App
