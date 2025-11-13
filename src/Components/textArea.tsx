import React from 'react';

interface textAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
    className?: string;
}

const TextArea: React.FC<textAreaProps> = ({
    rows = 3,
    className = '',
    ...props
}) => {
    return(
        <textarea
            {...props}
            rows={rows}
            className={`border border-gray-300 reounded px-3 py-2 focus: outline-none focus: ring-2 focus:ring-blue-500 resize-vertical $ {className}`} />
    );
};

export default TextArea;  