import styles from '@/styles/components/Loading.module.scss';
import { Spinner } from '@chakra-ui/react';

function Loading() {
	return (
		<div className={styles.loadingContainer}>
			<Spinner
				thickness='4px'
				speed='1s'
				color='var(--secondary)'
				emptyColor='var(--background)'
				size='xl'
			/>
			<h2>Carregando...</h2>
		</div>
	);
}

export { Loading };
