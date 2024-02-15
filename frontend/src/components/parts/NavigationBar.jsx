import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Dropdown from 'react-bootstrap/Dropdown';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Row from 'react-bootstrap/Row';
import LanguageSwitch from './LanguageSwitch.jsx';
import '../../modules/language/i18n.jsx';
import '../../css/parts/navigation-bar.scss';
import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../../modules/AuthContext.jsx';

//TODO add userRoles
function NavigationBar() {
  const [showNestedDropdown, setShowNestedDropdown] = useState(false);
  const { isLoggedIn, logout, /*userRole*/ } = useAuth();

  const { t } = useTranslation();

  return (
    <Navbar className="bg-body-tertiary" data-testid="NavigationBar">
      <Container>
        <Nav className="ms-auto">
          <Dropdown>
            <Dropdown.Toggle
              id="dropdown-basic"
              data-testid="dropdown-menu-button"
              variant="bg-body-tertiary"
            >
              <span className="navbar-toggler-icon"></span>
            </Dropdown.Toggle>
            <Dropdown.Menu align="end">
              <Dropdown.Item>
                <Nav.Link as={NavLink} to="/">
                  {t('landingPage.dropDownMenuItem1')}
                </Nav.Link>
              </Dropdown.Item>

              <Dropdown.Item>
                {isLoggedIn ? (
                  <Nav.Link as={NavLink} to="/" onClick={logout}>
                    {t('landingPage.dropDownMenuItem11')}
                  </Nav.Link>
                ) : (
                  <Nav.Link as={NavLink} to="/login">
                    {t('landingPage.dropDownMenuItem2')}
                  </Nav.Link>
                )}

              </Dropdown.Item>

              {isLoggedIn && (
                <>
                  <Dropdown.Item href="#/action-3">
                    {t('landingPage.dropDownMenuItem3')}
                  </Dropdown.Item>
                  <Dropdown.Divider />
                  <Dropdown.Item href="#/action-4">
                    {t('landingPage.dropDownMenuItem4')}
                  </Dropdown.Item>
                  <Dropdown.Divider />
                </>
              )}

              {isLoggedIn && (
                <>
                  <Dropdown.Item href="#/action-5">
                    {t('landingPage.dropDownMenuItem5')}
                  </Dropdown.Item>
                  <Dropdown.Divider />
                </>
              )}

              {isLoggedIn && (
                <>
                  <Dropdown.Item href="#/action-6">
                    {t('landingPage.dropDownMenuItem6')}
                  </Dropdown.Item>

                  <Dropdown.Item href="#/action-7">
                    {t('landingPage.dropDownMenuItem7')}
                  </Dropdown.Item>

                  <Dropdown.Item href="#/action-8">
                    {t('landingPage.dropDownMenuItem8')}
                  </Dropdown.Item>
                </>
              )}

              <Dropdown.Item href="#/action-9">{t('landingPage.dropDownMenuItem9')}</Dropdown.Item>
              <Dropdown.Item
                as="div"
                id={`nested-dropdown`}
                data-testid="change-language-menu-item"
                onMouseEnter={() => setShowNestedDropdown(true)}
                onMouseLeave={() => setShowNestedDropdown(false)}
              >
                <span>{t('landingPage.dropDownMenuItem10')}</span>
                <NavDropdown
                  as="div"
                  id={`nested-dropdown`}
                  show={showNestedDropdown ? 'true' : undefined}
                  className="nav-dropdown-center"
                >
                  <Container>
                    <Row>
                      <LanguageSwitch />
                    </Row>
                  </Container>
                </NavDropdown>
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Nav>
      </Container>
    </Navbar>
  );
}

export default NavigationBar;
