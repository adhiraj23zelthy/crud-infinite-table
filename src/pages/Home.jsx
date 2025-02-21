import React from "react";
import Counter from "../components/Counter";
import { useApi } from "../hooks/useApi";

const Home = () => {
  const { triggerApi } = useApi();

  const handleTriggerApi = () => {
    const makeApiCall = async () => {
      const res = await fetch("/clinic_orders/test-api/");
      const data = await res.json();
      // const { response, success } = await triggerApi({
      //   url: "/clinic_orders/test-api/",
      //   type: "GET",
      //   loader: true,
      // });

    console.log(data);
    };

    makeApiCall();

  };

  return (
    <div>
      <Counter />
      <button onClick={handleTriggerApi}>Trigger API</button>
    </div>
  );
}

export default Home