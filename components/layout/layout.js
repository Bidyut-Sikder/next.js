import { Fragment, useContext } from "react";

import MainHeader from "./main-header";
import Notification from "../ui/notification";
import NotificationContext from "../../store/notification-context";

function Layout(props) {
  const notificationContext = useContext(NotificationContext);

  //  const { message, status, title } = notificationContext.notification;
  const notification = notificationContext.notification;

  return (
    <Fragment>
      <MainHeader />
      <main>{props.children}</main>
      {notification && (
        <Notification message={notification.message} status={notification.status} title={notification.title} />
      )}
    </Fragment>
  );
}

export default Layout;
