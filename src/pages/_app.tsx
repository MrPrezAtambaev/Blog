import "@/styles/globals.css";
import { queryClient } from "@/utils/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import type { AppProps } from "next/app";
import {
	ColorScheme,
	ColorSchemeProvider,
	Container,
	MantineProvider,
} from "@mantine/core";
import { ModalsProvider } from "@mantine/modals";
import { modal } from "@/components/modal";
import { useState } from "react";
import Head from "next/head";
import Navbar from "@/components/Navbar";

declare module "@mantine/modals" {
	export interface MantineModalsOverride {
		modal: typeof modal;
	}
}

export default function App({ Component, pageProps }: AppProps) {
	const [colorScheme, setColorScheme] = useState<ColorScheme>("light");
	const toggleColorScheme = (value?: ColorScheme) =>
		setColorScheme(value || (colorScheme === "dark" ? "light" : "dark"));
	return (
		<>
			<Head>
				<title>Blog</title>
				<meta
					name="viewport"
					content="minimum-scale=1, initial-scale=1, width=device-width"
				/>
				<link
					rel="shortcut icon"
					href="https://www.sketchappsources.com/resources/source-image/sketch-3-todo-list-app-icon-template.png"
					type="image/x-icon"
				/>
			</Head>
			<QueryClientProvider client={queryClient}>
				<ColorSchemeProvider
					colorScheme={colorScheme}
					toggleColorScheme={toggleColorScheme}
				>
					<MantineProvider
						withGlobalStyles
						withNormalizeCSS
						theme={{
							colorScheme,
						}}
					>
						<ModalsProvider modals={modal}>
							<Container pt={0}>
								<Navbar />
								<Component {...pageProps} />
							</Container>
						</ModalsProvider>
					</MantineProvider>
				</ColorSchemeProvider>
			</QueryClientProvider>
		</>
	);
}
