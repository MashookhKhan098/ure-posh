import { AlertCircle, HelpCircle, Shield, User, Key } from 'lucide-react'

interface ErrorDisplayProps {
  error: string | null
  onClear: () => void
}

export default function ErrorDisplay({ error, onClear }: ErrorDisplayProps) {
  if (!error) return null

  // Determine error type and provide specific help
  const getErrorInfo = (error: string) => {
    if (error.includes('Account not found')) {
      return {
        icon: User,
        color: 'red',
        title: 'Account Not Found',
        message: error,
        suggestions: [
          'Check your username or email spelling',
          'Contact your administrator to create an account',
          'Verify you are using the correct login credentials'
        ]
      }
    }
    
    if (error.includes('Invalid password')) {
      return {
        icon: Key,
        color: 'red',
        title: 'Incorrect Password',
        message: error,
        suggestions: [
          'Check your password spelling',
          'Ensure Caps Lock is off',
          'Contact your administrator to reset your password'
        ]
      }
    }
    
    if (error.includes('Account deactivated')) {
      return {
        icon: Shield,
        color: 'orange',
        title: 'Account Deactivated',
        message: error,
        suggestions: [
          'Contact your administrator to reactivate your account',
          'Check if your account has been suspended',
          'Verify your account status with support'
        ]
      }
    }
    
    if (error.includes('Database connection')) {
      return {
        icon: AlertCircle,
        color: 'red',
        title: 'System Error',
        message: error,
        suggestions: [
          'Try again in a few minutes',
          'Check your internet connection',
          'Contact technical support if the problem persists'
        ]
      }
    }
    
    if (error.includes('Network error')) {
      return {
        icon: AlertCircle,
        color: 'red',
        title: 'Connection Error',
        message: error,
        suggestions: [
          'Check your internet connection',
          'Try refreshing the page',
          'Contact support if the problem continues'
        ]
      }
    }
    
    // Default error
    return {
      icon: AlertCircle,
      color: 'red',
      title: 'Login Error',
      message: error,
      suggestions: [
        'Please try again',
        'Check your credentials',
        'Contact support if the problem persists'
      ]
    }
  }

  const errorInfo = getErrorInfo(error)
  const IconComponent = errorInfo.icon

  return (
    <div className={`bg-${errorInfo.color}-50 border border-${errorInfo.color}-200 rounded-xl p-4 mb-4`}>
      <div className="flex items-start space-x-3">
        <IconComponent className={`h-5 w-5 text-${errorInfo.color}-600 mt-0.5 flex-shrink-0`} />
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <h3 className={`text-sm font-medium text-${errorInfo.color}-800`}>
              {errorInfo.title}
            </h3>
            <button
              onClick={onClear}
              className={`text-${errorInfo.color}-400 hover:text-${errorInfo.color}-600`}
            >
              ×
            </button>
          </div>
          <p className={`text-sm text-${errorInfo.color}-700 mt-1`}>
            {errorInfo.message}
          </p>
          
          <div className="mt-3">
            <div className="flex items-center space-x-1 mb-2">
              <HelpCircle className="h-4 w-4 text-gray-500" />
              <span className="text-xs font-medium text-gray-700">Suggestions:</span>
            </div>
            <ul className="space-y-1">
              {errorInfo.suggestions.map((suggestion, index) => (
                <li key={index} className={`text-xs text-${errorInfo.color}-600 flex items-start space-x-1`}>
                  <span className="text-gray-400">•</span>
                  <span>{suggestion}</span>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="mt-3 pt-3 border-t border-gray-200">
            <p className="text-xs text-gray-500">
              Need help? Contact your administrator at{' '}
              <a href="mailto:admin@ureposh.com" className="text-blue-600 hover:underline">
                admin@ureposh.com
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
} 