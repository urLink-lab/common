import { FC } from 'react';

import { Switch, Route } from 'react-router-dom';
import { SWRConfig } from 'swr';

import { HOME } from '@/layouts/config/router';

const AuthCheck: FC = ({ children }) => {
  //  페이지 권한 검사는 이쪽에서 확인
  // const { data: userData } = useMyUser();
  // const history = useHistory();
  // const location = useLocation();

  // useEffect(() => {
  //   if (!getAccessToken() && !userData) {
  //     if (!location.pathname.includes(LOGIN.default.path)) {
  //       history.replace(LOGIN.default.path);
  //     }
  //   }
  // }, [history, location, userData]);

  return <>{children}</>;
};

const App = () => {
  return (
    <SWRConfig
      value={{
        revalidateOnFocus: false,
        shouldRetryOnError: false,
      }}
    >
      <AuthCheck>
        <Switch>
          {/* HOME */}
          <Route exact={HOME.default.exact} path={HOME.default.path} component={HOME.default.component} />
        </Switch>
      </AuthCheck>
    </SWRConfig>
  );
};
export default App;
