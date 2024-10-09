import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
    fetchUser,
    fetchUserRecipe,
    updateUser,
    uploadProfileImage,
    fetchOtherUser,
    getUserLike,
    fetchOtherUserRecipe,
    getUserScrap,
} from "../api/userApi";
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

export const useUpdateProfileImage = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: uploadProfileImage,
        onSuccess: () => {
            queryClient.invalidateQueries(["user"]);
        },
    });
};

export const useOtherUserInfo = (id) => {
    return useQuery({
        queryKey: [`user${id}`],
        queryFn: () => fetchOtherUser(id),
        staleTime: 0,
        refetchOnMount: true,
    });
};

export const useUserLikes = () => {
    return useQuery({
        queryKey: [`userLike`],
        queryFn: getUserLike,
        staleTime: 0,
        refetchOnMount: true,
    });
};

export const useUserScraps = () => {
    return useQuery({
        queryKey: [`userScrap`],
        queryFn: getUserScrap,
        staleTime: 0,
        refetchOnMount: true,
    });
};

export const useOtherUserRecipe = (id) => {
    return useQuery({
        queryKey: [`otherUserRecipe`],
        queryFn: () => fetchOtherUserRecipe(id),
    });
};
