import styled, { css } from 'styled-components';

const SkeletonBase = styled.div`
  background: linear-gradient(
    90deg,
    ${({ theme }) => theme.colors.primary.gray[200]} 25%,
    ${({ theme }) => theme.colors.primary.gray[100]} 50%,
    ${({ theme }) => theme.colors.primary.gray[200]} 75%
  );
  background-size: 200% 100%;
  animation: skeleton-loading 1.5s ease-in-out infinite;
  border-radius: ${({ theme }) => theme.borderRadius.md};

  @keyframes skeleton-loading {
    0% {
      background-position: 200% 0;
    }
    100% {
      background-position: -200% 0;
    }
  }
`;

const SkeletonText = styled(SkeletonBase)`
  height: ${({ variant, theme }) => {
    switch (variant) {
      case 'h1':
        return '2.5rem';
      case 'h2':
        return '2rem';
      case 'h3':
        return '1.75rem';
      case 'h4':
        return '1.5rem';
      case 'body1':
        return '1.25rem';
      case 'body2':
        return '1rem';
      case 'caption':
        return '0.875rem';
      default:
        return '1rem';
    }
  }};
  
  width: ${({ width }) => width || '100%'};
  margin-bottom: ${({ theme }) => theme.spacing[2]};
`;

const SkeletonCircle = styled(SkeletonBase)`
  width: ${({ size, theme }) => {
    switch (size) {
      case 'sm':
        return '2rem';
      case 'lg':
        return '4rem';
      case 'xl':
        return '5rem';
      default:
        return '2.5rem';
    }
  }};
  height: ${({ size, theme }) => {
    switch (size) {
      case 'sm':
        return '2rem';
      case 'lg':
        return '4rem';
      case 'xl':
        return '5rem';
      default:
        return '2.5rem';
    }
  }};
  border-radius: 50%;
`;

const SkeletonRectangle = styled(SkeletonBase)`
  width: ${({ width }) => width || '100%'};
  height: ${({ height }) => height || '200px'};
`;

const SkeletonButton = styled(SkeletonBase)`
  width: ${({ width }) => width || '120px'};
  height: ${({ size }) => {
    switch (size) {
      case 'sm':
        return '2rem';
      case 'lg':
        return '3rem';
      case 'xl':
        return '3.5rem';
      default:
        return '2.5rem';
    }
  }};
`;

const SkeletonCard = styled.div`
  border: 1px solid ${({ theme }) => theme.colors.primary.gray[200]};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  padding: ${({ theme }) => theme.spacing[6]};
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing[4]};
`;

const SkeletonListItem = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[3]};
  padding: ${({ theme }) => theme.spacing[3]} 0;
  border-bottom: 1px solid ${({ theme }) => theme.colors.primary.gray[200]};
  
  &:last-child {
    border-bottom: none;
  }
`;

// Component factory
const Skeleton = ({ 
  variant = 'text', 
  width, 
  height, 
  size = 'md',
  ...props 
}) => {
  switch (variant) {
    case 'text':
      return <SkeletonText width={width} {...props} />;
    case 'h1':
    case 'h2':
    case 'h3':
    case 'h4':
    case 'body1':
    case 'body2':
    case 'caption':
      return <SkeletonText variant={variant} width={width} {...props} />;
    case 'circle':
    case 'avatar':
      return <SkeletonCircle size={size} {...props} />;
    case 'rectangle':
    case 'image':
      return <SkeletonRectangle width={width} height={height} {...props} />;
    case 'button':
      return <SkeletonButton width={width} size={size} {...props} />;
    default:
      return <SkeletonText width={width} {...props} />;
  }
};

// Preset skeleton patterns
const SkeletonCardPattern = ({ children, ...props }) => (
  <SkeletonCard {...props}>
    {children || (
      <>
        <Skeleton variant="rectangle" height="150px" />
        <Skeleton variant="h3" width="70%" />
        <Skeleton variant="text" width="100%" />
        <Skeleton variant="text" width="80%" />
        <div style={{ display: 'flex', gap: '12px', marginTop: '16px' }}>
          <Skeleton variant="button" width="80px" />
          <Skeleton variant="button" width="100px" />
        </div>
      </>
    )}
  </SkeletonCard>
);

const SkeletonList = ({ items = 3, showAvatar = false, ...props }) => (
  <div {...props}>
    {Array.from({ length: items }).map((_, index) => (
      <SkeletonListItem key={index}>
        {showAvatar && <Skeleton variant="circle" size="sm" />}
        <div style={{ flex: 1 }}>
          <Skeleton variant="h4" width="60%" />
          <Skeleton variant="text" width="80%" />
          <Skeleton variant="text" width="40%" />
        </div>
      </SkeletonListItem>
    ))}
  </div>
);

const SkeletonTable = ({ rows = 5, columns = 4, ...props }) => (
  <div {...props}>
    {/* Header */}
    <div style={{ 
      display: 'grid', 
      gridTemplateColumns: `repeat(${columns}, 1fr)`, 
      gap: '16px',
      padding: '12px 0',
      borderBottom: '1px solid #e2e8f0',
      marginBottom: '12px'
    }}>
      {Array.from({ length: columns }).map((_, index) => (
        <Skeleton key={index} variant="text" width="80%" />
      ))}
    </div>
    
    {/* Rows */}
    {Array.from({ length: rows }).map((_, rowIndex) => (
      <div key={rowIndex} style={{ 
        display: 'grid', 
        gridTemplateColumns: `repeat(${columns}, 1fr)`, 
        gap: '16px',
        padding: '12px 0',
        borderBottom: '1px solid #f7fafc'
      }}>
        {Array.from({ length: columns }).map((_, colIndex) => (
          <Skeleton key={colIndex} variant="text" width="60%" />
        ))}
      </div>
    ))}
  </div>
);

// Compound exports
Skeleton.Card = SkeletonCardPattern;
Skeleton.List = SkeletonList;
Skeleton.Table = SkeletonTable;

export default Skeleton;