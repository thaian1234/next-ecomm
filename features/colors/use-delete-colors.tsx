import { useMutation } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";

export const useDeleteColors = () => {
	const routers = useRouter();
	const params = useParams();

	const { mutate: deleteColors, isPending: isDeleting } = useMutation({
		mutationFn: async (colorId: string) => {
			return await axios.delete(
				`/api/${params.storeId}/colors/${colorId}`
			);
		},
		onError: () => {
			toast.error(
				"Make sure you removed all products using this color first!"
			);
		},
		onSuccess: () => {
			routers.push(`/${params.storeId}/colors`);
			routers.refresh();
			toast.success("Size deleted");
		},
	});

	return { deleteColors, isDeleting };
};
