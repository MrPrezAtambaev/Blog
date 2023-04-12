import BlogsView from "@/components/BlogsView";
import Navbar from "@/components/Navbar";
import { Container, Stack } from "@mantine/core";

export default function Home() {
	return (
		<Stack>
			<BlogsView />
		</Stack>
	);
}
