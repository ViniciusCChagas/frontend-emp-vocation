import styles from '@/styles/components/VocationDaysCountCard.module.scss';

interface CountCardProps {
	title: string;
	body: string;
}
function CountCard({ title, body }: CountCardProps) {
	return (
		<div className={styles.countCard}>
			<p>{title}</p>
			<span>{body}</span>
		</div>
	);
}

export { CountCard };
