import Carousel from 'react-bootstrap/Carousel';
import firstSlideImage from 'C:/Users/Valdemaras/Documents/planes/wp1980156-airplane-boeing-777x-wallpapers.jpg';
import secondSlideImage from 'C:/Users/Valdemaras/Documents/planes/wp1980169-airplane-boeing-777x-wallpapers.jpg';
import thirdSlideImage from 'C:/Users/Valdemaras/Documents/planes/wp1980190-airplane-boeing-777x-wallpapers.jpg';
import { useTranslation } from 'react-i18next';

function Layout() {
  const { t } = useTranslation();
  return (
    <Carousel data-bs-theme="dark">
      <Carousel.Item>
        <img className="d-block img-fluid" src={firstSlideImage} alt="First slide" />
        <Carousel.Caption>
          <h5>{t('layoutPage.h5')}</h5>
          <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img className="d-block img-fluid" src={secondSlideImage} alt="Second slide" />
        <Carousel.Caption>
          <h5>Second slide label</h5>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img className="d-block img-fluid" src={thirdSlideImage} alt="Third slide" />
        <Carousel.Caption>
          <h5>Third slide label</h5>
          <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}

export default Layout;
