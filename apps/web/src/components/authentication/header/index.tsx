import { Icon, Link, Text } from '@sanefeed/ui';

import styles from './styles.module.css';

const CONFIG = {
  login: {
    title: 'Welcome back to SaneFeed',
    description: 'Log in to continue enjoying your content, your way!',
    preLinkText: "Don't have an account?",
    linkText: 'Sign up',
    link: '/auth/signup',
  },
  signup: {
    title: 'Get started with SaneFeed',
    description:
      'Join us to take control of your content. Your Content, Your Way!',
    preLinkText: 'Already have an account?',
    linkText: 'Log in',
    link: '/auth/login',
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

      <Text as="h1" size="4xl">
        {title}
      </Text>

      <Text as="p">{description}</Text>

      <Text as="p">
        {preLinkText} <Link href={link}>{linkText}</Link>
      </Text>
    </div>
  );
}
