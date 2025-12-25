import Script from 'next/script';

interface BreadcrumbItem {
	name: string;
	url: string;
}

interface StructuredDataProps {
	type: 'breadcrumb' | 'article' | 'faq';
	data?: {
		items?: BreadcrumbItem[];
		article?: {
			title: string;
			description: string;
			author: string;
			publishedTime?: string;
			modifiedTime?: string;
			image?: string;
		};
		faq?: Array<{
			question: string;
			answer: string;
		}>;
	};
}

export function StructuredData({ type, data }: StructuredDataProps) {
	const getStructuredData = () => {
		switch (type) {
			case 'breadcrumb':
				if (!data?.items) return null;
				return {
					'@context': 'https://schema.org',
					'@type': 'BreadcrumbList',
					itemListElement: data.items.map((item, index) => ({
						'@type': 'ListItem',
						position: index + 1,
						name: item.name,
						item: item.url,
					})),
				};

			case 'article':
				if (!data?.article) return null;
				return {
					'@context': 'https://schema.org',
					'@type': 'Article',
					headline: data.article.title,
					description: data.article.description,
					author: {
						'@type': 'Person',
						name: data.article.author,
					},
					...(data.article.publishedTime && {
						datePublished: data.article.publishedTime,
					}),
					...(data.article.modifiedTime && {
						dateModified: data.article.modifiedTime,
					}),
					...(data.article.image && {
						image: data.article.image,
					}),
				};

			case 'faq':
				if (!data?.faq || data.faq.length === 0) return null;
				return {
					'@context': 'https://schema.org',
					'@type': 'FAQPage',
					mainEntity: data.faq.map((item) => ({
						'@type': 'Question',
						name: item.question,
						acceptedAnswer: {
							'@type': 'Answer',
							text: item.answer,
						},
					})),
				};

			default:
				return null;
		}
	};

	const structuredData = getStructuredData();

	if (!structuredData) return null;

	return (
		<Script
			id={`structured-data-${type}`}
			type="application/ld+json"
			dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
		/>
	);
}

