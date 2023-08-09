import { Poppins } from 'next/font/google';

const font = Poppins({
	weight: ['400', '500', '700'],
	subsets: ['latin'],
	preload: true,
});

interface FontWrapperProps {
	children: React.ReactNode;
}

function FontWrapper({ children }: FontWrapperProps) {
	return <body className={font.className}>{children}</body>;
}

export { FontWrapper };
