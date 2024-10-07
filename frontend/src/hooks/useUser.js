import { useQuery } from "@tanstack/react-query";
import { fetchUser } from "../api/userApi";
import { useUserStore } from "../store/userStore";

const useUser = () => {
    const setUser = useUserStore((state) => state.setUser);

    return useQuery({
        queryKey: ["user"],
        queryFn: fetchUser,
        select: (data) => setUser(data),
        staleTime: 30_000,
    });
};
export default useUser;
