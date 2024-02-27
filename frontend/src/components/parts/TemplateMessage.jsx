import { Card, Container } from 'react-bootstrap';

const MessageTemplate = ({ message }) => {
  return (
    <>
      <Container className="justify-content-xl-center py-3">
        <Card>
          <h4>{message}</h4>
        </Card>
      </Container>
    </>
  );
};

export default MessageTemplate;
