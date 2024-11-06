'use client';

import React, { Component, ErrorInfo, ReactNode } from 'react';
import Error from '@/app/error';

interface Props {
	children: ReactNode;
}

interface State {
	hasError: boolean;
}

class ErrorBoundary extends Component<Props, State> {
	constructor(props: Props) {
		super(props);
		this.state = { hasError: false };
	}

	static getDerivedStateFromError(_: Error): State {
		return { hasError: true };
	}

	componentDidCatch(error: Error, errorInfo: ErrorInfo) {
		console.error('Uncaught error:', error, errorInfo);
	}

	render() {
		if (this.state.hasError) {
			return <Error error={'An error occurred' as any} reset={() => this.setState({ hasError: false })} />;
		}

		return this.props.children;
	}
}

export default ErrorBoundary;
