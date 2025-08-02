import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

const useProfileUpdate = () => {
  const isDev = import.meta.env.MODE === "development";

  const queryClient = useQueryClient();
  const profileUpdaterFn = async (dataForm) => {
    try {
      const res = await fetch(
        isDev
          ? "/api/users/update"
          : `${import.meta.env.VITE_API_BASE_URL}/api/users/update`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify(dataForm),
        }
      );
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || " Updating went wrong");
      }

      return data;
    } catch (e) {
      throw new Error(e.message);
    }
  };

  const { mutateAsync: updateProfile, isPending: isUpdating } = useMutation({
    mutationFn: profileUpdaterFn,
    onSuccess: () => {
      toast.success("User info Updated successfully.");
      Promise.all([
        queryClient.invalidateQueries({ queryKey: ["authUser"] }),
        queryClient.invalidateQueries({ queryKey: ["userProfile"] }),
      ]);
    },
    onError: (e) => {
      toast.error(e.message);
    },
  });

  return { updateProfile, isUpdating };
};

export default useProfileUpdate;
