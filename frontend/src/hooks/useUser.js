import { useQuery } from "@tanstack/react-query";
import { fetchUser, fetchUserRecipe } from "../api/userApi";
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

export const useUserReceipe = () => {
    const setRecipes = useUserStore((state) => state.setRecipes);

    return useQuery({
        queryKey: ["userRecipes"],
        queryFn: fetchUserRecipe,
        select: (data) => setRecipes(data),
        staleTime: 0,
        refetchOnMount: true,
    });
};
