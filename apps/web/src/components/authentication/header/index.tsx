import { Icon, Link, Text } from '@sanefeed/ui';

import styles from './styles.module.css';

const CONFIG = {
  login: {
    title: 'Welcome back to SaneFeed',
    description: 'Log in to continue enjoying your content, your way!',
    preLinkText: "Don't have an account?",
    linkText: 'Sign up',
    link: '/signup',
  },
  signup: {
    title: 'Get started with SaneFeed',
    description:
      'Join us to take control of your content. Your Content, Your Way!',
    preLinkText: 'Already have an account?',
    linkText: 'Log in',
    link: '/login',
  },
};

interface AuthenticationHeaderProps {
  type: 'login' | 'signup';
}

export default function AuthenticationHeader({
  type,
}: AuthenticationHeaderProps) {
  const { title, description, preLinkText, linkText, link } = CONFIG[type];

  return (
    <div className={styles.header}>
      <Icon name="logo" size="lg" className={styles.logo} />

      <Text type="heading" as="h1" size="4xl">
        {title}
      </Text>

      <Text>{description}</Text>

      <Text>
        {preLinkText} <Link href={link}>{linkText}</Link>
      </Text>
    </div>
  );
}
