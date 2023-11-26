import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";

const useWorkSheet = () => {
    const axiosSecure = useAxiosSecure();

    const { data: workSheets = [], refetch } = useQuery({
        queryKey: ["worksheet"],
        queryFn: async () => {
            const res = await axiosSecure.get("/worksheet");
            return res.data;
        },
    });
    return [refetch, workSheets];
};

export default useWorkSheet;
