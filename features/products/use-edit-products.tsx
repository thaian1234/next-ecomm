import { useMutation } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";

export const useEditProducts = () => {
	const router = useRouter();
	const params = useParams();

	const { mutate: editProducts, isPending: isEditing } = useMutation({
		mutationFn: async (data: {
			name: string;
			images: {
				url: string;
			}[];
			price: number;
			categoryId: string;
			colorId: string;
			sizeId: string;
			isFeatured?: boolean | undefined;
			isArchived?: boolean | undefined;
		}) => {
			return await axios.patch(
				`/api/${params.storeId}/products/${params.productId}`,
				data
			);
		},
		onError: () => {
			toast.error("Cannot edit products");
		},
		onSuccess: () => {
			router.push(`/${params.storeId}/products`);
			router.refresh();
		},
	});

	return { editProducts, isEditing };
};
