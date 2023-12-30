import { useMutation } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";

export const useDeleteSizes = () => {
	const routers = useRouter();
	const params = useParams();

	const { mutate: deleteSizes, isPending: isDeleting } = useMutation({
		mutationFn: async (sizeId: string) => {
			return await axios.delete(
				`/api/${params.storeId}/sizes/${sizeId}`
			);
		},
		onError: () => {
			toast.error(
				"Make sure you removed all products using this size first!"
			);
		},
		onSuccess: () => {
			routers.push(`/${params.storeId}/sizes`);
			routers.refresh();
			toast.success("Size deleted");
		},
	});

	return { deleteSizes, isDeleting };
};
