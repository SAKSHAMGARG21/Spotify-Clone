import { Input } from "@/components/ui/input";
import { useChatStore } from "@/services/operations/useChatStore";
import { setMessages } from "@/slices/chatSlice";
import { Send } from "lucide-react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const MessageInput = () => {

	const dispatch= useDispatch();
	const [newMessage, setNewMessage] = useState("");
	const { user } = useSelector(state => state.auth);
	const {selectedUser,messages }= useSelector(state=> state.chat);
	const { sendMessage } = useChatStore();
	const handleSend = () => {
		if (!selectedUser || !user || !newMessage) return;
		dispatch(setMessages([...messages]));
		sendMessage(selectedUser._id, user._id, newMessage.trim());
		setNewMessage("");
	};

	return (
		<div className='p-4 mt-auto border-t border-zinc-800'>
			<div className='flex gap-2'>
				<Input
					type="text"
					placeholder='Type a message'
					value={newMessage}
					onChange={(e) => setNewMessage(e.target.value)}
					className='bg-zinc-800 border-none'
					onKeyDown={(e) => e.key === "Enter" && handleSend()}
				/>

				<button size={"icon"} onClick={handleSend} disabled={!newMessage.trim()}>
					<Send className='size-4' />
				</button>
			</div>
		</div>
	);
};
export default MessageInput;
