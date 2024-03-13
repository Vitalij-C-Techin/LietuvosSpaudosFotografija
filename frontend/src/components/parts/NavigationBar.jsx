import React from 'react';
import LanguageSwitch from './LanguageSwitch.jsx';
import '../../modules/language/i18n.jsx';
import { useTranslation } from 'react-i18next';
import { NavLink, Link } from 'react-router-dom';
import { Nav, Navbar, Dropdown } from 'react-bootstrap';
import { useAuth } from '../context/AuthContext.jsx';
import { IsAuthenticated, IsNotAuthenticated } from '../utils/Authentication.jsx';

const NavigationBar = () => {
  const { logout, getRole } = useAuth();
  const userRole = getRole();
  const { t } = useTranslation();

  return (
    <Navbar data-testid="NavigationBar" className="px-5">
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
            <Dropdown.Item as={NavLink} to="/">
              {t('landingPage.dropDownMenuItem1')}
            </Dropdown.Item>

            <IsNotAuthenticated>
              <Dropdown.Item as={NavLink} to="/login">
                {t('landingPage.dropDownMenuItem2')}
              </Dropdown.Item>
              <Dropdown.Item as={NavLink} to="/registration">
                {t('landingPage.dropDownMenuItem12')}
              </Dropdown.Item>
            </IsNotAuthenticated>

            <IsAuthenticated>
              <Dropdown.Item as={NavLink} to="/profile">
                {t('landingPage.dropDownMenuItem3')}
              </Dropdown.Item>

              <Dropdown.Item as={Link} to="/" onClick={logout}>
                {t('landingPage.dropDownMenuItem11')}
              </Dropdown.Item>

              <Dropdown.Divider />
              <Dropdown.Item as={NavLink} to="/user-competition-list">
                {t('landingPage.dropDownMenuItem4')}
              </Dropdown.Item>
              <Dropdown.Divider />

              <Dropdown.Item to="#jury-competition">
                {t('landingPage.dropDownMenuItem5')}
              </Dropdown.Item>

              {userRole === 'ADMIN' && (
                <>
                  <Dropdown.Divider />
                  <Dropdown.Item as={NavLink} to="/admin-manage-users">
                    {t('landingPage.dropDownMenuItem6')}
                  </Dropdown.Item>
                  <Dropdown.Item as={NavLink} to="/admin-competitions-list">
                    {t('landingPage.dropDownMenuItem7')}
                  </Dropdown.Item>
                  <Dropdown.Item to="#admin-category-dashboard">
                    {t('landingPage.dropDownMenuItem8')}
                  </Dropdown.Item>
                </>
              )}
              <Dropdown.Divider />
            </IsAuthenticated>
            <Dropdown.Divider />

            <LanguageSwitch data-testid="change-language-menu-item" />
          </Dropdown.Menu>
        </Dropdown>
      </Nav>
    </Navbar>
  );
};

export default NavigationBar;
