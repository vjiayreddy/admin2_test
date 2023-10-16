import { useRouter } from "next/router";
import { useEffect } from "react";

interface props extends ScrollToOptions {}

function useRouterScroll({
  behavior = "smooth",
  left = 0,
  top = 0,
}: props = {}) {
  const router = useRouter();
  useEffect(() => {
    const handleRouteChangeComplete = () => {
      window.scrollTo({ top, left, behavior });
    };
    router.events.on("routeChangeComplete", handleRouteChangeComplete);
    return () => {
      router.events.off("routeChangeComplete", handleRouteChangeComplete);
    };
  }, [behavior, left, top]);
}

export default useRouterScroll;
