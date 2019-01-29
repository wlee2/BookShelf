import React, { Component } from 'react';
import { ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

class ButtonModel extends Component {
    state = {
        dropToggle: false
    }
  
    toggle = () => {
        const {dropToggle} = this.state
        this.setState({
            dropToggle: !dropToggle
        });
    }
  
    render() {
        const {clickUpdate, id} = this.props
        return (
            <ButtonDropdown className="dropBtn" isOpen={this.state.dropToggle} toggle={this.toggle}>
            <DropdownToggle className="asd" caret>
            </DropdownToggle>
            <DropdownMenu>
                <DropdownItem header>Move to...</DropdownItem>
                <DropdownItem onClick={clickUpdate} name="currentlyReading" value={id}>Currently Reading</DropdownItem>
                <DropdownItem onClick={clickUpdate} name="wantToRead" value={id}>Want to Read</DropdownItem>
                <DropdownItem onClick={clickUpdate} name="read" value={id}>Read</DropdownItem>
                <DropdownItem divider />
                <DropdownItem onClick={clickUpdate} name="none" value={id}>None</DropdownItem>
            </DropdownMenu>
        </ButtonDropdown>
        );
    }
}

export default ButtonModel;