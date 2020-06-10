import React from "react";
import "./directory.styles.scss";
import ProductCategory from "../product-category/product-category.component";

class Directory extends React.Component {
  constructor() {
    super();
    this.state = {
      menuItems: [
        {
          label: "monitors",
          id: 1,
          image:
            "https://images.unsplash.com/photo-1534972195531-d756b9bfa9f2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80"
        },
        {
          label: "laptops",
          id: 2,
          image:
            "https://images.unsplash.com/photo-1587133599421-40a3cd84831b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1051&q=80"
        },
        {
          label: "Storage Devices",
          id: 3,
          image:
            "https://images.unsplash.com/photo-1577538926210-fc6cc624fde2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80"
        },
        {
          label: "Drives",
          id: 4,
          image:
            "https://images.unsplash.com/photo-1589995186011-a7b485edc4bf?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80"
        },
        {
          label: "Desktop Computers",
          id: 5,
          image:
            "https://images.unsplash.com/photo-1547082299-de196ea013d6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80"
        },
        {
          label: "Keyboards & Mice",
          id: 6,
          image:
            "https://images.unsplash.com/photo-1470054187619-8cf450e37193?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80"
        }
      ]
    };
  }

  render() {
    return (
      <div className="directory-menu">
        {this.state.menuItems.map((item) => (
          <ProductCategory
            key={item.id}
            label={item.label}
            imageUrl={item.image}
          />
        ))}
      </div>
    );
  }
}

export default Directory;
