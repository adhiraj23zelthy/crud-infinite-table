import { useCallback } from "react";
import { callGetApi, callPostApi, callPutApi } from "../services/api";
import useStore from "../store/store";
import toast from "react-hot-toast"; // Import toast for notifications

/**
 * This hook automatically appends the zelthy authentication token to network requests made
 *
 * @returns {function} triggerApi which takes in
 * @param {object} apiDetails consisting of URL, request type, and custom error message
 */
export function useApi() {
  const setLoading = useStore((state) => state.setLoading);
  const setErrorMessage = useStore((state) => state.setErrorMessage);

  const triggerApi = useCallback(
    async (apiDetails) => {
      let apiRequest;

      // Show loader if necessary
      if (apiDetails.loader !== false) {
        setLoading(true);
      }

      try {
        switch (apiDetails.type) {
          case "POST":
            apiRequest = await callPostApi({
              fullUrl: apiDetails.url,
              payload: apiDetails.payload,
            });
            break;
          case "PUT":
            apiRequest = await callPutApi({
              fullUrl: apiDetails.url,
              payload: apiDetails.payload,
            });
            break;
          case "GET":
          default:
            apiRequest = await callGetApi({
              fullUrl: apiDetails.url,
            });
        }

        const { status } = apiRequest;

        // Hide loader after API call
        if (apiDetails.loader !== false) {
          setLoading(false);
        }

        if (status === 200) {
          const { response, success } = await apiRequest.json();

          if (!success) {
            const errorMessage =
              apiDetails.errorMessage || response?.message || "Server Error";
            setErrorMessage(errorMessage);
            toast.error(errorMessage); // Show custom error toast
          }

          return { response, success, responseStatus: status };
        } else {
          const errorMessage = apiDetails.errorMessage || "Server Error";
          setErrorMessage(errorMessage);
          toast.error(errorMessage); // Show custom error toast
          return {
            response: { message: errorMessage },
            success: false,
            responseStatus: status,
          };
        }
      } catch (error) {
        if (apiDetails.loader !== false) {
          setLoading(false);
        }

        const errorMessage =
          apiDetails.errorMessage || "An unexpected error occurred";
        setErrorMessage(errorMessage);
        toast.error(errorMessage); // Show custom error toast
        return {
          response: { message: errorMessage },
          success: false,
          responseStatus: 500,
        };
      }
    },
    [setLoading, setErrorMessage]
  );

  return triggerApi;
}
