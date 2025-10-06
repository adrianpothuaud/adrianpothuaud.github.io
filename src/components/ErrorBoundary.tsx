import type { ErrorInfo, ReactNode } from 'react'
import { Component } from 'react'
import Error from '../pages/error/error'

interface Props {
  children: ReactNode
  fallback?: ReactNode
}

interface State {
  hasError: boolean
  error?: Error
}

export default class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  }

  public static getDerivedStateFromError(error: Error): State {
    // Met à jour l'état pour afficher l'interface d'erreur lors du prochain rendu
    return { hasError: true, error }
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo)
  }

  private handleReset = (): void => {
    this.setState({ hasError: false, error: undefined })
  }

  public render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback
      }
      
      return (
        <Error 
          error={this.state.error} 
          reset={this.handleReset}
        />
      )
    }

    return this.props.children
  }
}