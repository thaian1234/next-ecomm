import { useMutation } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";

export const useDeleteBillboards = () => {
	const routers = useRouter();
	const params = useParams();

	const { mutate: deleteBillboards, isPending: isDeleting } = useMutation({
		mutationFn: async () => {
			return await axios.delete(`/api/Billboardss/${params.BillboardsId}`);
		},
		onError: () => {
			toast.error(
				"Make sure you removed all products and categories first!"
			);
		},
		onSuccess: () => {
			toast.success("Billboards deleted");
			routers.push("/");
			routers.refresh();
		},
	});

	return { deleteBillboards, isDeleting };
};
