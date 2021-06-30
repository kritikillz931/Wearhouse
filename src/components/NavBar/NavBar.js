import React, { useState } from 'react';
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink, Media } from 'reactstrap';
import "./NavBar.css"
import wearhouseLogo from "../Images/navbarLogo.png"

export const NavBar = () => {
  const [collapsed, setCollapsed] = useState(true);
  const toggleNavbar = () => setCollapsed(!collapsed);
  
  return (
    <div >
      <Navbar className="navBar" color="transparent" dark >
        <NavbarToggler onClick={toggleNavbar} className="mr-2" />
        <NavbarBrand href="/" className="mr-auto">
          {/* <Media object data-src="../Images/WEARHOUSELOGO.png/64x64" alt="Wearhouse Logo" /> */}
          <img src={wearhouseLogo} alt="Wearhouse Logo Image" />
        </NavbarBrand>
        <Collapse isOpen={!collapsed} navbar>
          <Nav navbar className="navBarLinks">
            <NavItem>
              <NavLink className="navBarLink text-white" href="/Reminders">Reminders</NavLink>
            </NavItem>
            <NavItem>
              <NavLink className="navBarLink text-white" href="/Inventory">Inventory</NavLink>
            </NavItem>

            <NavItem>
              <NavLink className="navBarLink text-white" href="/Tracking">Tracking</NavLink>
            </NavItem>
            <NavItem>
              <NavLink className="navBarLink text-grey" href="/LogOut">LogOut</NavLink>
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
}