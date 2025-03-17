// src/components/common/Button.jsx
function Button({ 
    children, 
    onClick, 
    type = 'button', 
    variant = 'primary', 
    className = '',
    disabled = false
  }) {
    // Define variant-specific classes
    const variantClasses = {
      primary: 'bg-blue-500 hover:bg-blue-600 text-white',
      secondary: 'bg-gray-200 hover:bg-gray-300 text-gray-800',
      success: 'bg-green-500 hover:bg-green-600 text-white',
      danger: 'bg-red-500 hover:bg-red-600 text-white',
      warning: 'bg-yellow-500 hover:bg-yellow-600 text-white',
    };
  
    const baseClasses = 'px-4 py-2 rounded-lg transition focus:outline-none focus:ring-2';
    const disabledClasses = disabled ? 'opacity-50 cursor-not-allowed' : '';
    
    const buttonClasses = `${baseClasses} ${variantClasses[variant]} ${disabledClasses} ${className}`;
  
    return (
      <button
        type={type}
        onClick={onClick}
        className={buttonClasses}
        disabled={disabled}
      >
        {children}
      </button>
    );
  }
  
  export default Button;