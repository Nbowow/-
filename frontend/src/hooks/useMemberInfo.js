import { useQuery } from "@tanstack/react-query";
import { fetchMemberInfo } from "../api/userApi";

export const useMemberInfo = () => {
    return useQuery({
        queryKey: ["memberInfo"],
        queryFn: fetchMemberInfo,
    });
};
