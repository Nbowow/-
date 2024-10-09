import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getReviews, postReview } from "../api/recipe";

export const useReview = (id) => {
    return useQuery({
        queryKey: [`review${id}`],
        queryFn: () => getReviews(id),
        staleTime: 0,
        refetchOnMount: true,
    });
};

export const useUpdateReview = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ formData, id }) => postReview(formData, id),
        onSuccess: (data, variables) => {
            queryClient.invalidateQueries([`review${variables.id}`]);
        },
    });
};
