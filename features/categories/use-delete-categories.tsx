import { useMutation } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";

export const useDeleteCategories = () => {
	const routers = useRouter();
	const params = useParams();

	const { mutate: deleteCategories, isPending: isDeleting } = useMutation({
		mutationFn: async (categoryId: string) => {
			return await axios.delete(
				`/api/${params.storeId}/categories/${categoryId}`
			);
		},
		onError: () => {
			toast.error(
				"Make sure you removed all products using this category first!"
			);
		},
		onSuccess: () => {
			routers.push(`/${params.storeId}/categories`);
			routers.refresh();
			toast.success("Category deleted");
		},
	});

	return { deleteCategories, isDeleting };
};
