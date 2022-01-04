import React from "react";

class Dropdown extends React.Component {
    constructor(props) {
      super(props);
      this.state = {value: 'Instagram'};
  
      this.handleChange = this.handleChange.bind(this);
    }
  
    handleChange(event) {
      this.setState({value: event.target.value});
    }
  
   
  
    render() {
      return (
        <form >
          <label>
          How did you hear about us?
            <select className="form-input" value={this.state.value} onChange={this.handleChange}>
              <option value="Instagram">Instagram</option>
              <option value="Facebook">Facebook</option>
              <option value="Family">Family</option>
              <option value="Friend">Friend</option>
              <option value="Other">Other</option>
            </select>
          </label>
        </form>
      );
    }
  }

  export default Dropdown;