import { Loading } from '@/components/Loading';
import { EmployeeProvider } from '@/hooks/useEmployees';
import '@/styles/globals.scss';
import { ChakraProvider } from '@chakra-ui/react';
import type { AppProps } from 'next/app';
import { Router } from 'next/router';
import { useEffect, useState } from 'react';

export default function App({ Component, pageProps }: AppProps) {
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		const start = () => {
			setIsLoading(true);
		};
		const end = () => {
			setIsLoading(false);
		};
		Router.events.on('routeChangeStart', start);
		Router.events.on('routeChangeComplete', end);
		Router.events.on('routeChangeError', end);
		return () => {
			Router.events.off('routeChangeStart', start);
			Router.events.off('routeChangeComplete', end);
			Router.events.off('routeChangeError', end);
		};
	}, []);

	return (
		<ChakraProvider>
			<EmployeeProvider>
				<>{isLoading ? <Loading /> : <Component {...pageProps} />}</>
			</EmployeeProvider>
		</ChakraProvider>
	);
}
