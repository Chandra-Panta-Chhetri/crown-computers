const SHOP_DATA = [
  {
    id: 1,
    title: "Monitors",
    routeName: "monitors",
    items: [
      {
        id: 1,
        name: 'Samsung 32" 60Hz 4ms Curved LED',
        imageUrl: "https://dummyimage.com/400x400",
        category: "monitors",
        price: 349.99
      },
      {
        id: 2,
        name: 'Acer 31.5" FHD 75Hz 4ms Curved Gaming Monitor',
        imageUrl: "https://dummyimage.com/400x400",
        category: "monitors",
        price: 299.99
      },
      {
        id: 3,
        name: 'Asus 27" FHD 60Hz 5ms LED',
        imageUrl: "https://dummyimage.com/400x400",
        category: "monitors",
        price: 209.91
      },
      {
        id: 4,
        name: 'LG 29" Ultrawide FHD 75Hz 5ms Gaming Monitor',
        imageUrl: "https://dummyimage.com/400x400",
        category: "monitors",
        price: 25
      },
      {
        id: 5,
        name: 'Dell 24" SE2419HR',
        imageUrl: "https://dummyimage.com/400x400",
        category: "monitors",
        price: 169.99
      }
    ]
  },
  {
    id: 2,
    title: "laptops",
    routeName: "laptops",
    items: [
      {
        id: 6,
        name:
          'Macbook Pro (2020) 13.3" (Intel Core i3 1.1GHZ/256GB SSD/8GB RAM)',
        imageUrl: "https://dummyimage.com/400x400",
        category: "laptops",
        price: 1299.99
      },
      {
        id: 7,
        name: "Dell XPS 15 2020",
        imageUrl: "https://dummyimage.com/400x400",
        category: "laptops",
        price: 1800.99
      },
      {
        id: 8,
        name: 'Acer Aspire 5 15.6" (Intel Core i5/512GB SSD/12GB RAM)',
        imageUrl: "https://dummyimage.com/400x400",
        category: "laptops",
        price: 742.65
      },
      {
        id: 9,
        name: 'ASUS ZenBook 14" (AMD Quad Core R5-3500U/512GB SSD/8GB RAM)',
        imageUrl: "https://dummyimage.com/400x400",
        category: "laptops",
        price: 799.99
      },
      {
        id: 10,
        name: "Surface Book 3",
        imageUrl: "https://dummyimage.com/400x400",
        category: "laptops",
        price: 1234.32
      }
    ]
  },
  {
    id: 3,
    title: "Storage Devices",
    routeName: "storage",
    items: [
      {
        id: 11,
        name: "Seagate Backup Plus Slim 2TB USB 3.0",
        imageUrl: "https://dummyimage.com/400x400",
        category: "storage devices",
        price: 89.99
      },
      {
        id: 12,
        name: "Lexar JumpDrive S50 64GB USB Flash Drive",
        imageUrl: "https://dummyimage.com/400x400",
        category: "storage devices",
        price: 19.99
      },
      {
        id: 13,
        name: "Philips Vivid 32GB USB 3.0 Flash Drive (3 Pack)",
        imageUrl: "https://dummyimage.com/400x400",
        category: "storage devices",
        price: 24.99
      },
      {
        id: 14,
        name: "Samsung T7 Touch Portable 500GB USB External SSD",
        imageUrl: "https://dummyimage.com/400x400",
        category: "storage devices",
        price: 174.99
      },
      {
        id: 15,
        name: "SanDisk Extreme 500GB USB External SSD",
        imageUrl: "https://dummyimage.com/400x400",
        category: "storage devices",
        price: 139.99
      }
    ]
  },
  {
    id: 4,
    title: "Drives",
    routeName: "internaldrives",
    items: [
      {
        id: 16,
        name: "WD Desktop Hard Disk Drive 4TB",
        imageUrl: "https://dummyimage.com/400x400",
        category: "drives",
        price: 119.99
      },
      {
        id: 17,
        name: "Seagate BarraCuda 2TB SATA 7200RPM HDD",
        imageUrl: "https://dummyimage.com/400x400",
        category: "drives",
        price: 74.99
      },
      {
        id: 18,
        name: "Samsung 860 EVO Series 500GB SATA III SSD",
        imageUrl: "https://dummyimage.com/400x400",
        category: "drives",
        price: 128.5
      },
      {
        id: 19,
        name: "HP S600 120GB SATA III 3D NAND SSD",
        imageUrl: "https://dummyimage.com/400x400",
        category: "drives",
        price: 32.99
      },
      {
        id: 20,
        name: "Seagate BarraCuda 1TB 7200RPM HDD",
        imageUrl: "https://dummyimage.com/400x400",
        category: "drives",
        price: 45
      }
    ]
  },
  {
    id: 5,
    title: "Desktop Computers",
    routeName: "desktops",
    items: [
      {
        id: 21,
        name: "Dell Inspiron - 9th gen Intel Core/8GB RAM/1TB HDD",
        imageUrl: "https://dummyimage.com/400x400",
        category: "desktop computers",
        price: 499.99
      },
      {
        id: 22,
        name:
          "Alienware Aurora R11 Gaming Desktop - 10th gen Intel Core/8GB RAM/1TB HDD",
        imageUrl: "https://dummyimage.com/400x400",
        category: "desktop computers",
        price: 1299.99
      },
      {
        id: 23,
        name: "ASUS S340MF - Intel Core i5-9400/1TB HDD/256GB SSD/8GB RAM",
        imageUrl: "https://dummyimage.com/400x400",
        category: "desktop computers",
        price: 799.99
      },
      {
        id: 24,
        name: "Acer Aspire TC - Intel Core Ci5-9400/1TB HDD/12GB RAM",
        imageUrl: "https://dummyimage.com/400x400",
        category: "desktop computers",
        price: 719.99
      },
      {
        id: 25,
        name:
          "Dell Vostro DT 3471 Business Desktop - 9th gen Intel Core/4GB RAM/1TB HDD",
        imageUrl: "https://dummyimage.com/400x400",
        category: "desktop computers",
        price: 529.42
      }
    ]
  },
  {
    id: 6,
    title: "Keyboards & Mice",
    routeName: "keyboardsmice",
    items: [
      {
        id: 26,
        name: "Surface Pro Signature Type Cover",
        imageUrl: "https://dummyimage.com/400x400",
        category: "keyboards & mices",
        price: 159.99
      },
      {
        id: 27,
        name: "Microsoft Designer Bluetooth",
        imageUrl: "https://dummyimage.com/400x400",
        category: "keyboards & mices",
        price: 99.99
      },
      {
        id: 28,
        name: "Razer Deathadder Elite Ergonomic Gaming Mouse",
        imageUrl: "https://dummyimage.com/400x400",
        category: "keyboards & mices",
        price: 54.99
      },
      {
        id: 29,
        name: "Razer Cynosa Chroma Backlit Gaming Keyboard",
        imageUrl: "https://dummyimage.com/400x400",
        category: "keyboards & mices",
        price: 59.99
      },
      {
        id: 30,
        name: "Surface Mobile Mouse",
        imageUrl: "https://dummyimage.com/400x400",
        category: "keyboards & mices",
        price: 44.99
      }
    ]
  }
];

export default SHOP_DATA;
