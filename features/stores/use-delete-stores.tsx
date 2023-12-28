import { useMutation } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";

export const useDeleteStore = () => {
	const routers = useRouter();
	const params = useParams();

	const { mutate: deleteStore, isPending: isDeleting } = useMutation({
		mutationFn: async () => {
			return await axios.delete(
				`/api/${params.storeId}/billboards/${params.billboardId}`
			);
		},
		onError: () => {
			toast.error(
				"Make sure you removed all products and categories first!"
			);
		},
		onSuccess: () => {
			toast.success("Billborad deleted");
		},
	});

	return { deleteStore, isDeleting };
};
