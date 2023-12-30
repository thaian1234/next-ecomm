import { useMutation } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";

export const useDeleteStore = () => {
	const router = useRouter();
	const params = useParams();

	const { mutate: deleteStore, isPending: isDeleting } = useMutation({
		mutationFn: async () => {
			return await axios.delete(`/api/stores/${params.storeId}`);
		},
		onError: () => {
			toast.error(
				"Make sure you removed all products and categories first!"
			);
		},
		onSuccess: () => {
			toast.success("Store deleted");
			router.refresh();
			router.push("/");
		},
	});

	return { deleteStore, isDeleting };
};
