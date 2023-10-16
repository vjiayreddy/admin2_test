import { FC } from "react";

import { useEffect } from "react";
import { useRouter } from "next/router";

interface props {
  to: string;
  query?: any;
}

const RedirectComponent: FC<props> = ({ to, query }) => {
  const router = useRouter();
  useEffect(() => {
    router.push({ pathname: to, query });
  }, []);

  return null;
};

export default RedirectComponent;
