import { Link } from 'react-router-dom';
import Button from '../ui/Button';
import Heading from '../ui/Heading';

function SettingsPage() {
  return (
    <div>
      <Heading secondary>Settings</Heading>
      <Heading>Will implemented very soon!</Heading>
      <Link to="/">
        <Button secondary>Go back</Button>
      </Link>
    </div>
  );
}

export default SettingsPage;
