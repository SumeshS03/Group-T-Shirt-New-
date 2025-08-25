import { useContext, useEffect } from "react";
import { UNSAFE_NavigationContext as NavigationContext } from "react-router-dom";

/**
 * useNavigationGuard hook
 * @param {boolean} when - whether to block navigation (example: form dirty)
 * @param {string} message - confirm message to show
 */
export default function useNavigationGuard(
  when,
  message = "Your changes will be lost. Are you sure?"
) {
  const navigator = useContext(NavigationContext).navigator;

  useEffect(() => {
    if (!when) return; // ✅ don’t patch if not dirty

    const push = navigator.push;
    const replace = navigator.replace;

    const confirmBlock = () => window.confirm(message);

    navigator.push = (...args) => {
      if (confirmBlock()) {
        push.apply(navigator, args);
      }
    };

    navigator.replace = (...args) => {
      if (confirmBlock()) {
        replace.apply(navigator, args);
      }
    };

    return () => {
      // ✅ Restore originals when `when` changes to false
      navigator.push = push;
      navigator.replace = replace;
    };
  }, [navigator, when, message]);

  // Handle browser refresh/close
  useEffect(() => {
    if (!when) return;

    const handleBeforeUnload = (e) => {
      e.preventDefault();
      e.returnValue = message;
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [when, message]);
}
