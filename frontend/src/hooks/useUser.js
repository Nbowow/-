import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchUser, fetchUserRecipe, updateUser } from "../api/userApi";
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

export const useUpdateUser = () => {
    const user = useUserStore((state) => state.user);
    const setUser = useUserStore((state) => state.setUser);
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: updateUser,
        onSuccess: (variables) => {
            setUser({ ...user, ...variables });
            queryClient.invalidateQueries("user");
        },
    });
};
