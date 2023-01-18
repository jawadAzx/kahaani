import React, { Component } from "react";
import ScrollMenu from "react-horizontal-scrolling-menu";
import { Link } from "react-router-dom";

// One item component
// selected prop will be passed
const MenuItem = ({ item, selected, key }) => {
  console.log(item);
  return (
    <div className={`menu-item ${selected ? "active" : ""} w-50`} key={key}>
      <Link to={"/player/" + item.id}>
        <img src={item.image} className="img-thumbnail img-fluid" />
        {item.text}
      </Link>
    </div>
  );
};

// All items component
// Important! add unique key
const Menu = (list, selected) =>
  list.map((el, i) => {
    return <MenuItem item={el} key={i} selected={selected} />;
  });

const Arrow = ({ text, className }) => {
  return <div className={className}>{text}</div>;
};

const ArrowLeft = Arrow({ text: "<", className: "arrow-prev" });
const ArrowRight = Arrow({ text: ">", className: "arrow-next" });

const selected = "item1";

class HorizontalMenu extends Component {
  constructor(props) {
    super(props);
    // call it again if items count changes
    this.menuItems = Menu(props.stories, selected);
    // console.log(props.stories);
  }

  state = {
    selected,
  };

  onSelect = (key) => {
    this.setState({ selected: key });
  };

  render() {
    const { selected } = this.state;
    // Create menu from items
    const menu = this.menuItems;

    return (
      <div className="App">
        <ScrollMenu
          data={menu}
          arrowLeft={ArrowLeft}
          arrowRight={ArrowRight}
          selected={selected}
          onSelect={this.onSelect}
        />
      </div>
    );
  }
}

export default HorizontalMenu;
