import { useMutation } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";

export const useEditCategories = () => {
	const router = useRouter();
	const params = useParams();

	const { mutate: editCategories, isPending: isEditing } = useMutation({
		mutationFn: async (data: { name: string; billboardId: string }) => {
			return await axios.patch(
				`/api/${params.storeId}/categories/${params.categoryId}`,
				data
			);
		},
		onError: () => {
			toast.error("Cannot edit Categories");
		},
		onSuccess: () => {
			router.push(`/${params.storeId}/categories`);
			router.refresh();
		},
	});

	return { editCategories, isEditing };
};
