import React from 'react';

type TokenLogoProps = {
  logoUrl: string;
  alt: string;
  className?: string;
};

export const TokenLogo: React.FC<TokenLogoProps> = ({
  logoUrl,
  alt,
  className = 'w-5 h-5 mr-2',
}) => {
  const [error, setError] = React.useState(false);

  if (error || !logoUrl) {
    return (
      <svg
        className={className}
        viewBox="0 0 64 64"
        xmlns="http://www.w3.org/2000/svg"
        role="img"
        aria-label={alt}
      >
        <circle
          cx="32"
          cy="32"
          r="30"
          fill="#e0e0e0"
          stroke="#ccc"
          strokeWidth="4"
        />
        <text
          x="50%"
          y="54%"
          textAnchor="middle"
          fontSize="20"
          fill="#888"
          fontFamily="Arial, sans-serif"
        >
          ?
        </text>
      </svg>
    );
  }

  return (
    <img
      src={logoUrl}
      alt={alt}
      onError={() => setError(true)}
      className={className}
    />
  );
};
