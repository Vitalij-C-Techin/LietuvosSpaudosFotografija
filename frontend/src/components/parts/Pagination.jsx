import { Pagination as Pages } from '@mui/material';
import { Container } from 'react-bootstrap';

const Pagination = ({ totalPages, onPageChange }) => {
  if (totalPages < 2) {
    return;
  }

  return (
    <>
      <Container className="justify-content-xl-center d-flex justify-content-center my-5">
        <Pages
          count={totalPages}
          onChange={onPageChange}
          siblingCount={1}
          boundaryCount={1}
          shape="rounded"
        />
      </Container>
    </>
  );
};

export default Pagination;
