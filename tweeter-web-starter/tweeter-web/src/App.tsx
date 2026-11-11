import "./App.css";
import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import Login from "./components/authentication/login/Login";
import Register from "./components/authentication/register/Register";
import MainLayout from "./components/mainLayout/MainLayout";
import Toaster from "./components/toaster/Toaster";
import { useUserInfo } from "./components/userInfo/UserInfoHooks";
import { FeedPresenter } from "./presenter/FeedPresenter";
import { StoryPresenter } from "./presenter/StoryPresenter";
import { FolloweePresenter } from "./presenter/FolloweePresenter";
import { FollowerPresenter } from "./presenter/FollowerPresenter";
import { Status, User } from "tweeter-shared";
import ItemScroller from "./components/mainLayout/ItemScroller";
import { StatusService } from "./model.service/StatusService";
import StatusItem from "./components/statusItem/StatusItem";
import { FollowService } from "./model.service/FollowService";
import UserItem from "./components/userItem/UserItem";

const App = () => {
  const { currentUser, authToken } = useUserInfo();

  const isAuthenticated = (): boolean => {
    return !!currentUser && !!authToken;
  };

  return (
    <div>
      <Toaster position="top-right" />
      <BrowserRouter>
        {isAuthenticated() ? (
          <AuthenticatedRoutes />
        ) : (
          <UnauthenticatedRoutes />
        )}
      </BrowserRouter>
    </div>
  );
};

const AuthenticatedRoutes = () => {
  const { displayedUser } = useUserInfo();

  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route index element={<Navigate to={`/feed/${displayedUser!.alias}`} />} />
        <Route
          path="feed/:displayedUser"
          element={
            <ItemScroller<Status, StatusService>
              key={`feed-${displayedUser!.alias}`}
              featureUrl="/feed"
              presenterFactory={(view) => new FeedPresenter(view)}
              itemComponentGenerator={(status) => (
                <StatusItem status={status}
                featureURL="/feed" />
              )}
            />
          }
        />
        <Route path="story/:displayedUser" element={
            <ItemScroller<Status, StatusService>
              key={`story-${displayedUser!.alias}`}
              featureUrl="/story"
              presenterFactory={(view) => new StoryPresenter(view)}
              itemComponentGenerator={(status) => (
                <StatusItem status={status}
                featureURL="/story" />
              )}
            />
          }/>
        <Route path="followees/:displayedUser" element={
          <ItemScroller<User, FollowService>
            key = {`followees-${displayedUser!.alias}`}
            featureUrl="/followees"
            presenterFactory={(view) => new FolloweePresenter(view)}
            itemComponentGenerator={(user) => (
                <UserItem user={user}
                featurePath="/followees" />
              )}
            />
          }/>
        <Route path="followers/:displayedUser" element={
          <ItemScroller<User, FollowService>
            key = {`followers-${displayedUser!.alias}`}
            featureUrl="/followers"
            presenterFactory={(view) => new FollowerPresenter(view)}
            itemComponentGenerator={(user) => (
                <UserItem user={user}
                featurePath="/followers" />
              )}
            />
          }/>
        <Route path="logout" element={<Navigate to="/login" />} />
        <Route path="*" element={<Navigate to={`/feed/${displayedUser!.alias}`} />} />
      </Route>
    </Routes>
  );
};

const UnauthenticatedRoutes = () => {
  const location = useLocation();

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="*" element={<Login originalUrl={location.pathname} />} />
    </Routes>
  );
};

export default App;
