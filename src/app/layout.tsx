import MainFooter from '@/components/Footer';
import type { ChildrenProps } from '@/types';
import Providers from '@/providers/Providers';
import { constructMetadata, constructViewport } from '@/utils';
import { NextWebVitalsMetric } from 'next/app';
import '@/styles/globals.css';

export const metadata = constructMetadata() 
export const viewport = constructViewport()

export const reportWebVitals = (metric: NextWebVitalsMetric) => {
	if (metric.label === 'web-vital') {
		console.log(metric);
	}
};

// ChildrenProps is prone to bugs 
export default async function RootLayout({ children }: ChildrenProps) {
	return (
		<html 
			lang="en"
			suppressHydrationWarning
			data-a11y-animated-images="system"
			data-a11y-link-underlines="false"
			data-turbo-loaded
		>
			<body className={`h-full flex flex-col justify-between`}>
				<Providers>
					<section className="flex-1">
						{children}
					</section>
				</Providers>
				<MainFooter />
			</body>
		</html>
	);
}
