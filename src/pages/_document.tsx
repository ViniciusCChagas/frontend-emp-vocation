import { FontWrapper } from '@/components/FontWrapper';
import { Head, Html, Main, NextScript } from 'next/document';

export default function Document() {
	return (
		<Html lang='pt-BR'>
			<Head>
				<link rel='shortcut icon' href='/favicon.svg' />
				<title>EMP-VOCATION - Controle de férias</title>
			</Head>

			<FontWrapper>
				<Main />
				<NextScript />
			</FontWrapper>
		</Html>
	);
}
