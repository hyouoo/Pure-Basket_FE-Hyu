import React, { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { userState } from "../recoil/atoms";
import { EventSourcePolyfill, NativeEventSource } from "event-source-polyfill";

const Sse = () => {
  const { token } = useRecoilValue(userState);
  const { data, setData } = useState("no message");
  const EventSource = EventSourcePolyfill || NativeEventSource;

  useEffect(() => {
    const sse = new EventSource(`${process.env.REACT_APP_BASE_URL}/api/sse`, {
      headers: {
        Authorization: token,
      },
      withCredentials: true,
    });

    sse.onmessage = async (event) => {
      const newData = await JSON.parse(event.data);
      console.log("received message: ", newData);
      setData(newData);
      // Display a notification using the Notification API
      // if (Notification.permission === "granted") {
      //   new Notification("New Message", {
      //     body: newData.message,
      //   });
      // }
    };

    sse.onerror = async (event) => {
      console.log("sse error");
      if (!event.error.message.includes("No activity")) sse.close();
    };

    return () => {
      sse.close();
    };
  }, []);

  return <div>{data}</div>;
};

export default Sse;
