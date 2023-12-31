import axios from "axios";
import toast from "react-hot-toast";

import { useMutation } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";
import { ProductFormValues } from "@/app/(dashboard)/[storeId]/(routes)/products/[productId]/components/product-form";

export function useCreateProducts() {
	const params = useParams();
	const router = useRouter();

	const { mutate: createProducts, isPending: isCreating } = useMutation({
		mutationFn: async (data: ProductFormValues) => {
			return await axios.post(`/api/${params.storeId}/products`, data);
		},
		onError: () => {
			toast.error("Cannot create Product");
		},
		onSuccess: () => {
			router.push(`/${params.storeId}/products`);
			router.refresh();
		},
	});
	return { createProducts, isCreating };
}
