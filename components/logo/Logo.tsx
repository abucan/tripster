import FullLogo from '@/assets/images/logo/tripster.svg';

export function Logo({ width, height }: { width?: number; height?: number }) {
  return (
    <FullLogo
      style={{
        width: width || 240,
        height: height || 70,
        alignSelf: 'center',
      }}
    />
  );
}
