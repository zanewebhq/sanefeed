import { Button, Link, Text } from '@sanefeed/ui';

export default function HomePage() {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
        width: '20rem',
        padding: '1rem',
      }}
    >
      <Text type="heading" as="h1" size="5xl">
        SaneFeed
      </Text>

      <Button iconLeft="plus">New Feed</Button>

      <Link href="#" iconRight="external">
        Visit website
      </Link>
    </div>
  );
}
