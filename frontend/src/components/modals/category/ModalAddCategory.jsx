// import React, { useEffect, useState } from 'react';
// import { Modal, Button, Form, Card } from 'react-bootstrap';
// import { useTranslation } from 'react-i18next';
// import { useAuth } from '../../context/AuthContext';
// import axios from 'axios';

// //TODO add correct api link
// //TODO add modal bory if not corresponds to wireframe

const ModalAddCategory = ({ showModal, onClose, uuid }) => {
//   const [categories, setCategories] = useState([]);
//   const [t] = useTranslation();
//   const { getTokenHeader } = useAuth();

//   useEffect(() => {
//     const fetchCategoriesByCompetitionUUID = async () => {
//       try {
//         const response = await axios.get(`http://localhost:8080/api/v1/category`, {
//           headers: getTokenHeader()
//         });
//         setCategories(response.data);
//       } catch (error) {
//         console.log('something went wrong', error);
//       }
//     };
//     fetchCategoriesByCompetitionUUID();
//   }, []);

//   return (
//     <Modal show={showModal} onHide={onClose}>
//       <Modal.Header closeButton>
//         <Modal.Title>{t('modalCategory.titleAddCategory')}</Modal.Title>
//       </Modal.Header>
//       <Modal.Body>
//         <Form.Label> {t('modalCategory.titleCat')}</Form.Label>
//         <Form.Control></Form.Control>
//         <Form.Label> {t('modalCategory.type')}</Form.Label>
//         <Form.Select>
//           <option value="1">{t('modalCategory.single')}</option>
//           <option value="2">{t('modalCategory.series')}</option>
//         </Form.Select>
//         <Form.Label>{t('modalCategory.photoLimit')}</Form.Label>
//         <Form.Control min="1" max="15"></Form.Control>
//         <Card>
//           <Card.Body>
//             <Card.Title>{t('modalCategory.categories')}</Card.Title>
//             <ul>
//               {categories.map((category) => (
//                 <li key={category.uuid}>
//                   {category.name} - {category.description}
//                 </li>
//               ))}
//             </ul>
//           </Card.Body>
//         </Card>
//       </Modal.Body>
//       <Modal.Footer>
//         <Button variant="secondary" onClick={onClose}>
//           {t('modalCategory.closeButton')}
//         </Button>
//       </Modal.Footer>
//     </Modal>
//   );
};
export default ModalAddCategory;
