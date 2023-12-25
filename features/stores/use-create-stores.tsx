import { Store } from "@prisma/client";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export const useCreateStore = () => {
	const routers = useRouter();

	const { mutate: createStore, isPending: isCreating } = useMutation({
		mutationFn: async (store: { name: string }) => {
			return await axios.post(`/api/stores`, store);
		},
		onError: () => {
			toast.error("Cannot create store");
		},
	});

	return { createStore, isCreating };
};
