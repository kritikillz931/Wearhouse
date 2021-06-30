import React, { useState } from 'react';
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';
import "./NavBar.css"

export const NavBar = () => {
  const [collapsed, setCollapsed] = useState(true);
  const toggleNavbar = () => setCollapsed(!collapsed);
  
  return (
    <div className="navBar">
      <Navbar color="transparent" dark>
        <NavbarToggler onClick={toggleNavbar} className="mr-2" />
        <NavbarBrand href="/" className="mr-auto">Wearhouse</NavbarBrand>
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
              <NavLink className="navBarLink text-grey" className="text-grey" href="/LogOut">LogOut</NavLink>
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
}