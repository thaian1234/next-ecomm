import { useMutation } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";

export const useEditStore = () => {
	const routers = useRouter();
	const params = useParams();

	const { mutate: editStore, isPending: isEditing } = useMutation({
		mutationFn: async (store: { name: string }) => {
			return await axios.patch(`/api/stores/${params.storeId}`, store);
		},
		onError: () => {
			toast.error("Cannot edit store");
		},
		onSuccess: () => {
			toast.success("Store updated");
			routers.refresh();
		},
	});

	return { editStore, isEditing };
};
