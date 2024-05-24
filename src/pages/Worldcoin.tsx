import React, { useEffect } from "react";
import { useParams, useRoutes, useSearchParams } from "react-router-dom";
import axios from "axios";

const Worldcoin = () => {
  const [searchParams] = useSearchParams();
  const worldcoin_code = searchParams.get("code");

  useEffect(() => {
    (async () => {
      if (worldcoin_code) {
        const { data } = await axios.post("https://staxer.uc.r.appspot.com/worldcoin", {
          code: worldcoin_code,
        });
        if (!data.err) {
          window.localStorage.setItem("worldcoin", JSON.stringify(data));
          window.location.href = `${window.location.origin}/dashboard`;
        }
      }
    })();
  }, [worldcoin_code]);

  return <></>;
};

export default Worldcoin;
