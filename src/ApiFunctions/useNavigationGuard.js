import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { useContext, useEffect } from "react";
import { UNSAFE_NavigationContext as NavigationContext } from "react-router-dom";

const MySwal = withReactContent(Swal);

export default function useNavigationGuard(
  when,
  message = "Your changes will be lost. Are you sure?"
) {
  const navigator = useContext(NavigationContext).navigator;

  useEffect(() => {
    if (!when) return;

    const push = navigator.push;
    const replace = navigator.replace;

    const confirmBlock = async () => {
      const result = await MySwal.fire({
        title: "Are you sure?",
        text: message,
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, leave",
        cancelButtonText: "Cancel",
      });
      return result.isConfirmed;
    };

    navigator.push = async (...args) => {
      if (await confirmBlock()) push.apply(navigator, args);
    };

    navigator.replace = async (...args) => {
      if (await confirmBlock()) replace.apply(navigator, args);
    };

    // 🟢 Handle browser refresh / closing tab
    const handleBeforeUnload = (e) => {
      if (when) {
        e.preventDefault();
        // Chrome requires returnValue to be set
        e.returnValue = message;
        return message;
      }
    };
    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      navigator.push = push;
      navigator.replace = replace;
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [navigator, when, message]);
}
