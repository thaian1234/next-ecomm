import { useMutation } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";

export const useDeleteProducts = () => {
	const routers = useRouter();
	const params = useParams();

	const { mutate: deleteProducts, isPending: isDeleting } = useMutation({
		mutationFn: async (productId: string) => {
			return await axios.delete(
				`/api/${params.storeId}/products/${productId}`
			);
		},
		onError: () => {
			toast.error("Something went wrong");
		},
		onSuccess: () => {
			routers.push(`/${params.storeId}/products`);
			routers.refresh();
			toast.success("Product deleted");
		},
	});

	return { deleteProducts, isDeleting };
};
