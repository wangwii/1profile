import { Link, withRouter } from 'dva/router';

const Homepage = ()=> {
  return (
    <ul>
      <li><h3> Home page </h3></li>
      <li>
        <Link to='/admin'>Admin</Link>
      </li>
      <li>
        <Link to='/tianmei2'>Your Tenant</Link>
      </li>
    </ul>
  );
};

export default withRouter(Homepage);

