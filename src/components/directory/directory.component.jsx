import React from "react";
import "./directory.styles.scss";
import MenuItem from "../menu-item/menu-item.component";

class Directory extends React.Component {
  constructor() {
    super();
    this.state = {
      menuItems: [
        {
          label: "hats",
          id: 1,
          image:
            "https://images.unsplash.com/photo-1529958030586-3aae4ca485ff?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80"
        },
        {
          label: "watches",
          id: 2,
          image:
            "https://images.unsplash.com/photo-1585477078060-d06978689e34?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80"
        },
        {
          label: "jackets",
          id: 3,
          image:
            "https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80"
        },
        {
          label: "womens",
          id: 4,
          image:
            "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1051&q=80",
          size: "large"
        },
        {
          label: "mens",
          id: 5,
          image:
            "https://images.unsplash.com/photo-1567443022715-0d7ad3a48a9b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80",
          size: "large"
        }
      ]
    };
  }

  render() {
    return (
      <div className="directory-menu">
        {this.state.menuItems.map((item) => (
          <MenuItem
            key={item.id}
            label={item.label}
            imageUrl={item.image}
            size={item.size}
          />
        ))}
      </div>
    );
  }
}

export default Directory;
