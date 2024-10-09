import { useState } from 'react';
import Button from '../../ui/Button';
import { useUsers } from './useUsers';
import Spinner from '../../ui/Spinner';
import Heading from '../../ui/Heading';
import List from '../../ui/List';
import ButtonsNav from '../../ui/ButtonsNav';
import { FaCopy } from 'react-icons/fa';
import Icon from '../../ui/Icon';
import toast from 'react-hot-toast';

function AllUsersListAdmin() {
  const [show, setShow] = useState(false);
  const { isLoading, data } = useUsers(show);

  const copyToClipboard = text => {
    navigator.clipboard
      .writeText(text)
      .then(() => toast.success(`Copied ${text} to clipboard!`))
      .catch(() => toast.error('Failed to copy.'));
  };

  if (isLoading) return <Spinner />;

  return (
    <>
      <ButtonsNav>
        <Button primary onClick={() => setShow(s => !s)}>
          {show ? 'Hide' : 'Show'} all users
        </Button>
      </ButtonsNav>

      {show && (
        <>
          <Heading secondary>Users list</Heading>
          {data?.data.map(user => (
            <div key={user._id}>
              <ul>
                <List>
                  <Heading>User ID:</Heading>
                  <Heading>{user._id}</Heading>
                  <Icon onClick={() => copyToClipboard(user._id)}>
                    <FaCopy />
                  </Icon>
                </List>
                <List>
                  <Heading>Name:</Heading>
                  <Heading>{user.name}</Heading>
                </List>
                <List>
                  <Heading>Email:</Heading>
                  <Heading>{user.email}</Heading>
                </List>
                <List>
                  <Heading>Role:</Heading>
                  <Heading>{user.role}</Heading>
                </List>
                <List>
                  <Heading>Posts ({user.posts.length}):</Heading>
                  <ul>
                    {user.posts.map((post, i) => (
                      <List key={post}>
                        <Heading>{`${i + 1}: ${post}`}</Heading>
                      </List>
                    ))}
                  </ul>
                </List>
              </ul>
              <hr />
            </div>
          ))}
        </>
      )}
    </>
  );
}

export default AllUsersListAdmin;
