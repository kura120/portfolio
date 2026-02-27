import GitHubProfile from '../components/github-profile';

export const metadata = {
  title: 'kura120 - GitHub',
  description: 'GitHub activity, repositories, and contributions',
};

export default function GitHubPage() {
  return (
    <main style={{ minHeight: '100vh', background: '#000' }}>
      <GitHubProfile username="kura120" />
    </main>
  );
}

