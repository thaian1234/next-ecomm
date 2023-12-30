import { useMutation } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";

export const useDeleteBillboards = () => {
	const routers = useRouter();
	const params = useParams();

	const { mutate: deleteBillboards, isPending: isDeleting } = useMutation({
		mutationFn: async (billboardId: string) => {
			return await axios.delete(
				`/api/${params.storeId}/billboards/${billboardId}`
			);
		},
		onError: () => {
			toast.error(
				"Make sure you removed all products and categories first!"
			);
		},
		onSuccess: () => {
			routers.push(`/${params.storeId}/billboards`);
			routers.refresh();
			toast.success("Billboards deleted");
		},
	});

	return { deleteBillboards, isDeleting };
};
