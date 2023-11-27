import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
import useAuth from "./useAuth";

const useWorkSheet = () => {
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();
    const { data: workSheets = [], refetch } = useQuery({
        queryKey: ["worksheet"],
        queryFn: async () => {
            const res = await axiosSecure.get(`/worksheet?email=${user.email}`);
            return res.data;
        },
    });
    return [refetch, workSheets];
};

export default useWorkSheet;
