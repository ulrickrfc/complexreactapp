import React from 'react'
import Page from './Page'
import { Link } from 'react-router-dom'

function NotFound(){
    return(
        <Page title="Not Found">
        <div className="text-center">
          <h2>Page not Found</h2>
          <p className="lead text-muted">Go to <Link to="/">Home page</Link></p>
        </div>
      </Page>
    )
}

export default NotFound