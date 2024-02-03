/** @format */

export const linksLateralMenu = [
  {
    text: "Usuarios",
    link: "/usuarios",
    childrens: [
      {
        text: "Ingresar",
        link: "/usuarios/ingresar",
        component: "HomeTab.tsx"
      },
      {
        text: "Adminsitrar",
        link: "/usuarios/administrar",
        component: "Home2Tab.tsx"
      }
    ]
  },
  {
    text: "Clientes",
    link: "/clientes",
    childrens: [
      {
        text: "Ingresar",
        link: "/clientes/ingresar",
        component: "Home2Tab.tsx"
      },
      {
        text: "Adminsitrar",
        link: "/clientes/administrar",
        component: "IngresarTab.tsx"
      }
    ]
  },
  {
    text: "Usuarios",
    link: "/proveedores",
    childrens: [
      {
        text: "Ingresar",
        link: "/clientes/ingresar",
        component: "Home2Tab.tsx"
      },
      {
        text: "Adminsitrar",
        link: "/proveedores/administrar",
        component: "IngresarTab.tsx"
      }
    ]
  }
];
