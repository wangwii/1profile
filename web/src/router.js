import { connect } from 'dva'
import { Router, Route, IndexRedirect, withRouter } from 'dva/router';

import Homepage from './pages/homepage';

export default ({ history })=> {
  return (
    <Router history={history} onUpdate={() => window.scrollTo(0, 0)}>
      <Route path='/' component={Homepage} />
    </Router>
  );
};
