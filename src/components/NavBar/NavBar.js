import React, { useState } from 'react';
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';
import "./NavBar.css"

export const NavBar = (props) => {
  const [collapsed, setCollapsed] = useState(true);

  const toggleNavbar = () => setCollapsed(!collapsed);
  
  return (
    <div>
      <Navbar  className="navBar" color="transparent" dark>
        <NavbarToggler onClick={toggleNavbar} className="mr-2" />
        <NavbarBrand href="/" className="mr-auto"></NavbarBrand>
        <Collapse isOpen={!collapsed} navbar>
          <Nav navbar>
            <NavItem>
              <NavLink className="text-white" href="/Reminders">Reminders</NavLink>
            </NavItem>
            <NavItem>
              <NavLink className="text-white" href="/Inventory">Inventory</NavLink>
            </NavItem>
            
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
}